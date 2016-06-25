import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  birthdate: {
    type: Date,
    default: Date.now
  },
  parentName: {
    type: String,
    default: 'draft'
  },
  phone: {
    type: String,
    default: ''
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {minimize: false});

export default mongoose.model('Student', studentSchema);
