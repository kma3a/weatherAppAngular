(function() {
 'use strict';
 angular.module('weatherApp.service',[])
  .service("weatherService", _weatherService);
    _weatherService.$inject = [];

    function _weatherService() {
      return {
      }
    }

 
})();
