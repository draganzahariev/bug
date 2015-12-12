app.service('Brain', function (Body) {

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

    var provideAction = function (input) {
        var action = null;
        if (input != null && goodDecisions[input] != null) {
            action = goodDecisions[input];
        }
        if (action == null) {
            action = Body.getRandomAction();
        }
        lastDecision = {input: input, action: action};
        return action;
    };

    return {
        award: award,
        process: process,
        provideAction: provideAction,
        goodDecisions: goodDecisions
    };
});
