package main

import (
	"strings"
	"testing"
)

func getInput() []string {
	return strings.Split(
		`467..114..\n
...*......\n
..35..633.\n
......#...\n
617*......\n
.....+.58.\n
..592.....\n
......755.\n
...$.*....\n
.664.598..\n`,
		"\n")
}

func TestPart1(t *testing.T) {
	input := getInput()
	actual := part1(input)
	expected := 4361

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestPart2(t *testing.T) {
	input := getInput()
	actual := part2(input)
	expected := 467835

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}
