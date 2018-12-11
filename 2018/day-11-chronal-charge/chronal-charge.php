<?php

function calculatePower($yCoordinate, $xCoordinate, $serial)
{
    $rackId = $xCoordinate + 10;
    $power = ($rackId * $yCoordinate + $serial) * $rackId;

    return ($power < 100) ? 0 : substr(strrev($power), 2, 1) - 5;
}

function createPowerGrid($serial, $gridLimit)
{
    $grid = [];

    for ($i = 1; $i <= $gridLimit; $i++) {
        for ($j = 1; $j <= $gridLimit; $j++) {
            $grid[$i][$j] = calculatePower($i, $j, $serial);
        }
    }

    return $grid;
}

function calculateGridPower($grid, $row, $column, $size)
{
    $totalPower = 0;
    for ($i = $row; $i < $row + $size; $i++) {
        $currentRow = $grid[$i];
        $totalPower += array_sum(array_slice($currentRow, ($column - 1), $size));
    }

    return $totalPower;
}

function part1()
{
    $serial = 9424;
    $gridLimit = 300;

    $grid = createPowerGrid($serial, $gridLimit);

    $row = 1;
    $step = 3;
    $largestTotalPower = 0;
    $topLeft = false;

    while ($row <= ($gridLimit - $step)) {
        $column = 1;

        while ($column <= ($gridLimit - $step)) {
            $totalPower = calculateGridPower($grid, $row, $column, $step);

            if ($totalPower > $largestTotalPower) {
                $largestTotalPower = $totalPower;
                $topLeft = "$column,$row";
            }

            $column++;
        }

        $row++;
    }

    return $topLeft;
}

function part2()
{
    $serial = 9424;
    $gridLimit = 300;

    $grid = createPowerGrid($serial, $gridLimit);

    $row = 1;
    $largestTotalPower = 0;
    $topLeftSize = false;

    while ($row <= $gridLimit) {
        $column = 1;

        while ($column <= $gridLimit) {
            $maxSize = ($row > $column) ? $gridLimit - $row : $gridLimit - $column;

            for ($size = 1; $size <= $maxSize; $size++) {
                $totalPower = calculateGridPower($grid, $row, $column, $size);

                if ($totalPower > $largestTotalPower) {
                    $largestTotalPower = $totalPower;
                    $topLeftSize = "$column,$row,$size";
                }
            }

            $column++;
        }

        $row++;
    }

    return $topLeftSize;
}

$totalTime = microtime(true);
$part1Time = microtime(true);
echo "Part 1: " . part1() . "\n";
echo "Part 1 duration: " . (microtime(true) - $part1Time) ."\n";

$part2Time = microtime(true);
echo "Part 2: " . part2() . "\n";
echo "Part 2 duration: " . (microtime(true) - $part2Time) ."\n";
echo "Total duration: " . (microtime(true) - $totalTime) ."\n";
