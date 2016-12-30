angular.module('starter.services', [])

.service ('ScannerService', function($http, $q) {

	return {
		addShot : function (token, bottleToken) {
			var deferred = $q.defer ();
			var url = 'https://www.gingerwald.com/community/v2.1/api/addBottleToDashboard.php?token=' + token + '&bottle_token=' + bottleToken;
      		
			/**/console.log ("Adding shot with bottle token " + bottleToken + ".");

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

.service ('DashboardService', function($http, $q) {

	return {
		getDashboard : function (token, dateFrom, dateTo) {
			var deferred = $q.defer ();
			var url = 'https://www.gingerwald.com/community/v2.1/api/getUserDashboard.php?token=' + token + '&report_from=' + dateFrom + '&report_to=' + dateTo;
      		
			/**/console.log ("Getting data from " + dateFrom + " to " + dateTo + ".");

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

		getWeekDates : function (date) {
			var firstDay = new Date ();
			var lastDay = new Date ();

			firstDay.setFullYear (date.getFullYear ());
			firstDay.setMonth (date.getMonth ());
			firstDay.setDate (date.getDate () - date.getDay () + 1);

			lastDay.setFullYear (date.getFullYear ());
			lastDay.setMonth (date.getMonth ());
			lastDay.setDate (date.getDate () + 7 - date.getDay ());

			return [firstDay, lastDay];
		},

		getMonthDates : function (date) {
			var firstDay = new Date ();
			var lastDay = new Date ();

			firstDay.setFullYear (date.getFullYear ());
			firstDay.setMonth (date.getMonth ());
			firstDay.setDate (1);

			lastDay.setFullYear (date.getFullYear ());
			lastDay.setMonth (date.getMonth () + 1); //+1 because day 0 returns the last day of the previous month
			lastDay.setDate (0);

			return [firstDay, lastDay];
		},

		addWeek : function (date) {
			date.setDate (date.getDate () + 7);

			return date;
		},

		subtractWeek : function (date) {
			date.setDate (date.getDate () - 7);

			return date;
		},

		addMonth : function (date) {
			if (date.getDate () == 1) {
				date.setMonth (date.getMonth () + 1);
			} else {
				date.setDate (1);
				date.setMonth (date.getMonth () + 2);
				date.setDate (0)
			}

			return date;
		},

		subtractMonth : function (date) {
			if (date.getDate () == 1) {
				date.setMonth (date.getMonth () - 1);
			} else {
				date.setDate (0);
			}

			return date;
		},
	}
});