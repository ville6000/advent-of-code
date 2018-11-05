<?php

function solveCaptcha($captcha) {
    $sequence = str_split($captcha);
    $sum = 0;

    for ($i = 0; $i < count($sequence); $i++) {
        if (isset($sequence[$i - 1]) && $sequence[$i] == $sequence[$i - 1]) {
            $sum += $sequence[$i];
        }
    }

    if ($sequence[count($sequence) - 1] == $sequence[0]) {
        $sum += $sequence[0];
    }

    return $sum;
}

//echo solveCaptcha($argv[1]);

function solveCaptchaJump($captcha) {
    $sequence = str_split($captcha);
    $numberCount = count($sequence);
    $step = count($sequence) / 2;
    $next = $step;
    $current = 0;
    $sum = 0;

    while ($current < $numberCount) {
        if ($sequence[$current] === $sequence[$next]) {
            $sum += $sequence[$current];
        }

        $current++;
        $next = ($current + $step > ($numberCount - 1)) ? $next - $numberCount : $current + $step;
    }

    return $sum;
}

echo solveCaptchaJump($argv[1]);
