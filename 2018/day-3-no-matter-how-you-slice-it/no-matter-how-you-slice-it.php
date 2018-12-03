<?php

function overlapCount($diagrams)
{
    $diagrams = array_map('normalizeDiagram', $diagrams);
    $fabric = [];
    $overlapCount = 0;

    foreach ($diagrams as $diagram) {
        $fabric = fillFabric($diagram, $fabric);
    }

    foreach ($fabric as $row) {
        foreach ($row as $cell) {
            if (count($cell) > 1) {
                $overlapCount++;
            }
        }
    }

    return $overlapCount;
}

function doesNotOverlap($diagrams)
{
    $diagrams = array_map('normalizeDiagram', $diagrams);
    $fabric = [];
    $overlapCount = 0;
    $idList = [];

    foreach ($diagrams as $diagram) {
        $idList[$diagram['id']] = $diagram['id'];
        $fabric = fillFabric($diagram, $fabric);
    }

    foreach ($fabric as $row) {
        foreach ($row as $cell) {
            if (count($cell) > 1) {
                foreach ($cell as $item) {
                    unset($idList[$item]);
                }
            }
        }
    }

    return implode('', $idList);
}

function normalizeDiagram($diagram)
{
    $parts = explode(' ', $diagram);
    $coordinates = explode(',', $parts[2]);
    $area = explode('x', $parts[3]);

    return [
        'id' => substr($parts[0], 1),
        'left' => $coordinates[0],
        'top' => substr($coordinates[1], 0, -1),
        'width' => $area[0],
        'height' => $area[1],
    ];
}

function fillFabric($diagram, $fabric)
{
    $rightLimit = $diagram['left'] + $diagram['width'];
    $bottomLimit = $diagram['top'] + $diagram['height'];

    for ($rowIdx = $diagram['top']; $rowIdx < $bottomLimit; $rowIdx++) {
        for ($colIdx = $diagram['left']; $colIdx < $rightLimit; $colIdx++) {
            if (!isset($fabric[$rowIdx][$colIdx])) {
                $fabric[$rowIdx][$colIdx] = [];
            }

            $fabric[$rowIdx][$colIdx][] = $diagram['id'];
        }
    }

    return $fabric;
}
