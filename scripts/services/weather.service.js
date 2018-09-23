(function() {
 'use strict';
 angular.module('weatherApp.service',[])
  .service("weatherService", _weatherService);
    _weatherService.$inject = ['$http', '$q'];

    function _weatherService($http, $q) {
      var standardApi = "https://api.openweathermap.org/data/2.5/";
      var currentVar = "weather";
      var fiveDayVar = "forecast";
      //fill in with you own app id
      var appID = "";
      var units = 'imperial';
      var imgUrl = 'http://openweathermap.org/img/w/';

      function getCurrentLocation() {
        var deferred = $q.defer();
        navigator.geolocation.getCurrentPosition(function(location) {
            console.log("long", location.coords.longitude);
            console.log("lat", location.coords.latitude);
            deferred.resolve({lat: location.coords.latitude, long: location.coords.longitude});
        }, function(error) {console.log("I errored", error);});
        return deferred.promise;
      }

      function callApi(whichApi) {
        getCurrentLocation();
        var deferred = $q.defer();
        getCurrentLocation()
          .then(function(data) {
            var url = standardApi + whichApi+ "?lat=" + data.lat + "&lon="+ data.long + "&appid=" + appID + '&units=' + units;
            return $http.get(url)
          },function( err) {
          })
          .then(function(data) {
            if(invalidData(data)) {
              deferred.reject("no returned data");
              return;
            }
            var weather = data.data;
            deferred.resolve(weather);
          }, function (err) {
            console.log('something went wrong', err);
            deferred.reject(err);
          });

        return deferred.promise;
      }

      function getCurrentWeather() {
        var deferred = $q.defer();
        callApi( currentVar)
          .then(function(data) {
            if(!data.main) {
              deferred.reject('No Data');
              return;
            }
            deferred.resolve(data.main);
          },function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      }

      function invalidData(data) {
        return !data && !data.data;
      }

      function getFiveDay() {
        var deferred = $q.defer();
        callApi(fiveDayVar)
          .then(function(data) {
            if(!Array.isArray(data.list)){
              deferred.reject("No Data");
              return;
            }
            console.log("I am the data", data.list);
            var parsedData = parse(data.list);
            deferred.resolve(parsedData);
          },function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      }

      function parse(data) {
        return data.map(function(element) { return filteredData(element);});
      }

      function filteredData(hourlyData) {
        var newHourly = {};
        newHourly.temp = hourlyData.main && hourlyData.main.temp || '';
        newHourly.date = hourlyData.dt_txt || '';
        var icon = hourlyData.weather && hourlyData.weather[0] && hourlyData.weather[0].icon;
        newHourly.img =  icon ?  imgUrl + icon + ".png" : '';
        return newHourly;
        
      }


      return {
        getCurrent: getCurrentWeather,
        getFiveDay: getFiveDay
      }
    }

 
})();
