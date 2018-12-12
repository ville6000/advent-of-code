<?php

function parseInput($file)
{
    $rows = explode("\n", file_get_contents($file));
    $lights = [];

    foreach ($rows as $row) {
        preg_match_all('/(?<=\<)(.*?)(?=\>)/', $row, $matches);

        $position = array_map('intval', explode(',', $matches[0][0]));
        $velocity = array_map('intval', explode(',', $matches[0][1]));
        $lights[] = [$position[0], $position[1], $velocity[0], $velocity[1]];
    }

    return $lights;
}

function drawGrid($lights, $seconds)
{
    $yValues = array_map(function ($item) {
        return $item[1];
    }, $lights);

    $rowMax = max($yValues);
    $rowMin = min($yValues);

    $xValues = array_map(function ($item) {
        return $item[0];
    }, $lights);

    $columnMax = max($xValues);
    $columnMin = min($xValues);

    $threshold = 100;

    if ($rowMax - $rowMin < $threshold && $columnMax - $columnMin < $threshold) {
        echo "Seconds elapsed: $seconds \n";

        for ($y = $rowMin; $y <= $rowMax; $y++) {
            for ($x = $columnMin; $x <= $columnMax; $x++) {
                $match = false;

                foreach ($lights as $light) {
                    if ($light[0] === $x && $light[1] === $y) {
                        $match = true;
                        break;
                    }
                }

                echo $match ? '#' : '.';
            }

            echo "\n";
        }

        echo "\n";
    }
}

function part1andpart2()
{
    $lights = parseInput('./input.txt');
    $idx = 0;

    while ($idx < 10646) {
        drawGrid($lights, $idx);

        for ($i = 0; $i < count($lights); $i++) {
            $lights[$i][0] += $lights[$i][2];
            $lights[$i][1] += $lights[$i][3];
        }

        $idx++;
    }
}

part1andpart2();