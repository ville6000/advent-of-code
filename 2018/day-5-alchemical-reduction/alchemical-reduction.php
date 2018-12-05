<?php

function hasReactingUnits($parts, $i)
{
    for (; $i < count($parts); $i++) {
        if (isset($parts[$i + 1])) {
            $a = $parts[$i];
            $b = $parts[$i + 1];

            if (isReactivePair($a, $b)) {
                return $i;
            }
        }
    }

    return false;
}

function isReactivePair($a, $b)
{
    return (strcasecmp($a, $b) === 0 && strcmp($a, $b) !== 0);
}

function doReact($parts, $i)
{
    for (; $i < count($parts); $i++) {
        if (isset($parts[$i + 1])) {
            $a = $parts[$i];
            $b = $parts[$i + 1];

            if (isReactivePair($a, $b)) {
                array_splice($parts, $i, 2);

                return $parts;
            }
        }
    }

    return false;
}

function part1()
{
     $input = file_get_contents('./input.txt');
     $parts = str_split($input);
     $nextKey = 0;

     while ($nextKey !== false) {
         $parts = doReact($parts, $nextKey);
         $nextKey = hasReactingUnits($parts, 0 === $nextKey ? $nextKey : --$nextKey);
     }

     return count($parts);
}

echo "Part 1: " . part1() . "\n";