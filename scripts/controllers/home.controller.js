(function(app) {
  'use strict';
  app
    .controller("homeCtrl", _controller);
    _controller.$inject = [];
    function _controller(){
      var home = this;
      home.message = "Hello World! I am here!";
    }
})(angular.module('weatherApp'));
