'use strict';

//Controller receives the scope and populates the scope value
eventsApp.controller('EventController', function EventController($scope){
	$scope.event = {
		name: "Angular Boot Camp",
		date: '06/01/2013',
		time: '10:30 AM',
		location: {
			address: 'eHA HQ',
			city: 'Hyderabad',
			state: 'AP'
		}
	}

});