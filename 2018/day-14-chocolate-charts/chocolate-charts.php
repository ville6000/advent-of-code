<?php

function part1()
{
    $input = 540391;
    $recipes = [3, 7,];
    $elf1 = 0;
    $elf2 = 1;

    while (count($recipes) < ($input + 10)) {
        $newValues = str_split(array_sum([$recipes[$elf1], $recipes[$elf2]]));
        foreach ($newValues as $val) {
            $recipes[] = intval($val);
        }

        $elf1 = ($elf1 + 1 + $recipes[$elf1]) % count($recipes);
        $elf2 = ($elf2 + 1 + $recipes[$elf2]) % count($recipes);
    }

    return implode('', array_splice($recipes, -10));
}

$start1 = microtime(true);
echo "Part 1: " . part1() . "\n";
echo "Part 1 duration: " . (microtime(true) - $start1 ) ." \n";