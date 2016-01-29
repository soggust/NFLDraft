(function() {
	'use strict';
	angular.module('app')
	.controller('CreateController', CreateController);

	function CreateController(HomeFactory, $scope) {
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

		vm.getNumber = function(num) {
    	return new Array(num);
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


		/* Make Sure Highest Pick Is Always Next To Be Selected*/
		vm.setCurrentPick = function() {
			for(var x=0;x<vm.picks.length;x++) {
				if(vm.picks[x].player === null) {
					vm.currentPick = vm.picks[x].number;
					break;
				}
			}
		}

		/* Clear The Draft */
		vm.clearBoard = function() {
			vm.prospects = HomeFactory.getProspects();
			vm.sortProspects();
			vm.setCurrentPick();
		}

		/* Gets Our Prospects Array */
		vm.getProspects = function () {
			HomeFactory.getProspects().then(function(res){
				vm.prospects = res;
			});
		}

		/* Sorts Our Prospects Array */
		vm.sortProspects = function () {
			vm.prospects.sort(function(a, b) {
				return parseFloat(a.bbRank) - parseFloat(b.bbRank);
			});
		}
	}
})();
