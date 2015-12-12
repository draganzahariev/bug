app.service('World', function () {

    var size = 12;

    var data = {};
    for (var i = 0; i < size, i++;) {
        for (var j = 0; j < size; j++) {
            data[[i, j]] = false;
        }
    }

    var isFoodPosition = function (position) {
        return data[position] == true;
    };

    var addRandomFood = function () {
        var coordinate = null;
        while (coordinate == null || isFoodPosition(coordinate)) {
            coordinate = getRandomCoordinate();
        }
        data[coordinate] = true;
    };

    var getRandomCoordinate = function () {
        var x = Math.round(Math.random() * 100) % size;
        var y = Math.round(Math.random() * 100) % size;
        return [x, y];
    };

    var removeFood = function (position) {
        data[position] = false;
    };

    for (var x = 0; x < 7; x++) {
        addRandomFood();
    }

    return {
        size: size,
        addRandomFood: addRandomFood,
        isFoodPosition: isFoodPosition,
        removeFood: removeFood,
        data: data
    };
});
