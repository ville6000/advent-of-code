<?php

function calculatePower($yCoordinate, $xCoordinate, $serial)
{
    $rackId = $xCoordinate + 10;
    $power = ($rackId * $yCoordinate + $serial) * $rackId;

    return ($power < 100) ? 0 : substr(strrev($power), 2, 1) - 5;
}

function part1()
{
    $serial = 9424;
    $gridLimit = 300;
    $grid = [];

    for ($i = 1; $i <= $gridLimit; $i++) {
        for ($j = 1; $j <= $gridLimit; $j++) {
            $grid[$i][$j] = calculatePower($i, $j, $serial);
        }
    }

    $row = 1;
    $step = 3;
    $largestTotalPower = 0;
    $topLeft = false;

    while ($row <= $gridLimit) {
        $column = 1;

        while ($column <= $gridLimit) {
            $totalPower = 0;

            for ($i = $row; $i < $row + $step; $i++) {
                for ($j = $column; $j < $column + $step; $j++) {
                    $totalPower += $grid[$i][$j];
                }
            }

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

echo "Part 1: " . part1() . "\n";