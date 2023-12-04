package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

type GridNumber struct {
	num        int
	row        int
	startIndex int
	endIndex   int
}

func main() {
	fmt.Println("Part 1", part1())
	fmt.Println("Part 2", part2())
}

func part1() int {
	input := readInput()
	numbers := findNumbers(input)
	total := 0

	for _, number := range numbers {
		if hasAdjacentSymbol(input, number) {
			total += number.num
		}
	}

	return total
}

func hasAdjacentSymbol(input []string, number GridNumber) bool {
	adjacentSegments := make([]string, 0)
	start := max(number.startIndex-1, 0)
	end := min(number.endIndex+1, len(input[number.row]))

	for r := number.row - 1; r <= number.row+1; r++ {
		if r >= 0 && r < len(input) {
			adjacentSegments = append(adjacentSegments, input[r][start:end])
		}
	}

	re := regexp.MustCompile(`[^.0-9]`)

	for _, s := range adjacentSegments {
		if re.FindString(s) != "" {
			return true
		}
	}

	return false
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func part2() int {
	return 0
}

func findNumbers(input []string) []GridNumber {
	var numbers []GridNumber

	for row, line := range input {

		re := regexp.MustCompile(`\d+`)
		matches := re.FindAllStringIndex(line, -1)

		for _, match := range matches {
			num, _ := strconv.Atoi(line[match[0]:match[1]])
			newGridNumber := GridNumber{
				num:        num,
				startIndex: match[0],
				endIndex:   match[1],
				row:        row,
			}

			numbers = append(numbers, newGridNumber)
		}
	}

	return numbers
}

func readInput() []string {
	input, err := os.Open("03.txt")
	if err != nil {
		panic(err)
	}
	defer input.Close()

	fileScanner := bufio.NewScanner(input)
	fileScanner.Split(bufio.ScanLines)
	var fileLines []string

	for fileScanner.Scan() {
		line := fileScanner.Text()

		if len(line) > 0 {
			fileLines = append(fileLines, line)
		}
	}

	return fileLines
}
