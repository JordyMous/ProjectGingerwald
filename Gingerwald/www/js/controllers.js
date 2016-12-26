angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  	// With the new view caching in Ionic, Controllers are only called
  	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	  	}).then(function(modal) {
	    	$scope.modal = modal;
	  	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

	    // Simulate a login delay. Remove this and replace with your login
	    // code if using a login system
	    $timeout(function() {
	    	$scope.closeLogin();
	    }, 1000);
	};
})

.controller ("DashboardCtrl", ['$scope', 'DashboardService', 'DateService', function ($scope, DashboardService, DateService) {
	
	//DEZE TOKEN KRIJG JE PAS TIJENS HET INLOGGEN, AANGEZIEN HET INLOGGEN NIET WERKT NAAR BEHOREN STAAT DEZE TIJDELIJK HIER OPGESLAGEN
	$scope.token = "VRYsLhjqom93MPPPcfeaWwmb8S3hwS7rImoqS3OOVthP4BFApUPT1wIsW2UmSiFO";
	$scope.data = "";
	/**/$scope.response = "";

	$scope.DOM = {
		ingredients: document.getElementById ("ingredients"),
		nutrients: document.getElementById ("nutrients")
	};

	$scope.today = new Date ();
	$scope.firstDayWeek = DateService.getWeekDates ($scope.today)[0];
	$scope.lastDayWeek = DateService.getWeekDates ($scope.today)[1];
	$scope.firstDayMonth = DateService.getMonthDates ($scope.today)[0];
	$scope.lastDayMonth = DateService.getMonthDates ($scope.today)[1];

	$scope.dateFrom = $scope.firstDayMonth;
	$scope.dateTo = $scope.lastDayMonth;


	$scope.bottleToken = "f0uNmGdduGPsqo";

	/**/$scope.nextWeek = function () {
		$scope.dateFrom = DateService.nextWeek ($scope.dateFrom);
		$scope.dateTo = DateService.nextWeek ($scope.dateTo);
		$scope.getuserDashboard ();
	};

	/**/$scope.previousWeek = function () {
		$scope.dateFrom = DateService.previousWeek ($scope.dateFrom);
		$scope.dateTo = DateService.previousWeek ($scope.dateTo);
		$scope.getuserDashboard ();
	};

	/**/$scope.nextMonth = function () {
		$scope.dateFrom = DateService.nextMonth ($scope.dateFrom);
		$scope.dateTo = DateService.nextMonth ($scope.dateTo);
		$scope.getuserDashboard ();
	};

	/**/$scope.previousMonth = function () {
		$scope.dateFrom = DateService.previousMonth ($scope.dateFrom);
		$scope.dateTo = DateService.previousMonth ($scope.dateTo);
		$scope.getuserDashboard ();
	};

	/**/$scope.addShot = function () {
		$scope.test = DashboardService.addShot ($scope.token, $scope.bottleToken);

		$scope.test.then (function (data) {
			$scope.response = data;
			console.log ($scope.response);
		});
	};

	$scope.getuserDashboard = function () {
		$scope.dashboard = DashboardService.getDashboard ($scope.token, DateService.formatDate ($scope.dateFrom), DateService.formatDate ($scope.dateTo));

		$scope.dashboard.then (function (data) {
			$scope.data = data;
			console.log ($scope.data.Shots);
		});
	};

	$scope.showIngredients = function () {
		//TIJDELIJK ZO, LATER VIA STYLE LATEN AANPASSEN EN EEN CSS DING MAKEN EN VISIBLE OP NONE ZET
		//EVENTUEEL OOK MET VIEWS WERKEN
		$scope.DOM.ingredients.style.display = "block";
		$scope.DOM.nutrients.style.display = "none";
	};

	$scope.showNutrients = function () {
		//TIJDELIJK ZO, LATER VIA STYLE LATEN AANPASSEN EN EEN CSS DING MAKEN EN VISIBLE OP NONE ZET
		$scope.DOM.nutrients.style.display = "block";
		$scope.DOM.ingredients.style.display = "none";
	};

	$scope.getuserDashboard ();
	//$scope.addShot ();
}])