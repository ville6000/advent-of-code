package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input := readInput()
	fmt.Println("Part 1:", part1(input))
}

func part1(lines []string) int {
	total := 0

	for _, line := range lines {
		a, b, c := getSides(line)
		fmt.Println(a, b, c)

		if a+b > c && a+c > b && b+c > a {
			total++
		}
	}

	return total
}

func getSides(line string) (int, int, int) {
	parts := strings.Fields(line)
	a, _ := strconv.Atoi(parts[0])
	b, _ := strconv.Atoi(parts[1])
	c, _ := strconv.Atoi(parts[2])

	return a, b, c
}

func readInput() []string {
	input, err := os.Open("03.txt")
	if err != nil {
		panic(err)
	}
	defer input.Close()

	fileScanner := bufio.NewScanner(input)
	fileScanner.Split(bufio.ScanLines)
	lines := make([]string, 0)

	for fileScanner.Scan() {
		line := fileScanner.Text()
		lines = append(lines, line)
	}

	return lines
}
