var mongoose = require('mongoose');

var DraftSchema = new mongoose.Schema({
  _id: String,
  name: String,
  creator: String,
  created: Date,
  draft: Array,
  likes: Number,
  public: Boolean
});


mongoose.model('Draft', DraftSchema);
