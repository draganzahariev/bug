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
        var input = Body.see();
        var action = Brain.provideAction(input);
        Body.moveTo(action);
        if (Body.isOnFoodPosition()) {
            Brain.award();
            hunger[0] > 5 ? hunger[0] -= 5 : hunger[0] = 0;
            Body.eat();
            World.addRandomFood();
        } else {
            var newInput = Body.see();
            Brain.process(newInput);
        }
    };

    return {
        hunger: hunger
    };
});
