<?php

class MemoryReallocation
{
    public function reallocate($blocks)
    {
        $variations = [];
        $cycles = 0;

        while ($this->isNewVariation($blocks, $variations)) {
            $variations[] = $blocks;
            $blocks = $this->redistribute($blocks);
            $cycles++;
        }

        return $cycles;
    }

    private function isNewVariation($variation, $existingVariations) 
    {
        if (!empty($existingVariations)) {
            foreach ($existingVariations as $existingVariation) {
                if ($variation === $existingVariation) {
                    return false;
                }
            }
        }

        return true;
    }

    private function redistribute($blocks) 
    {
        $distributeKey = array_search(max($blocks), $blocks);
        $valueToDistribute = $blocks[$distributeKey];
        $blocks[$distributeKey] = 0;
        $idx = isset($blocks[1 + $distributeKey]) ? 1 + $distributeKey : 0;

        while ($valueToDistribute > 0) {
            $blocks[$idx]++;
            $valueToDistribute--;   
            $idx = isset($blocks[1 + $idx]) ? ++$idx : 0;
        }
        
        return $blocks;
    }
}

$mr = new MemoryReallocation();
echo $mr->reallocate([2,8,8,5,4,2,3,1,5,5,1,2,15,13,5,14]);