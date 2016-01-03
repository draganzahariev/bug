app.service('Behavior', function ($rootScope, Body, Brain, World, $interval) {

    var hunger = [0];

    $interval(function () {
        hunger[0]++;
    }, 1000);

    $interval(function () {
        if (hunger[0] > 1) {
            doSomething();
        }
    }, 100);

    var doSomething = function () {
        var sight = Body.see();
        var action = Brain.provideAction(sight);
        if (action == "eat") {
            hunger[0] > 5 ? hunger[0] -= 5 : hunger[0] = 0;
            Body.eat();
            World.addRandomFood();
        } else {
            Body.moveTo(action);
        }
        var newSight = Body.see();
        Brain.provideFeedback(sight, action, newSight);
    };

    return {
        hunger: hunger
    };
});
