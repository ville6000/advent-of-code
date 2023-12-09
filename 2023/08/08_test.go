package main

import (
	"strings"
	"testing"
)

func getTestInput() []string {
	input := `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`
	return strings.Split(input, "\n")
}

func getTestInputVariation() []string {
	input := `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
	return strings.Split(input, "\n")
}

func getTestInput2() []string {
	input := `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
	return strings.Split(input, "\n")
}

func TestPart1(t *testing.T) {
	input := getTestInput()
	instructions, nodes := parseInput(input)
	actual := part1(instructions, nodes)
	expected := 2

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}

	input = getTestInputVariation()
	instructions, nodes = parseInput(input)
	actual = part1(instructions, nodes)
	expected = 6

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestPart2(t *testing.T) {
	input := getTestInput2()
	instructions, nodes := parseInput(input)
	actual := part2(instructions, nodes)
	expected := 6

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}
