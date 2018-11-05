<?php

class CorruptionChecksum 
{
    public function formatInput() 
    {
        $rows = explode("\n", file_get_contents( './input'));
        $sums = [];

        foreach ($rows as $row) {
            $columns = explode("\t", $row);
            $column_sums = [];
            
            foreach ($columns as $column) {
                if (!empty($column)) {
                    $column_sums[] = (int) trim($column);
                }
            }

            if (!empty($column_sums)) {
                $sums[] = $column_sums;
            }
        }

        return $sums;
    }

    public function calculateChecksum()
    {
        $sums = $this->formatInput();
        $checksum = 0;

        foreach ($sums as $row) {
            $checksum += max($row) - min($row);
        }

        return $checksum;
    }
}

$cc = new CorruptionChecksum();
echo $cc->calculateChecksum();