(function(app) {
  'use strict';
  app
    .controller("currentTempCtrl", _controller);
    _controller.$inject = ['weatherService', '$state'];
    function _controller(weatherService, $state){
      var currentTemp = this;
      currentTemp.currentTemp = "unknown";
      currentTemp.goToFive =  function() {return $state.go('fiveDay');}
      weatherService.getCurrent()
        .then(function(data) {
          console.log("I am the currentWeather", data);
          currentTemp.currentTemp = data.temp + " F";
        },function(err) {
          console.log("error in currentTempController", err);
          currentTemp.currentTemp = "current temp not found for your location";
        });
    }
})(angular.module('weatherApp'));
