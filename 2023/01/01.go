package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	part1()
}

func part1() {
	input, err := os.Open("01.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	fileScanner := bufio.NewScanner(input)
	fileScanner.Split(bufio.ScanLines)
	var fileLines []string

	for fileScanner.Scan() {
		fileLines = append(fileLines, fileScanner.Text())
	}

	total := 0

	for _, line := range fileLines {
		re := regexp.MustCompile(`[0-9]`)
		matches := re.FindAllString(line, -1)
		result, _ := strconv.Atoi(matches[0] + matches[len(matches)-1])
		total += result
	}

	input.Close()

	fmt.Println(total)
}
