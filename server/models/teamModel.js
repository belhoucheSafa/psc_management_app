const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a team name']
  },
  members: [{
    matricule: {
      type: String,
      required: [true, 'Please provide matricule']
    },
    name: {
      type: String,
      required: [true, 'Please provide name']
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      lowercase: true
    },
    specialty: {
      type: String,
      required: [true, 'Please provide specialty']
    }
  }],
  theme: {
    type: String,
    required: [true, 'Please select a theme']
  },
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Team must have a tutor']
  },
  accessCode: {
    type: String,
    required: true,
    unique: true,
    select: false // Don't send this in queries by default
  },
  reports: {
    report1: {
      type: String, // URL or path to the document
      default: null
    },
    report2: {
      type: String, // URL or path to the document
      default: null
    },
    report3: {
      type: String, // URL or path to the video
      default: null
    }
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate team ID before saving
teamSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Generate team ID (e.g., TEAM-PSC01)
    const count = await this.constructor.countDocuments();
    this.teamId = `TEAM-PSC${String(count + 1).padStart(2, '0')}`;
    
    // Generate and hash access code
    const accessCode = Math.floor(1000000 + Math.random() * 9000000).toString();
    this.accessCode = await bcrypt.hash(accessCode, 12);
  }
  next();
});

// Method to check if access code is correct
teamSchema.methods.correctAccessCode = async function(candidateCode) {
  return await bcrypt.compare(candidateCode, this.accessCode);
};

const Team = mongoose.model('Team', teamSchema);

module.exports = Team; 