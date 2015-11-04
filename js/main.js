angular.module('robot', [])
    .controller('IndexController', function($interval) {
        var scope = this;
        scope.hunger = 0;
        $interval(function() {
            if (scope.hunger < 100) {
                scope.hunger ++;
            }
        }, 1000);
    });