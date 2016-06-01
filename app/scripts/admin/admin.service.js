(function() {

	'use strict';

	angular.module('admin').factory('adminService', adminService);

	adminService.$inject = ['$q', '$firebaseArray', '$firebaseRef'];

	function adminService ($q, $firebaseArray, $firebaseRef) {

		let pendingList = $firebaseArray($firebaseRef.pending);

		return {
			addNewEmails: addNewEmails,
			getPendingList: getPendingList
		};


		function addNewEmails (array, league) {

			let promises = [];

			return pendingList.$loaded()
			.then((list) => {

				array.forEach((email) => {

					email = email.trim();

					let regexp = /^.*\@.*\..*$/;

					let found = list.find((elem) => {

						return elem.email === email;
					});

					if (regexp.test(email) && !found) {

						promises.push(list.$add({email: email, league: league}));
					}
				})

				return $q.all(promises);
			})
		}


		function getPendingList () {

			return pendingList.$loaded();
		}
	}

})();