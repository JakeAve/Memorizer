const mongoose = require('mongoose');

const ScriptSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Script is required'],
  },
  memorized: {
    type: Boolean,
    default: false,
  },
  lastPracticed: {
    type: Date,
    default: Date.now,
  },
});

const ScriptModel = mongoose.model('Script', ScriptSchema);

module.exports = { ScriptSchema, ScriptModel };
