angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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

.controller ("DashboardCtrl", function ($scope, $filter, DashboardService, DateService) {
	
	//DEZE TOKEN KRIJG JE PAS TIJENS HET INLOGGEN, AANGEZIEN HET INLOGGEN NIET WERKT NAAR BEHOREN STAAT DEZE TIJDELIJK HIER OPGESLAGEN
	$scope.token = "VRYsLhjqom93MPPPcfeaWwmb8S3hwS7rImoqS3OOVthP4BFApUPT1wIsW2UmSiFO";

	$scope.data = "";
	$scope.response = "";

	$scope.DOM = {
		allTime: document.getElementById ("allTime"),
		perWeek: document.getElementById ("perWeek"),
		perMonth: document.getElementById ("perMonth"),
		ingredients: document.getElementById ("ingredients"),
		nutrients: document.getElementById ("nutrients")
	};

	$scope.today = new Date ();
	$scope.firstDayWeek = DateService.getWeekDates ($scope.today)[0];
	$scope.lastDayWeek = DateService.getWeekDates ($scope.today)[1];
	$scope.firstDayMonth = DateService.getMonthDates ($scope.today)[0];
	$scope.lastDayMonth = DateService.getMonthDates ($scope.today)[1];

	$scope.getuserDashboard = function (dateFrom, dateTo) {
		$scope.dashboard = DashboardService.getDashboard ($scope.token, dateFrom, dateTo);

		$scope.dashboard.then (function (data) {
			$scope.data = data;
		}, function (reason) {
			alert (reason);
		});
	};

	$scope.addWeek = function () {
		$scope.firstDayWeek = DateService.addWeek ($scope.firstDayWeek);
		$scope.lastDayWeek = DateService.addWeek ($scope.lastDayWeek);
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayWeek), DateService.formatDate ($scope.lastDayWeek));
	};

	$scope.subtractWeek = function () {
		$scope.firstDayWeek = DateService.subtractWeek ($scope.firstDayWeek);
		$scope.lastDayWeek = DateService.subtractWeek ($scope.lastDayWeek);
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayWeek), DateService.formatDate ($scope.lastDayWeek));
	};

	$scope.addMonth = function () {
		$scope.firstDayMonth = DateService.addMonth ($scope.firstDayMonth);
		$scope.lastDayMonth = DateService.addMonth ($scope.lastDayMonth);
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayMonth), DateService.formatDate ($scope.lastDayMonth));
	};

	$scope.subtractMonth = function () {
		$scope.firstDayMonth = DateService.subtractMonth ($scope.firstDayMonth);
		$scope.lastDayMonth = DateService.subtractMonth ($scope.lastDayMonth);
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayMonth), DateService.formatDate ($scope.lastDayMonth));
	};

	//Onderstaande functies zijn tijdelijk, ik zal waarschijnlijk niet op die manier met de DOM werken
	$scope.showAllTimeData = function () {
		$scope.DOM.allTime.style.display = "block";
		$scope.DOM.perWeek.style.display = "none";
		$scope.DOM.perMonth.style.display = "none";
		$scope.getuserDashboard	("", "");
	};

	$scope.showWeekData = function	() {
		$scope.DOM.allTime.style.display = "none";
		$scope.DOM.perWeek.style.display = "block";
		$scope.DOM.perMonth.style.display = "none";
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayWeek), DateService.formatDate ($scope.lastDayWeek));
	};

	$scope.showMonthData = function	() {
		$scope.DOM.allTime.style.display = "none";
		$scope.DOM.perWeek.style.display = "none";
		$scope.DOM.perMonth.style.display = "block";
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayMonth), DateService.formatDate ($scope.lastDayMonth));
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

	$scope.showAllTimeData ();
})

.controller ("ScannerCtrl", function ($scope, $cordovaBarcodeScanner, ScannerService) {

	$scope.token = "VRYsLhjqom93MPPPcfeaWwmb8S3hwS7rImoqS3OOVthP4BFApUPT1wIsW2UmSiFO";
	$scope.bottleToken = "";

	$scope.scanBarcode = function () {
		$cordovaBarcodeScanner.scan ().then (function (imageData) {
			$scope.bottleToken = imageData.text.substr (27, 40);
		}, function (error) {
			alert ("An error happened: " + error);
		});
	};

	$scope.addShot = function () {
		$scope.scanner = ScannerService.addShot ($scope.token, $scope.bottleToken);

		$scope.scanner.then (function (data) {
			$scope.bottleToken = "Shot toegevoegd!";
		}, function (reason) {
			$scope.bottleToken = "Shot bestaat al! (" + reason + ")";
		});
	};
})