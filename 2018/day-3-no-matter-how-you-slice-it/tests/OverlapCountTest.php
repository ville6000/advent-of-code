<?php

include __DIR__ . '/../no-matter-how-you-slice-it.php';

class OverlapCountTest extends \Codeception\Test\Unit
{
    private $input;

    protected function _before()
    {
        $this->input = [
            '#1 @ 1,3: 4x4',
            '#2 @ 3,1: 4x4',
            '#3 @ 5,5: 2x2',
        ];
    }

    protected function _after()
    {
    }

    public function testOverlapCount()
    {
        $this->assertEquals(4, overlapCount($this->input));
    }

    public function testNormalizeDiagram()
    {
        $this->assertArrayHasKey('id', normalizeDiagram($this->input[0]));
        $this->assertEquals(1, normalizeDiagram($this->input[0])['id']);
    }

    public function testDoesNotOverlap()
    {
        $this->assertEquals(3, doesNotOverlap($this->input));
    }
}
