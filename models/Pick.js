var mongoose = require('mongoose');

var PickSchema = new mongoose.Schema({
  _id: String,
  number: Number,
  needs: Array,
  player: Object,
  team: String,
  logo: String
});


mongoose.model('Pick', PickSchema);
