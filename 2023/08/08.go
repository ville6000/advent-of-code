package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	input := readInput()
	instructions, nodes := parseInput(input)

	fmt.Println("Part 1", part1(instructions, nodes))
}

func part1(instructions []string, nodes map[string]map[string]string) int {
	i := 0
	rounds := 1
	threshold := len(instructions)
	current := "AAA"
	target := "ZZZ"

	for {
		current = nodes[current][instructions[i]]

		if current == target {
			return rounds
		}

		i++
		rounds++

		if i >= threshold {
			i = 0
		}
	}
}

func parseInput(input []string) ([]string, map[string]map[string]string) {
	nodes := make(map[string]map[string]string)
	instructions := make([]string, 0)

	for i := 0; i < len(input); i++ {
		if i == 0 {
			instructions = strings.Split(input[i], "")
		} else {
			if input[i] != "" {
				key, value := parseNode(input[i])
				nodes[key] = value
			}
		}
	}

	return instructions, nodes
}

func parseNode(input string) (string, map[string]string) {
	parts := strings.Split(input, "=")
	re := regexp.MustCompile(`\(([^)]+)\)`)
	matches := re.FindStringSubmatch(parts[1])
	m := make(map[string]string)

	if len(matches) > 1 {
		parts := strings.Split(matches[1], ",")

		m["L"] = strings.TrimSpace(parts[0])
		m["R"] = strings.TrimSpace(parts[1])
	}

	return strings.TrimSpace(parts[0]), m
}

func readInput() []string {
	input, err := os.Open("08.txt")
	if err != nil {
		panic(err)
	}
	defer input.Close()

	fileScanner := bufio.NewScanner(input)
	fileScanner.Split(bufio.ScanLines)
	var fileLines []string

	for fileScanner.Scan() {
		line := fileScanner.Text()
		fileLines = append(fileLines, line)
	}

	return fileLines
}
