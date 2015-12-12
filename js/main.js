app.controller('IndexController', function ($rootScope, $interval, Body, Brain, Behavior, World) {

    var scope = this;
    scope.horizontalNumbers = [];
    scope.verticalNumbers = [];
    for (var i = 0; i < World.size; i++) {
        scope.horizontalNumbers.push(i);
        scope.verticalNumbers.push(i);
    }
    scope.isFoodPosition = World.isFoodPosition;
    scope.addRandomFood = World.addRandomFood;

    scope.hunger = Behavior.hunger;
    scope.goodDecisions = Brain.goodDecisions;
    scope.position = Body.position;
    scope.data = World.data;
});
