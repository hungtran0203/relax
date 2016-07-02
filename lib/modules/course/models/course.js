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
  students: [],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: Date.now
  },
  teachers: {
    type: String,
  },
  assistants: {
    type: String,
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
