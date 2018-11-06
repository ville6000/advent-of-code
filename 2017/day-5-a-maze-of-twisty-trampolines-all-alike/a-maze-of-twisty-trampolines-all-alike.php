<?php

class MazeSolver
{
    public function formatInput()
    {
        return explode("\n", file_get_contents('./input'));
    }

    public function solve()
    {
        $steps = $this->formatInput($input);
        return $this->doSolveMaze($steps);
    }

    public function doSolveMaze($steps) 
    {
        $stepCount = 0;
        $currentIndex = 0;

        while ($currentIndex < count($steps)) {
            $stepCount++;
            $newIndex = $currentIndex + $steps[$currentIndex];
            $steps[$currentIndex]++;
            $currentIndex = $newIndex;
        }

        return $stepCount;
    }
}

$mazeSolver = new MazeSolver();
echo $mazeSolver->solve();
