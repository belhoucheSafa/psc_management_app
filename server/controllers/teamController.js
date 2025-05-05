const Team = require('../models/teamModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { members, theme, tutorId } = req.body;

    // Check if tutor exists
    const tutor = await User.findOne({ _id: tutorId, role: 'tutor' });
    if (!tutor) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tutor not found'
      });
    }

    // Create team with tutor
    const team = await Team.create({
      members,
      theme,
      tutor: tutorId
    });

    // Generate access token
    const token = jwt.sign(
      { id: team._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      status: 'success',
      token,
      data: {
        team: {
          teamId: team.teamId,
          name: team.name,
          members: team.members,
          theme: team.theme,
          tutor: team.tutor,
          createdAt: team.createdAt
        }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Team login with access code
exports.teamLogin = async (req, res) => {
  try {
    const { accessCode } = req.body;

    // Find team and include accessCode field
    const team = await Team.findOne({ active: true }).select('+accessCode');
    if (!team) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid access code'
      });
    }

    // Check if access code is correct
    const isCorrect = await team.correctAccessCode(accessCode);
    if (!isCorrect) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid access code'
      });
    }

    // Generate access token
    const token = jwt.sign(
      { id: team._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      status: 'success',
      token,
      data: {
        team: {
          teamId: team.teamId,
          name: team.name,
          members: team.members,
          theme: team.theme,
          tutor: team.tutor,
          reports: team.reports,
          createdAt: team.createdAt
        }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get team details
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('tutor', 'name email');

    if (!team) {
      return res.status(404).json({
        status: 'fail',
        message: 'Team not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        team: {
          teamId: team.teamId,
          name: team.name,
          members: team.members,
          theme: team.theme,
          tutor: team.tutor,
          reports: team.reports,
          createdAt: team.createdAt
        }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update team reports
exports.updateReports = async (req, res) => {
  try {
    const { report1, report2, report3 } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        status: 'fail',
        message: 'Team not found'
      });
    }

    // Update reports
    team.reports = {
      report1: report1 || team.reports.report1,
      report2: report2 || team.reports.report2,
      report3: report3 || team.reports.report3
    };

    await team.save();

    res.status(200).json({
      status: 'success',
      data: {
        team: {
          teamId: team.teamId,
          name: team.name,
          reports: team.reports
        }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Protect routes middleware
exports.protect = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in'
      });
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if team still exists
    const team = await Team.findById(decoded.id);
    if (!team) {
      return res.status(401).json({
        status: 'fail',
        message: 'Team no longer exists'
      });
    }

    // Grant access to protected route
    req.team = team;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token'
    });
  }
}; 