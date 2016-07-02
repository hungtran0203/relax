import mongoose from 'mongoose';

import validators from 'root_lib/server/models/validators';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: validators.required,
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
    validate: validators.required,
  },
  phone: {
    type: String,
    validate: [validators.required, validators.phone],
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    validate: [validators.required, validators.email],
  },
  notes: {
    type: String,
    default: '',
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

export default mongoose.model('Course', courseSchema);
