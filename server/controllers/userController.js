const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');


// CONTROLLING UPDATING FIELDS
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


// USER : ON < GET ONE USER > REQUEST
exports.getUser = factory.getOne(User);

// USER : ON < GET ALL USERS > REQUEST
exports.getAllUsers = factory.getAll(User);

// USER : ON < GET ME > REQUEST
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// USER : ON < UPDATE ME > REQUEST

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  // 📛 TO ADD MORE FIELDS HERE 
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

// USER : ON < DELETE ME > REQUEST SOFT ( DELETE )
// 📛 THIS SHOULD BE RESTRICTED TO ONLY ADMIN 

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// DO NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);


// 📛 THIS PART IS IMPLEMENTED IN SIGNUP (AUTH CONTROLLER ) 
// 📛 THIS SHOULD BE RESTRICTED TO ONLY ADMIN 
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};





