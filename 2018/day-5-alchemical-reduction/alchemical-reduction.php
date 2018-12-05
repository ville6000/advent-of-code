<?php

function hasReactingUnits($string, $i)
{
    $parts = str_split($string);

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

function doReact($string, $i)
{
    $parts = str_split($string);

    for (; $i < count($parts); $i++) {
        if (isset($parts[$i + 1])) {
            $a = $parts[$i];
            $b = $parts[$i + 1];

            if (isReactivePair($a, $b)) {
                unset($parts[$i]);
                unset($parts[$i + 1]);

                return implode('', $parts);
            }
        }
    }

    return false;
}

function part1()
{
     $input = file_get_contents('./input.txt');
     $nextKey = 0;

     while ($nextKey !== false) {
         $input = doReact($input, $nextKey);
         $nextKey = hasReactingUnits($input, --$nextKey);
     }

     return strlen($input);
}

echo "Part 1: " . part1() . "\n";