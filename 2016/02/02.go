package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input := getInput()

	fmt.Println(part1(input))
}

func part1(input []string) string {
	start := 5
	var code []int

	for _, line := range input {
		start = findCode(start, strings.Split(line, ""))
		code = append(code, start)
	}

	return IntToString(code)
}

func findCode(start int, moves []string) int {
	pos := start
	step := 3

	for _, direction := range moves {
		switch {
		case direction == "U":
			if pos-step > 0 {
				pos = pos - step
			}
		case direction == "L":
			if pos%step != 1 {
				pos--
			}
		case direction == "R":
			if pos%step != 0 {
				pos++
			}
		case direction == "D":
			if pos+step <= step*step {
				pos = pos + step
			}
		}
	}

	return pos
}

func getInput() []string {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		os.Exit(1)
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			fmt.Println("Error closing file:", err)
		}
	}(file)

	var lines []string
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines
}

func IntToString(a []int) string {
	var b strings.Builder
	for _, v := range a {
		b.WriteString(strconv.Itoa(v))
	}
	return b.String()
}
