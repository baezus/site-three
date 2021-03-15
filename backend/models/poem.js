const mongoose = require('mongoose');

const poemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  lines: [{
    type: String,
    ref: 'Line',
    required: true
  }],
  art: {
    type: String,
  },
  link: {
    type: String,
  },
  publisher: {
    type: String,
  },
  dateWritten: {
    type: String,
  }
})

poemSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

poemSchema.set('toJSON', {
  virtuals: true,
});

exports.Poem = mongoose.model('Poem', poemSchema);