const mongoose = require('mongoose');

const lineSchema = mongoose.Schema({
  whichLine: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  parentPoem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem'
  }
});

exports.Line = mongoose.model('Line', lineSchema);