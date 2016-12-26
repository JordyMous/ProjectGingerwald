angular.module('starter.services', [])

.service ('DashboardService', function($http, $q) {

	return {
		getDashboard : function (token, dateFrom, dateTo) {
			var deferred = $q.defer ();
			var url = 'https://www.gingerwald.com/community/v2.1/api/getUserDashboard.php?token=' + token + '&report_from=' + dateFrom + '&report_to=' + dateTo;
      		
			/**/console.log (url);

      		$http({
      			method: 'GET',
        		url: url
        	})
      		.success (function (data, status, headers, config) {
        		deferred.resolve (data);
		    })
		    .error (function (data, status, headers, config) {
		    	deferred.reject (status);
		    });

			return deferred.promise;
		},

		addShot : function (token, bottleToken) {
			var deferred = $q.defer ();
			var url = 'https://www.gingerwald.com/community/v2.1/api/addBottleToDashboard.php?token=' + token + '&bottle_token=' + bottleToken;
      		
			/**/console.log (url);

      		$http({
      			method: 'POST',
        		url: url
        	})
      		.success (function (data, status, headers, config) {
        		deferred.resolve (data);
		    })
		    .error (function (data, status, headers, config) {
		    	deferred.reject (status);
		    });

			return deferred.promise;
		}
	}
})

.service ('DateService', function () {

	return {
		formatDate : function (date) {
			var year = date.getFullYear ();
			var month = date.getMonth () + 1;
			var day = date.getDate ();

			return [year, month, day].join ('-');
		},

		getWeekDates : function (today) {
			var firstDay = new Date ();
			var lastDay = new Date ();

			firstDay.setFullYear (today.getFullYear ());
			firstDay.setMonth (today.getMonth ());
			firstDay.setDate (today.getDate () - today.getDay () + 1);

			lastDay.setFullYear (today.getFullYear ());
			lastDay.setMonth (today.getMonth ());
			lastDay.setDate (today.getDate () + 7 - today.getDay ());

			return [firstDay, lastDay];
		},

		getMonthDates : function (today) {
			var firstDay = new Date ();
			var lastDay = new Date ();

			firstDay.setFullYear (today.getFullYear ());
			firstDay.setMonth (today.getMonth ());
			firstDay.setDate (1);

			lastDay.setFullYear (today.getFullYear ());
			lastDay.setMonth (today.getMonth () + 1); //+1 because day 0 returns the last day of the previous month
			lastDay.setDate (0);

			return [firstDay, lastDay];
		},

		nextWeek : function (date) {
			date.setDate (date.getDate () + 7);
			return date;
		},

		previousWeek : function (date) {
			date.setDate (date.getDate () - 7);
			return date;
		},

		nextMonth : function (date) {
			date.setMonth (date.getMonth () + 1);
			return date;
		},

		previousMonth : function (date) {
			date.setMonth (date.getMonth () - 1);
			return date;
		},
	}
});