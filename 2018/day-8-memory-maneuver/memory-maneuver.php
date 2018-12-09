<?php

function formatInput($file)
{
    return array_map('intval', explode(" ", file_get_contents($file)));
}

function createNodes(&$data, $nodes = [])
{
    $currentNode = new StdClass();
    $currentNode->childCount = array_shift($data);
    $currentNode->metaCount = array_shift($data);
    $currentNode->meta = [];

    if ($currentNode->childCount > 0) {
        $children = [];
        for ($i = 0; $i < $currentNode->childCount; $i++) {
            $children = createNodes($data, $children);
        }

        $currentNode->children = $children;
    }

    if ($currentNode->metaCount > 0) {
        for ($i = 0; $i < $currentNode->metaCount; $i++) {
            $currentNode->meta[] = array_shift($data);
        }
    }

    $nodes[] = $currentNode;

    return $nodes;
}

function calculateMetaTotal($nodes, $total = 0)
{
    foreach ($nodes as $node) {
        $total += array_sum($node->meta);

        if ($node->childCount > 0) {
            $total = calculateMetaTotal($node->children, $total);
        }
    }

    return $total;
}

function part1()
{
    $data = formatInput('input.txt');
    $nodes = createNodes($data);

    return calculateMetaTotal($nodes);
}

echo "Part 1: " . part1() . "\n";