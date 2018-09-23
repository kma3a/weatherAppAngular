(function(app) {
  'use strict';
  app
    .controller("homeCtrl", _controller);
    _controller.$inject = ['weatherService'];
    function _controller(weatherService){
      var home = this;
      home.message = "This is the weather app";
    }
})(angular.module('weatherApp'));
