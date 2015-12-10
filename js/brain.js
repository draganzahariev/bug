app.service('Brain', function () {

    var lastDecision = {};

    var goodDecisions = {};


    var award = function () {
        var input = lastDecision['input'];
        var action = lastDecision['action'];
        if (input != null && goodDecisions[input] == null) {
            goodDecisions[input] = action;
        }
    };

    var process = function (input) {
        if (goodDecisions[input] != null) {
            award();
        }
    };

    var provideAction = function (input, scope, size) {
        var action;
        if (input != null && goodDecisions[input] != null) {
            action = goodDecisions[input];
        } else {
            action = randomAction(scope, size);
        }
        lastDecision = {input: input, action: action};
        return action;
    };

    var randomAction = function (scope, size) {
        var possibilities = [];
        if (scope.position[0] > 0) {
            possibilities.push('up');
        }
        if (scope.position[0] < size - 1) {
            possibilities.push('down');
        }
        if (scope.position[1] > 0) {
            possibilities.push('left');
        }
        if (scope.position[1] < size - 1) {
            possibilities.push('right');
        }
        var index = Math.round(Math.random() * 100) % (possibilities.length);
        return possibilities[index];
    };

    return {
        award: award,
        process: process,
        provideAction: provideAction,
        goodDecisions: goodDecisions
    };
});
