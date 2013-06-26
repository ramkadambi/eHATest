'use strict';



var eventsApp = angular.module('eventsApp', []);

function myCtrl($scope){
	$scope.visible = true;

	$scope.toggle = function() {
		$scope.visible = !$scope.visible;
	}
}

function myOtherCtrl($scope){
	$scope.otherValue = "Bye bye";

	$scope.incBy = function(value){
		$scope.value2 = value + 1;
	}
}
  

  function myCtrl2($scope){
  	$scope.greeting = "";

  	$scope.watch("name", function(oldvalue, newvalue){
  		if($scope.name.length > 0) {
  			$scope.greeting = "Greeting " + $scope.name;
  		}

  	})
  }
