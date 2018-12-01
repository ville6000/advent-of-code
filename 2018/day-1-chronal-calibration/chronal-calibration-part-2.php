<?php

function calculateRepeatingFrequency($sequence) {
    $frequencies = [];
    $frequency = 0;
    $duplicate = false;

    while (!$duplicate) {
        foreach (array_map('intval', $sequence) as $item) {
            $frequency += $item;

            if (array_key_exists($frequency, $frequencies)) {
                $duplicate = true;
                break;
            } else {
                $frequencies[$frequency] = $frequency;
            }
        }
    }

    return $frequency;
}

