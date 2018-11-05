<?php

function is_valid_passphrase($passphrase) {
    $parts = explode(' ', $passphrase);

    return count($parts) === count(array_unique($parts)) && !containsAnagrams($parts);
}

function containsAnagrams($parts) {
    foreach ($parts as $key => $value) {
        foreach ($parts as $subKey => $compare) {
            if ($key !== $subKey && (count_chars($value, 1) === count_chars($compare, 1))) {
                return true;
            }
        }
    }

    return false;
}

function count_valid_passphrases() {
    $passphrases = explode("\n", file_get_contents('./input-v2'));

    return array_reduce($passphrases, function($validCount, $passphrase) {
        return is_valid_passphrase($passphrase) ? ++$validCount : $validCount;
    }, 0);
}

echo count_valid_passphrases();