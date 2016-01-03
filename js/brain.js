app.service('Brain', function (Body) {

    var goodDecisions = {};
    var instincts = {"food": "eat"};

    var rememberAsGood = function (sight, action) {
        if (sight) {
            goodDecisions[sight] = action;
            console.info('remembered as good: ' + sight + " -> " + action);
        }
    };

    var forget = function (sight, action) {
        if (sight && goodDecisions[sight] == action) {
            delete goodDecisions[sight];
            console.info("forgot: " + sight + " -> " + action);
        }
    };

    var provideFeedback = function (sight, action, newSight) {
        if (newSight in instincts) {
            rememberAsGood(sight, action);
        } else if (newSight in goodDecisions) {
            rememberAsGood(sight, action);
        } else {
            forget(sight, action);
        }
    };

    var provideAction = function (input) {
        var action = null;
        if (input != undefined) {
            if (instincts[input] != undefined) {
                action = instincts[input];
            } else if (goodDecisions[input] != undefined) {
                action = goodDecisions[input];
            }
        }
        if (action == null) {
            action = Body.getRandomAction();
        }

        return action;
    };

    return {
        provideFeedback: provideFeedback,
        provideAction: provideAction,
        goodDecisions: goodDecisions
    };
});
