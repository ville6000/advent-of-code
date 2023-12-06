package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"
)

type ConversionMap struct {
	destinationRangeStart int
	sourceRangeStart      int
	rangeLength           int
}

func main() {
	input := readInput()
	fmt.Println("Part 1:", part1(input))
	fmt.Println("Part 2:", part2(input))
}

func part1(input []string) int {
	seeds := getSeeds(input)
	conversionMaps := getConversionMaps(input)

	return findLowestLocation(seeds, conversionMaps)
}

func part2(input []string) int {
	seeds := getSeedsWithRanges(input)
	conversionMaps := getConversionMaps(input)

	return findLowestLocation(seeds, conversionMaps)
}

func getConversionMaps(input []string) [][]ConversionMap {
	return [][]ConversionMap{
		extractConversionMaps(input, "seed-to-soil map:"),
		extractConversionMaps(input, "soil-to-fertilizer map:"),
		extractConversionMaps(input, "fertilizer-to-water map:"),
		extractConversionMaps(input, "water-to-light map:"),
		extractConversionMaps(input, "light-to-temperature map:"),
		extractConversionMaps(input, "temperature-to-humidity map:"),
		extractConversionMaps(input, "humidity-to-location map:"),
	}
}

func findSeedLocation(seed int, conversionMaps [][]ConversionMap, ch chan int, group *sync.WaitGroup) {
	defer group.Done()
	next := seed

	for _, conversionMap := range conversionMaps {
		next = convert(next, conversionMap)
	}

	ch <- next
}

func findLowestLocation(seeds []int, conversionMaps [][]ConversionMap) int {
	lowestLocation := -1

	for _, seed := range seeds {
		next := seed

		for _, conversionMap := range conversionMaps {
			next = convert(next, conversionMap)
		}

		if lowestLocation == -1 || next < lowestLocation {
			lowestLocation = next
		}
	}

	return lowestLocation
}

func convert(needle int, conversion []ConversionMap) int {
	for _, c := range conversion {
		if needle >= c.sourceRangeStart && needle <= c.sourceRangeStart+c.rangeLength {
			return c.destinationRangeStart + (needle - c.sourceRangeStart)
		}
	}
	return needle
}

func extractConversionMaps(input []string, groupName string) []ConversionMap {
	var lines []ConversionMap
	startFound := false

	for _, line := range input {
		if strings.Contains(line, groupName) {
			startFound = true
			continue
		}

		if startFound && len(line) > 0 {
			nums := strings.Fields(line)
			destinationRangeStart, _ := strconv.Atoi(nums[0])
			sourceRangeStart, _ := strconv.Atoi(nums[1])
			rangeLength, _ := strconv.Atoi(nums[2])

			newInfo := ConversionMap{
				destinationRangeStart: destinationRangeStart,
				sourceRangeStart:      sourceRangeStart,
				rangeLength:           rangeLength,
			}

			lines = append(lines, newInfo)
		}

		if startFound && len(line) == 0 {
			break
		}
	}

	return lines
}

func getSeeds(input []string) []int {
	var seeds []int
	parts := strings.Split(input[0], ":")
	numbers := strings.Fields(parts[1])

	for _, number := range numbers {
		s := strings.TrimSpace(number)

		if len(s) == 0 {
			continue
		}

		num, _ := strconv.Atoi(s)
		seeds = append(seeds, num)
	}

	return seeds
}

func getSeedsWithRanges(input []string) []int {
	seeds := getSeeds(input)

	var rangedSeeds []int
	for i := 0; i < len(seeds); i += 2 {
		for j := 0; j < seeds[i+1]; j++ {
			rangedSeeds = append(rangedSeeds, seeds[i]+j)
		}
	}

	return rangedSeeds
}

func readInput() []string {
	input, err := os.Open("05.txt")
	if err != nil {
		panic(err)
	}
	defer input.Close()

	fileScanner := bufio.NewScanner(input)
	fileScanner.Split(bufio.ScanLines)
	var fileLines []string

	for fileScanner.Scan() {
		fileLines = append(fileLines, fileScanner.Text())
	}

	return fileLines
}
