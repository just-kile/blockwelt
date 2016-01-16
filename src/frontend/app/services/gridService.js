/**
 * Created by thomas on 16.01.16.
 */

var module = angular.module('blockweltapp');

module.factory('gridService', function() {

    const cellCount = 20;

    function calculateCellSize(dimensions) {
        var maxDimension = Math.max(dimensions.width, dimensions.height);

        var x = 0;
        while (Math.pow(2, x) * cellCount > maxDimension) {
            x -= 10;
        }

        while (Math.pow(2, x) * cellCount < maxDimension) {
            x++;
        }

        return Math.pow(2, x);
    }

    function calculateOffset(cellSize, offset) {
        var x = 0;

        while (x * cellSize > offset) {
            x -= 10;
        }

        while ((x + 1) * cellSize <= offset) {
            x++;
        }

        return x * cellSize;
    }

    function calculateCellCount(offsetDiff, dimension, cellSize) {
        var numCells = Math.ceil(dimension / cellSize);
        if (offsetDiff != 0) {
            numCells++;
        }
        return numCells
    }

    return {
        calculate: function(dimensions) {

            const cellSize = calculateCellSize(dimensions);
            const offsetLatitude = calculateOffset(cellSize, dimensions.latitude);
            const offsetLongitude = calculateOffset(cellSize, dimensions.longitude);

            return {
                latitude: offsetLatitude,
                longitude: offsetLongitude,
                width: cellSize,
                height: cellSize,
                numLatitude: calculateCellCount(offsetLatitude - dimensions.latitude, dimensions.width, cellSize),
                numLongitude: calculateCellCount(offsetLongitude - dimensions.longitude, dimensions.height, cellSize)
            }
        }

    }
});