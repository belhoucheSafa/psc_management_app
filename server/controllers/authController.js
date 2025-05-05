const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { createSendToken } = require('./../utils/auth');
const { sendEmail } = require('./../utils/email');


// MANAGING TOKENS

// CREATING <SIGN IN> TOKEN
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// AUTHENTICATION
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || 'student'
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // If everything ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
});

// Team creation with email notification
exports.createTeam = catchAsync(async (req, res, next) => {
  const { selectedMembers, selectedTheme } = req.body;

  // Here you would typically save the team to your database
  // For now, we'll just send the email notification

  // Send email to all team members
  const emailPromises = selectedMembers.map(member => 
    sendEmail(member.email, 'teamCreation', {
      selectedMembers,
      selectedTheme
    })
  );

  await Promise.all(emailPromises);

  res.status(201).json({
    status: 'success',
    message: 'Team created successfully and notifications sent'
  });
});

// AUTHORISATION
// ACCESS ONLY FOR AUTHENTICATED USERS
exports.protect = catchAsync(async (req, res, next) => {
  // Get token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};


// MANAGING PASSWORDS 

// ON < FORGOT PASSWORD > REQUEST
exports.forgotPassword = catchAsync(async (req, res, next) => {

  // 1) GETTING USER BASED ON POSTED EMAIL
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) GENERATE THE RESET TOKEN
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) SENDING RESET TOKEN TO USER VIA EMAIL
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

// ON < RESET PASSWORD > REQUEST
exports.resetPassword = catchAsync(async (req, res, next) => {

  // 1) GETTING USER BASED ON THE TOKEN
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // GETTING THE USER WITH THE RESET TOKEN
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) IF TOKEN HAS NOT EXPIRED && USER EXISTS => SETTING THE NEW PASSWORD 
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // SETTING NEW PASSWORD
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;


  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) TODO: Update changedPasswordAt property for the user

  // 4) LOGGING THE USER IN BY SENDING THE SIGN IN JWT 
  createSendToken(user, 200, res);
});


// ON < UPDATE PASSWORD > REQUEST
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) GETTING CORRESPONDING USER
  const user = await User.findById(req.user.id).select('+password');

  // 2) CHECKING IF THE CURRENT PASSWORD IS CORRECT
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) UPDATING THE PASSWORD
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) LOGGING THE USER IN BY SENDING THE SIGN IN JWT 
  createSendToken(user, 200, res);
});
