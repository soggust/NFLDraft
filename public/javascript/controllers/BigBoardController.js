(function() {
	'use strict';
	angular.module('app')
	.controller('BigBoardController', BigBoardController);

	function BigBoardController(HomeFactory, UserFactory) {
		var vm = this;

		vm.prospects = [];

		/* Gets Our Prospects Array */
		vm.getProspects = function () {
			console.log(UserFactory.status.prospects);
			if(UserFactory.status.prospects) {
				vm.prospects = UserFactory.status.prospects;
			} else {
				vm.prospects = HomeFactory.prospects;
			}
		}

		/* Move Player Up Or Down Board */
		vm.movePlayerUp = function(prospect) {
			HomeFactory.movePlayerUp(prospect).then(function(){
				vm.getProspects();
			});
		};
		vm.movePlayerDown = function(prospect) {
			HomeFactory.movePlayerDown(prospect).then(function(){
				vm.getProspects();
			});
		};


		/* Save Board */
		vm.saveBoard = function() {
			HomeFactory.bigBoard = vm.bigBoard;
		}

		/* Reset Board */
		vm.resetBoard = function() {
			vm.bigBoard = [];
			for(var x=0;x<HomeFactory.resetProspects.length;x++) {
				vm.bigBoard.push(HomeFactory.resetProspects[x]);
			}
			HomeFactory.prospects = [];
			for(var x=0;x<HomeFactory.resetProspects.length;x++) {
				HomeFactory.prospects.push(HomeFactory.resetProspects[x]);
			}
		}









	}
})();
