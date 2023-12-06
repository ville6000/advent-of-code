package main

import (
	"strings"
	"testing"
)

func getTestInput() []string {
	input := `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

	return strings.Split(input, "\n")
}

func TestGetSeeds(t *testing.T) {
	input := getTestInput()
	actual := getSeeds(input)
	expected := []int{79, 14, 55, 13}

	if len(actual) != len(expected) {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
	for i, seed := range expected {
		if actual[i] != seed {
			t.Errorf("Expected %d but was %d", expected, actual)
		}
	}
}

func TestConvert(t *testing.T) {
	input := getTestInput()
	seeds := getSeeds(input)
	seedToSoil := extractConversionMaps(input, "seed-to-soil map:")
	actual := convert(seeds[0], seedToSoil)
	expected := 81

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestPart1(t *testing.T) {
	actual := part1(getTestInput())
	expected := 35

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestPart2(t *testing.T) {
	actual := part2(getTestInput())
	expected := 46

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}
