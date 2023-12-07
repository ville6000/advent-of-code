package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type NumMatch struct {
	idx int
	num int
}

func main() {
	input := readInput()
	fmt.Println("Part 1", part1(input))
	fmt.Println("Part 2", part2(input))
}

func part1(input []string) int {
	total := 0

	for _, line := range input {
		re := regexp.MustCompile(`[0-9]`)
		matches := re.FindAllString(line, -1)
		result, _ := strconv.Atoi(matches[0] + matches[len(matches)-1])
		total += result
	}

	return total
}

func part2(input []string) int {
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

	total := 0

	for _, line := range input {
		num := findLineTotal(charMap, line)
		total += num
	}

	return total
}

func findLineTotal(charMap map[string]int, line string) int {
	charFirstMatch, charLastMatch := charMatches(charMap, line)
	numFirstMatch, numLastMatch := numMatches(line)
	first := findFirstNum(numFirstMatch, charFirstMatch)
	last := findLastNum(numLastMatch, charLastMatch)
	numString := strconv.Itoa(first) + strconv.Itoa(last)
	num, _ := strconv.Atoi(numString)

	return num
}

func findFirstNum(numMatch NumMatch, charMatch NumMatch) int {
	num := emptyReturn(numMatch, charMatch)

	if num != -1 {
		return num
	}

	if numMatch.idx < charMatch.idx {
		return numMatch.num
	}

	return charMatch.num
}

func findLastNum(numMatch NumMatch, charMatch NumMatch) int {
	num := emptyReturn(numMatch, charMatch)

	if num != -1 {
		return num
	}

	if numMatch.idx > charMatch.idx {
		return numMatch.num
	}

	return charMatch.num
}

func emptyReturn(numMatch NumMatch, charMatch NumMatch) int {
	if numMatch.idx == -1 {
		return charMatch.num
	}

	if charMatch.idx == -1 {
		return numMatch.num
	}

	return -1
}

func charMatches(charMap map[string]int, line string) (NumMatch, NumMatch) {
	firstMatch := NumMatch{idx: -1, num: -1}
	lastMatch := NumMatch{idx: -1, num: -1}

	for key, val := range charMap {
		firstSubstrIdx := strings.Index(line, key)
		lastSubstrIdx := strings.LastIndex(line, key)
		if firstSubstrIdx > -1 {
			if firstMatch.num == -1 || firstSubstrIdx < firstMatch.idx {
				firstMatch.idx = firstSubstrIdx
				firstMatch.num = val
			}
		}

		if lastSubstrIdx > -1 {
			if lastMatch.num == -1 || lastSubstrIdx > lastMatch.idx {
				lastMatch.idx = lastSubstrIdx
				lastMatch.num = val
			}
		}
	}

	return firstMatch, lastMatch
}

func numMatches(line string) (NumMatch, NumMatch) {
	first := NumMatch{idx: -1, num: -1}
	last := NumMatch{idx: -1, num: -1}
	chars := strings.Split(line, "")

	for i, char := range chars {
		legitChar := char >= "0" && char <= "9"

		if !legitChar {
			continue
		}

		digit, _ := strconv.Atoi(char)

		if first.num == -1 || i < first.idx {
			first.idx = i
			first.num = digit
		}

		if last.num == -1 || i > last.idx {
			last.idx = i
			last.num = digit
		}
	}

	return first, last
}

func readInput() []string {
	input, err := os.Open("01.txt")
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
