const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  pull_quote: [{
    type: String,
    ref: 'Line',
    required: true
  }],
  imagery: {
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
  },
  richDescription: {
    type: String,
  }
})

articleSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

articleSchema.set('toJSON', {
  virtuals: true,
});

exports.Article = mongoose.model('Article', articleSchema);