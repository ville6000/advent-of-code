<?php

function formatSteps($inputFile)
{
    $rows = explode("\n", file_get_contents($inputFile));
    $steps = [];

    foreach ($rows as $row) {
        $dependency = substr($row, 5, 1);
        $mainStep = substr($row, 36, 1);

        if (!isset($steps[$mainStep])) {
            $steps[$mainStep] = [];
        }

        if (!isset($steps[$dependency])) {
            $steps[$dependency] = [];
        }

        $steps[$mainStep][] = $dependency;
    }

    ksort($steps);

    return $steps;
}

function findNext($steps, $key = false)
{
    $nextSteps = [];

    foreach ($steps as $main => $step) {
        if ($key) {
            if (in_array($key, $step)) {
                $nextSteps[] = $main;
            }
        } else {
            if (empty($step)) {
                $nextSteps[] = $main;
            }
        }
    }

    sort($nextSteps);

    return $nextSteps;
}

function removeCompleted($currentKey, $steps)
{
    foreach ($steps as $key => $deps) {
        if ($currentKey === $key) {
            if (empty($deps)) {
                unset($steps[$key]);
            }
        } else {
            foreach ($deps as $idx => $value) {
                if ($value === $currentKey) {
                    unset($deps[$idx]);
                }
            }

            $steps[$key] = $deps;
        }
    }

    return $steps;
}

function part1()
{
    $steps = formatSteps('./input.txt');
    $completedKeys = [];

    while (!empty($steps)) {
        $currentKeys = findNext($steps);
        $steps = removeCompleted($currentKeys[0], $steps);
        $completedKeys[] = $currentKeys[0];
    }

    return implode('', $completedKeys);
}

function getStepDuration($step)
{
    return ord(strtoupper($step)) - ord('A') + 1 + 60;
}

function workerIsFree($work)
{
    foreach ($work as $duration) {
        if ($duration > 0) {
            return false;
        }
    }

    return true;
}

function part2()
{
    $steps = formatSteps('./input.txt');
    $assignedKeys = [];
    $seconds = 0;
    $workers = [
        1 => [],
        2 => [],
        3 => [],
        4 => [],
        5 => [],
    ];

    while (!empty($steps)) {
        $currentKeys = findNext($steps);

        foreach ($currentKeys as $key) {
            foreach ($workers as $id => $work) {
                if (workerIsFree($work) && !in_array($key, $assignedKeys)) {
                    $workers[$id][$key] = getStepDuration($key);
                    $assignedKeys[] = $key;
                    break;
                }
            }
        }

        foreach ($workers as $id => $work) {
            foreach ($workers[$id] as $char => $value) {
                if ($value > 0) {
                    $workers[$id][$char]--;

                    if ($workers[$id][$char] === 0) {
                        $steps = removeCompleted($char, $steps);
                    }
                }
            }
        }

        $seconds++;
    }

    return $seconds;
}

echo "Part 1: " . part1() . "\n";
echo "Part 2: " . part2() . "\n";