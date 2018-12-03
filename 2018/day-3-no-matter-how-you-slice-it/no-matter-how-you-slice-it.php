<?php

function overlapCount($diagrams)
{
    $diagrams = array_map('normalizeDiagram', $diagrams);
    $overlapCount = [];

    foreach ($diagrams as $diagram) {
        $rightLimit = $diagram['left'] + $diagram['width'];
        $bottomLimit = $diagram['top'] + $diagram['height'];

        for ($rowIdx = $diagram['top']; $rowIdx < $bottomLimit; $rowIdx++) {
            for ($colIdx = $diagram['left']; $colIdx < $rightLimit; $colIdx++) {
                $overlapCount["$rowIdx,$colIdx"]++;
            }
        }
    }

    return count(array_filter($overlapCount, function ($item) {
        return $item > 1;
    }));
}

function doesNotOverlap($diagrams)
{
    $diagrams = array_map('normalizeDiagram', $diagrams);
    $overlapCount = [];
    $overlapList = [];

    foreach ($diagrams as $diagram) {
        $overlapList[$diagram['id']] = $diagram['id'];
        $rightLimit = $diagram['left'] + $diagram['width'];
        $bottomLimit = $diagram['top'] + $diagram['height'];
        $overlaps = [];

        for ($rowIdx = $diagram['top']; $rowIdx < $bottomLimit; $rowIdx++) {
            for ($colIdx = $diagram['left']; $colIdx < $rightLimit; $colIdx++) {
                if (!isset($overlapCount["$rowIdx,$colIdx"])) {
                    $overlapCount["$rowIdx,$colIdx"] = [];
                }

                $overlapCount["$rowIdx,$colIdx"][] = $diagram['id'];

                if (count($overlapCount["$rowIdx,$colIdx"]) > 1) {
                    $overlaps = array_merge($overlaps, $overlapCount["$rowIdx,$colIdx"]);
                }
            }
        }

        if (!empty($overlaps)) {
            foreach ($overlaps as $item) {
                unset($overlapList[$item]);
            }
        }
    }

    return implode('', $overlapList);
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