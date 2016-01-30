(function() {
	'use strict';
	angular.module('app')
	.controller('BigBoardController', BigBoardController);

	function BigBoardController(HomeFactory, UserFactory) {
		var vm = this;

		vm.prospects = [];

		/* Initialize the Board */
		vm.initBoard = function() {
			if(UserFactory.status.username){
				UserFactory.getProspects().then(function(res){
					vm.prospects = res;
				});
			} else {
				vm.prospects = HomeFactory.prospects;
			}
		};
		vm.initBoard();



		/* Move Player Up Or Down Board */
		vm.movePlayerUp = function(prospect) {
			for(var x=0;x<vm.prospects.length;x++) {
				if(vm.prospects[x].bbRank === prospect.bbRank - 1) {
					if(vm.prospects[x].position === prospect.position) {
						vm.prospects[x].rank += 1;
						prospect.rank -= 1;
					}
					vm.prospects[x].bbRank += 1;
					prospect.bbRank -= 1;
					break;
				}
			}
		};
		vm.movePlayerDown = function(prospect) {
			for(var x=0;x<vm.prospects.length;x++) {
				if(vm.prospects[x].bbRank === prospect.bbRank + 1) {
					if(vm.prospects[x].position === prospect.position) {
						vm.prospects[x].rank -= 1;
						prospect.rank += 1;
					}
					vm.prospects[x].bbRank -= 1;
					prospect.bbRank += 1;
					break;
				}
			}
		};


		/* Save Board */
		vm.saveBoard = function() {
			UserFactory.saveBoard(vm.prospects).then(function(res){
				alert("SUCCESS");
			});
		};



	}
})();
