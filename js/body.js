app.service('Body', function ($rootScope, World) {

    var position = [2, 3];

    var getRandomAction = function () {
        var possibilities = [];
        if (position[0] > 0) {
            possibilities.push('up');
        }
        if (position[0] < World.size - 1) {
            possibilities.push('down');
        }
        if (position[1] > 0) {
            possibilities.push('left');
        }
        if (position[1] < World.size - 1) {
            possibilities.push('right');
        }
        var index = Math.round(Math.random() * 100) % (possibilities.length);
        return possibilities[index];
    };

    var see = function () {
        var pos = [position[0] - 1, position[1]];
        if (World.isFoodPosition(pos)) {
            return 'food-up';
        }
        pos = [position[0] + 1, position[1]];
        if (World.isFoodPosition(pos)) {
            return 'food-down';
        }
        pos = [position[0], position[1] - 1];
        if (World.isFoodPosition(pos)) {
            return 'food-left';
        }
        pos = [position[0], position[1] + 1];
        if (World.isFoodPosition(pos)) {
            return 'food-right';
        }

        pos = [position[0] - 2, position[1]];
        if (World.isFoodPosition(pos)) {
            return 'food-far-up';
        }
        pos = [position[0] + 2, position[1]];
        if (World.isFoodPosition(pos)) {
            return 'food-far-down';
        }
        pos = [position[0], position[1] - 2];
        if (World.isFoodPosition(pos)) {
            return 'food-far-left';
        }
        pos = [position[0], position[1] + 2];
        if (World.isFoodPosition(pos)) {
            return 'food-far-right';
        }

        return null;
    };

    var isOnFoodPosition = function () {
        return World.isFoodPosition(position);
    };

    var moveTo = function (action) {
        if (action == 'left') {
            position[1]--;
        }
        if (action == 'right') {
            position[1]++;
        }
        if (action == 'up') {
            position[0]--;
        }
        if (action == 'down') {
            position[0]++;
        }
    };

    var eat = function () {
        World.removeFood(position);
    };

    return {
        getRandomAction: getRandomAction,
        see: see,
        moveTo: moveTo,
        isOnFoodPosition: isOnFoodPosition,
        eat: eat,
        position: position
    };
});
