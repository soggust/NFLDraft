var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Prospect = mongoose.model("Prospect");


router.get("/", function(req, res, next) {
  Prospect.find({}).exec(function(err,result) {
    if(err) return next(err);
    res.send(result);
  });
});




// /* Move Player Up Or Down Big Board */
// vm.movePlayerUp = function (player) {
//
//   /* Find Rank Above and Demote, Then Move Our Rank Up*/
//   for(var x=0;x<vm.bigBoard.length; x++) {
//     if(player.bbRank - 1 === vm.bigBoard[x].bbRank) {
//       vm.bigBoard[x].bbRank += 1;
//
//       /* If We Move Above A Player Of Same Position, We Switch Their Positional Ranks */
//       if(vm.bigBoard[x].position === player.position) {
//         vm.bigBoard[x].rank += 1;
//         player.rank -= 1;
//       }
//       break;
//     }
//   }
//   player.bbRank -= 1;
// }
//
// vm.movePlayerDown = function (player) {
//   /* Find Rank Below and Promote, Then Move Our Rank Down*/
//   for(var x=0;x<vm.bigBoard.length; x++) {
//     if(player.bbRank + 1 === vm.bigBoard[x].bbRank) {
//       vm.bigBoard[x].bbRank -= 1;
//
//       /* If We Move Below A Player Of Same Position, We Switch Their Positional Ranks */
//       if(vm.bigBoard[x].position === player.position) {
//         vm.bigBoard[x].rank -= 1;
//         player.rank += 1;
//       }
//       break;
//     }
//   }
//   player.bbRank += 1;
// }

module.exports = router;
