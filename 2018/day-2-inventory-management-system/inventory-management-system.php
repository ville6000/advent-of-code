<?php

class InventoryManagementSystem
{
    public function calculateChecksum($idList)
    {
        $twoCount = 0;
        $threeCount = 0;

        foreach ($idList as $item) {
            $twoCount = $this->containsSameLetters($item, 2) ? ++$twoCount : $twoCount;
            $threeCount = $this->containsSameLetters($item, 3) ? ++$threeCount : $threeCount;
        }

        return $twoCount * $threeCount;
    }

    public function calculateDifferingCharacters($idList)
    {
        foreach ($idList as $key => $a) {
            foreach ($idList as $secondKey => $b) {
                if ($key === $secondKey) {
                    continue;
                }

                $differing = $this->diff(str_split($a), str_split($b));

                if ($differing) {
                    return $differing;
                }
            }
        }

        return false;
    }

    private function diff($first, $second)
    {
        $diffKey = false;
        $diffCount = 0;

        for ($idx = 0; $idx < count($first); $idx++) {
            if ($first[$idx] !== $second[$idx]) {
                $diffCount++;
                $diffKey = $idx;
            }
        }

        if ($diffCount === 1) {
            unset($first[$diffKey]);

            return implode('', $first);
        }

        return false;
    }

    private function containsSameLetters($string, $matchCount)
    {
        $chars = str_split($string);

        foreach ($chars as $char) {
            $matches = array_filter($chars, function ($c) use ($char) {
                return $c === $char;
            });

            if (count($matches) === $matchCount) {
                return true;
            }
        }

        return false;
    }
}