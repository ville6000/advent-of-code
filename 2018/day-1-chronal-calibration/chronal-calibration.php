<?php

function calculateFrequency($sequence) {
    return array_sum(array_map('intval', $sequence));
}

