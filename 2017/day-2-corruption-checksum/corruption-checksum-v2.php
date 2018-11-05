<?php

class CorruptionChecksum 
{
    public function formatInput() 
    {
        $rows = explode("\n", file_get_contents( './input_v2'));
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
            foreach ($row as $key => $value) {
                $sum = $this->findRowChecksum($row, $key, $value);

                if ($sum) {
                    $checksum += $sum;
                }
            }
        }

        return $checksum;
    }

    private function findRowChecksum($columns, $key, $value) 
    {
        for ($idx = 0; $idx < count($columns); $idx++) {
            if ($idx !== $key) {                
                $division = $value / $columns[$idx];

                if ($division === intval($division)) {
                    return $value / $columns[$idx];
                }
            }
        }

        return false;
    }
}

$cc = new CorruptionChecksum();
echo $cc->calculateChecksum();