<?php

use Phpml\Math\Distance\Manhattan;

require './vendor/autoload.php';

function readCoordinates($file)
{
    $contents = file_get_contents($file);

    $rows = array_filter(explode("\n", $contents), function ($row) {
        return !empty($row);
    });

    $coordinates = array_map(function ($item) {
        return array_map('intval', explode(',', $item));
    }, $rows);

    $xMax = max(array_map(function ($coordinate) {
        return $coordinate[0];
    }, $coordinates));

    $yMax = max(array_map(function ($coordinate) {
        return $coordinate[1];
    }, $coordinates));

    $grid = [];
    for ($i = 0; $i <= $yMax; $i++) {
        for ($j = 0; $j <= $xMax; $j++) {
            $item = findClosest($i, $j, $coordinates);
            $grid[$i][$j] = $item;
            // echo $grid[$i][$j];
        }

        // echo "\n";
    }

    // echo "\n";

    return $grid;
}

function findClosest($y, $x, $coordinates)
{
    $m = new Manhattan();
    $distances = [];

    foreach ($coordinates as $key => $coordinate) {
        $distance = $m->distance([$x, $y], $coordinate);
        $distances[$key] = $distance;
    }

    $min = min($distances);

    $minMatches = array_filter($distances, function ($item) use ($min) {
        return $item === $min;
    });

    return count($minMatches) > 1 ? '.' : array_keys($minMatches)[0];
}

function part1()
{
    $grid = readCoordinates('./input.txt');
    $rowIdx = 0;
    $values = [];

    $invalidValues = [];

    foreach ($grid as $row) {
        $colIdx = 0;

        foreach ($row as $column) {
            if (0 === $colIdx || ($colIdx === count($row) - 1) || ($rowIdx === count($grid) - 1) || $rowIdx === 0) {
                $invalidValues[] = $column;
            }

            $colIdx++;
        }
        $rowIdx++;
    }

    foreach ($grid as $row) {
        $colIdx = 0;
        foreach ($row as $column) {
            if (!in_array($column, $invalidValues)) {
                $values[] = $column;
            }

            $colIdx++;
        }

        $rowIdx++;
    }

    return max(array_count_values($values));
}

$part1Start = microtime(true);
echo "Part 1: " . part1() . "\n";
echo "Part 1 duration: " . (microtime(true) - $part1Start) . "\n";
