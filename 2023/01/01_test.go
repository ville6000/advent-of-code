package main

import (
	"strings"
	"testing"
)

func getTestInput() []string {
	input := `1abc2
	pqr3stu8vwx
	a1b2c3d4e5f
	treb7uchet`

	return strings.Split(input, "\n")
}

func getTestInput2() []string {
	input := `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

	return strings.Split(input, "\n")
}

func TestPart1(t *testing.T) {
	input := getTestInput()
	actual := part1(input)
	expected := 142

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestPart2(t *testing.T) {
	input := getTestInput2()
	actual := part2(input)
	expected := 281

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestFindLineTotal(t *testing.T) {
	charMap := map[string]int{
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5,
		"six":   6,
		"seven": 7,
		"eight": 8,
		"nine":  9,
	}

	input := "4rflxzvnn"
	actual := findLineTotal(charMap, input)
	expected := 44

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}

	input = "1two2"
	actual = findLineTotal(charMap, input)
	expected = 12

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}
