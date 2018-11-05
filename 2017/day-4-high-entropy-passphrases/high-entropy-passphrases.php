<?php

function isValidPassphrase($passphrase) {
    $parts = explode(' ', $passphrase);

    return count($parts) === count(array_unique($parts));
}

function countValidPassphrases() {
    $passphrases = explode("\n", file_get_contents('./input'));

    return array_reduce($passphrases, function($validCount, $passphrase) {
        return is_valid_passphrase($passphrase) ? ++$validCount : $validCount;
    }, 0);
}

echo countValidPassphrases();