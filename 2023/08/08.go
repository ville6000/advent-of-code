package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

type NetworkNode struct {
	name string
	l    string
	r    string
}

func main() {
	input := readInput()
	instructions, nodes := parseInput(input)

	fmt.Println("Part 1", part1(instructions, nodes))
}

func part1(instructions []string, nodes map[string]NetworkNode) int {
	i := 0
	rounds := 0
	threshold := len(instructions)
	current := "AAA"
	target := "ZZZ"

	for {
		if i >= threshold {
			i = 0
		}

		if instructions[i] == "R" {
			current = nodes[current].r
		} else if instructions[i] == "L" {
			current = nodes[current].l
		}

		if current == target {
			return rounds + 1
		}

		i++
		rounds++
	}
}

func parseInput(input []string) ([]string, map[string]NetworkNode) {
	nodes := make(map[string]NetworkNode)
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

func parseNode(input string) (string, NetworkNode) {
	node := NetworkNode{}
	parts := strings.Split(input, "=")
	node.name = strings.TrimSpace(parts[0])

	re := regexp.MustCompile(`\(([^)]+)\)`)
	matches := re.FindStringSubmatch(parts[1])

	if len(matches) > 1 {
		parts := strings.Split(matches[1], ",")
		node.l = strings.TrimSpace(parts[0])
		node.r = strings.TrimSpace(parts[1])
	}

	return node.name, node
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
