(function() {
	'use strict';
	angular.module('app')
	.controller('CreateController', CreateController);

	function CreateController(HomeFactory, $scope, UserFactory) {
		var vm = this;
		vm.positions = ["QB", "HB", "FB", "WR", "TE", "OT", "OG", "C", "DE", "DT", "OLB", "ILB", "CB", "S"];
		vm.prospects = [];
		vm.picks = HomeFactory.picks;
		vm.showModal = false;
		vm.saving = false;
		vm.modalPlayer = {};
		vm.currentPick = 1;
		$scope.upperMenu = '0vh';
		$scope.lowerMenu = '50vh';
		vm.tooltipChecked = true;
		vm.draft = {};

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


		/* Save the Board */
		vm.addDraft = function() {
			vm.draft.picks = vm.picks;
			UserFactory.addDraft(vm.draft).then(function(res){
				vm.draft = {};
				vm.clearPicks();
			});
		}






		/* --------------Handle Picks-----------------------*/


		/* Add Pick */
		vm.addToDraft = function(player, index) {
			vm.picks[vm.currentPick - 1].player = player;
			vm.prospects.splice(vm.prospects.indexOf(player), 1);
			vm.setCurrentPick();
		}

		/* Remove Pick */
		vm.removePick = function(pick) {
			if(pick.player) {
				vm.prospects.splice(0, 0, pick.player);
				pick.player = null;
				vm.sortProspects();
				vm.setCurrentPick();
			}
		}

		/* Clear All Picks */
		vm.clearPicks = function() {
			for(var x = 0; x<vm.picks.length; x++) {
				vm.removePick(vm.picks[x]);
			}
		}




		/* --------------Misc Functionality-----------------------*/

		/* Make Sure Highest Pick Is Always Next To Be Selected*/
		vm.setCurrentPick = function() {
			for(var x=0;x<vm.picks.length;x++) {
				if(vm.picks[x].player === null) {
					vm.currentPick = vm.picks[x].number;
					break;
				}
			}
		}

		/* Define Which Player Will Be In Our Tooltip/Modal On Mouseover */
		vm.setModalPlayer = function(player) {
			vm.modalPlayer = player;
		}

		/* Open Menu */
		vm.toggleMenu = function() {
			if($scope.upperMenu === '0vh') {
				$scope.upperMenu = '17.5vh';
				$scope.lowerMenu = '32.5vh';
			} else {
				$scope.upperMenu = '0vh';
				$scope.lowerMenu = '50vh';
			}
		}
		/* Sorts Our Prospects Array */
		vm.sortProspects = function () {
			vm.prospects.sort(function(a, b) {
				return parseFloat(a.bbRank) - parseFloat(b.bbRank);
			});
		}


	}
})();
