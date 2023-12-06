package main

import (
	"strings"
	"testing"
)

func getTestInput() []string {
	input := `Time:      7  15   30
Distance:  9  40  200`
	return strings.Split(input, "\n")
}

func TestPart1(t *testing.T) {
	input := getTestInput()
	actual := part1(input)
	expected := 288

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestPart2(t *testing.T) {
	input := getTestInput()
	actual := part2(input)
	expected := 71503

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}
