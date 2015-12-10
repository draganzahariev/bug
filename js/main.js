app.controller('IndexController', function ($interval, Brain) {

    var size = 12;
    var scope = this;
    scope.range = function (n) {
        return new Array(n);
    };

    scope.goodDecisions = Brain.goodDecisions;
    scope.eaten = 10;
    $interval(function () {
        if (scope.eaten > 0) {
            scope.eaten--;
        }
    }, 1000);

    $interval(function () {
        scope.move();
    }, 100);

    scope.horizontalNumbers = [];
    scope.verticalNumbers = [];
    for (var i = 0; i < size; i++) {
        scope.horizontalNumbers.push(i);
        scope.verticalNumbers.push(i);
    }

    var getRandomCoordinate = function () {
        var x = Math.round(Math.random() * 100) % size;
        var y = Math.round(Math.random() * 100) % size;
        return [x, y];
    };

    var addRandomFood = function () {
        var coordinate = null;
        while (coordinate == null || scope.isFoodPosition()) {
            coordinate = getRandomCoordinate();
        }
        scope.food.push(coordinate);
    }

    scope.addFood = function () {
        scope.food = [
            [0, 0],
            [3, 3],
            [2, 3],
            [5, 2],
            [4, 1],
//                [1, 1],
//                [6, 5],
//                [5, 6],
//                [3, 2],
//                [9, 6],
//                [2, 4],
//                [8, 8],
//                [8, 3],
            [6, 9],
            [7, 7],
            [4, 1],
            [2, 10],
            [10, 2],
            [11, 11]
        ];
    };
    scope.addFood();
    scope.position = [2, 3];
    scope.input = null;

    scope.isFoodPosition = function (position) {
        var result = false;
        if (position != null) {
            angular.forEach(scope.food, function (f) {
                if (position[0] == f[0] && position[1] == f[1]) {
                    result = true;
                }
            });
        }
        return result;
    };

    var eat = function (position) {
        var newFood = [];
        angular.forEach(scope.food, function (f) {
            if (position[0] != f[0] || position[1] != f[1]) {
                newFood.push(f);
            }
        });
        scope.food = newFood;
    };

    var see = function () {
        var pos = [scope.position[0] - 1, scope.position[1]];
        if (scope.isFoodPosition(pos)) {
            return 'food-up';
        }
        pos = [scope.position[0] + 1, scope.position[1]];
        if (scope.isFoodPosition(pos)) {
            return 'food-down';
        }
        pos = [scope.position[0], scope.position[1] - 1];
        if (scope.isFoodPosition(pos)) {
            return 'food-left';
        }
        pos = [scope.position[0], scope.position[1] + 1];
        if (scope.isFoodPosition(pos)) {
            return 'food-right';
        }

        pos = [scope.position[0] - 2, scope.position[1]];
        if (scope.isFoodPosition(pos)) {
            return 'food-far-up';
        }
        pos = [scope.position[0] + 2, scope.position[1]];
        if (scope.isFoodPosition(pos)) {
            return 'food-far-down';
        }
        pos = [scope.position[0], scope.position[1] - 2];
        if (scope.isFoodPosition(pos)) {
            return 'food-far-left';
        }
        pos = [scope.position[0], scope.position[1] + 2];
        if (scope.isFoodPosition(pos)) {
            return 'food-far-right';
        }

        return null;
    };

    scope.move = function () {
        var input = see();
        var decision = Brain.provideAction(input, scope, size);
        moveTo(decision);
        if (scope.isFoodPosition(scope.position)) {
            Brain.award();
            scope.eaten += 5;
            eat(scope.position);
            addRandomFood();
        } else {
            var newInput = see();
            Brain.process(newInput);
        }
    };

    var moveTo = function (direction) {
        if (direction == 'left') {
            scope.position[1]--;
        }
        if (direction == 'right') {
            scope.position[1]++;
        }
        if (direction == 'up') {
            scope.position[0]--;
        }
        if (direction == 'down') {
            scope.position[0]++;
        }
    };

    var randomDecision = function () {
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
});
