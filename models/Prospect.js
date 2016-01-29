var mongoose = require('mongoose');

var ProspectSchema = new mongoose.Schema({
  _id: String,
  name: String,
  position: String,
  height: String,
  weight: Number,
  rank: Number,
  bbRank: Number,
  school: String,
  schImg: String,
  img: String,
  bio: String,
  strengths: Array,
  weaknesses: Array
});


mongoose.model('Prospect', ProspectSchema);
