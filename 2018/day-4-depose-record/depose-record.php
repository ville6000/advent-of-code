<?php

function getSortedInput()
{
    $file = file_get_contents('input.txt');
    $rows = explode("\n", $file);

    usort($rows, function ($a, $b) {
        preg_match_all("/\[([^\]]*)\]/", $a, $aMatches);
        preg_match_all("/\[([^\]]*)\]/", $b, $bMatches);

        return strtotime($aMatches[1][0]) - strtotime($bMatches[1][0]);
    });

    return $rows;
}

function getFormattedSleepStats($rows)
{
    $guardRows = [];

    foreach ($rows as $row) {
        $isGuardRow = getGuardId($row);

        if ($isGuardRow) {
            $guardId = getGuardId($row);
        }

        if (!isset($guardRows[$guardId])) {
            $guardRows[$guardId] = [
                'raw' => [],
                'minutes' => []
            ];
        }

        if (strpos($row, 'asleep') !== false || strpos($row, 'wakes') !== false) {
            $guardRows[$guardId]['raw'][] = $row;
        }
    }

    foreach ($guardRows as $id => $row) {
        $minutes = calculateSleepMinutes($row['raw']);
        $guardRows[$id]['minutes'] = $minutes;
    }

    return $guardRows;
}

function getGuardId($row)
{
    if (preg_match('/#(.*?) /', $row, $match) === 1) {
        return $match[1];
    }

    return false;
}

function calculateSleepMinutes($rows)
{
    $minutes = [];
    foreach ($rows as $key => $value) {
        $fallsAsleep = strpos($value, 'asleep') !== false;

        if ($fallsAsleep && isset($rows[$key + 1])) {
            $sleepStart = getMinuteFromDateString($value);
            $sleepEnd = getMinuteFromDateString($rows[$key + 1]);

            for ($i = $sleepStart; $i < $sleepEnd; $i++) {
                if (!isset($minutes[$i])) {
                    $minutes[$i] = 0;
                }

                $minutes[$i]++;
            }
        }
    }

    return $minutes;
}

function getMinuteFromDateString($string)
{
    preg_match_all("/\[([^\]]*)\]/", $string, $matches);
    $date = new DateTime($matches[1][0]);

    return intval($date->format('i'));
}

function getSleepiestGuard($rows)
{
    uasort($rows, function ($a, $b) {
        $aTotal = array_sum($a['minutes']);
        $bTotal = array_sum($b['minutes']);

        if ($aTotal == $bTotal) {
            return 0;
        }

        return ($aTotal < $bTotal) ? 1 : -1;
    });

    $keys = array_keys($rows);

    return [
        'id' => $keys[0],
        'stats' => $rows[$keys[0]],
    ];
}

function part1()
{
    $rows = getSortedInput();
    $guardRows = getFormattedSleepStats($rows);
    $sleepiestGuard = getSleepiestGuard($guardRows);

    $max = 0;
    $maxMinute = false;
    foreach ($sleepiestGuard['stats']['minutes'] as $minute => $value) {
        if ($value > $max) {
            $max = $value;
            $maxMinute = $minute;
        }
    }

    $minuteMultiply = $sleepiestGuard['id'] * $maxMinute;

    echo "Part 1: $minuteMultiply \n";
}

function part2()
{
    $rows = getSortedInput();
    $guardRows = getFormattedSleepStats($rows);

    $max = 0;
    $maxMinute = false;
    $guardId = false;

    foreach ($guardRows as $id => $row) {
        foreach ($row['minutes'] as $minute => $value) {
            if ($value > $max) {
                $max = $value;
                $maxMinute = $minute;
                $guardId = $id;
            }
        }
    }

    echo "Part 2: " . $guardId * $maxMinute . "\n";
}

part1();
part2();