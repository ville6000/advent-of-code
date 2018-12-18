<?php

function createGrid($file)
{
    $rows = explode("\n", file_get_contents($file));
    $rows = array_filter($rows, function ($item) {
        return !empty($item);
    });

    $grid = [];
    $idx = 0;

    foreach ($rows as $row) {
        $grid[$idx] = str_split($row);
        $idx++;
    }

    return $grid;
}

function isOpenGround($item)
{
    return $item === '.';
}

function isTrees($item)
{
    return $item === '|';
}

function isLumberyard($item)
{
    return $item === '#';
}

function findAdjecentMatches($needle, $grid, $rowIdx, $colIdx)
{
    $matches = 0;

    for ($i = 0; $i < count($grid); $i++) {
        for ($j = 0; $j < count($grid); $j++) {
            if ($i == $rowIdx || $i === ($rowIdx - 1) || $i === ($rowIdx + 1)) {
                if ($j == $colIdx || $j === ($colIdx - 1) || $j === ($colIdx + 1)) {
                    if ($i !== $rowIdx || $j !== $colIdx) {
                        if (isset($grid[$i]) && isset($grid[$i][$j]) && $needle === $grid[$i][$j]) {
                            $matches++;
                        }
                    }
                }
            }

        }
    }

    return $matches;
}

function part1()
{
    $grid = createGrid('./input.txt');
    $minutes = 0;

    while ($minutes < 10) {
        $startState = $grid;

        for ($rowIdx = 0; $rowIdx < count($grid); $rowIdx++) {
            for ($colIdx = 0; $colIdx < count($grid); $colIdx++) {
                if (isOpenGround($startState[$rowIdx][$colIdx])) {
                    if (3 <= findAdjecentMatches('|', $startState, $rowIdx, $colIdx)) {
                        $grid[$rowIdx][$colIdx] = '|';
                    }
                } else {
                    if (isTrees($startState[$rowIdx][$colIdx])) {
                        if (3 <= findAdjecentMatches('#', $startState, $rowIdx, $colIdx)) {
                            $grid[$rowIdx][$colIdx] = '#';
                        }
                    } else {
                        if (isLumberyard($startState[$rowIdx][$colIdx])) {
                            if (1 <= findAdjecentMatches('#', $startState, $rowIdx,
                                    $colIdx) && 1 <= findAdjecentMatches('|', $startState, $rowIdx, $colIdx)) {
                                $grid[$rowIdx][$colIdx] = '#';
                            } else {
                                $grid[$rowIdx][$colIdx] = '.';
                            }
                        }
                    }
                }
            }
        }

        $minutes++;
    }

    $woodCount = 0;
    $lumberCount = 0;

    for ($rowIdx = 0; $rowIdx < count($grid); $rowIdx++) {
        for ($colIdx = 0; $colIdx < count($grid); $colIdx++) {
            if (isTrees($grid[$rowIdx][$colIdx])) {
                $woodCount++;
            } else {
                if (isLumberyard($grid[$rowIdx][$colIdx])) {
                    $lumberCount++;
                }
            }
        }
    }

    return $lumberCount * $woodCount;
}

echo "Part 1: " . part1() . "\n";
