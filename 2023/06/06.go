package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Race struct {
	time     int
	distance int
}

func main() {
	input := readInput()

	fmt.Println("Part 1:", part1(input))
	fmt.Println("Part 2:", part2(input))
}

func part1(input []string) int {
	races := parseRaces(input)
	return totalWinPossibilitiesForRaces(races)
}

func part2(input []string) int {
	races := parsePart2Races(input)
	return totalWinPossibilitiesForRaces(races)
}

func totalWinPossibilitiesForRaces(races []Race) int {
	var nums []int

	for _, race := range races {
		nums = append(nums, calculateWinPossibilities(race))
	}

	total := 1
	for _, num := range nums {
		total *= num
	}

	return total
}

func calculateWinPossibilities(race Race) int {
	possibilities := 0

	for hold := 0; hold < race.time; hold++ {
		distance := hold * (race.time - hold)
		if distance > race.distance {
			possibilities++
		}
	}

	return possibilities
}

func parseTimesAndDistances(input []string) ([]string, []string) {
	timeLine := strings.Split(input[0], ":")[1]
	times := strings.Fields(timeLine)
	distanceLine := strings.Split(input[1], ":")[1]
	distances := strings.Fields(distanceLine)

	return times, distances
}

func parseRaces(input []string) []Race {
	times, distances := parseTimesAndDistances(input)
	var races []Race

	for i := 0; i < len(times); i++ {
		t, _ := strconv.Atoi(times[i])
		d, _ := strconv.Atoi(distances[i])

		r := Race{
			time:     t,
			distance: d,
		}

		races = append(races, r)
	}

	return races
}

func parsePart2Races(input []string) []Race {
	times, distances := parseTimesAndDistances(input)
	var races []Race

	t, _ := strconv.Atoi(strings.Join(times, ""))
	d, _ := strconv.Atoi(strings.Join(distances, ""))

	r := Race{
		time:     t,
		distance: d,
	}

	races = append(races, r)

	return races
}

func readInput() []string {
	input, err := os.Open("06.txt")
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
