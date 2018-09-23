(function(app) {
  'use strict';
  app
    .controller("fiveDayCtrl", _controller);
    _controller.$inject = ['weatherService', '$state'];
    function _controller(weatherService, $state){
      var fiveDay = this;
      fiveDay.goToCurrent = function() {$state.go('currentTemp');};
      fiveDay.forecast = [];
      weatherService.getFiveDay()
        .then(function(data) {
          fiveDay.forecast = data;
          console.log("I am the fiveDayWeather", data);
        },function(err) {
          console.log("error in fiveDayController", err);
        });
    }
})(angular.module('weatherApp'));
