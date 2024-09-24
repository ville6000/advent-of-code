package main

import (
	"testing"
)

func TestFindCode(t *testing.T) {
	start := 5
	moves := []string{"U", "L", "D", "R"}

	code := findCode(start, moves)

	if code != 5 {
		t.Errorf("Expected 5, got %d", code)
	}
}

func TestPart1(t *testing.T) {
	input := []string{"ULL", "RRDDD", "LURDL", "UUUUD"}
	expected := "1985"

	result := part1(input)

	if result != expected {
		t.Errorf("part1(%v) = %s; want %s", input, result, expected)
	}
}
