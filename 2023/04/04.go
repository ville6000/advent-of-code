package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

type Game struct {
	index          int
	points         int
	winningNumbers []int
	numbers        []int
}

func main() {
	lines := readInput()
	var games []Game

	for _, line := range lines {
		games = append(games, parseLine(line))
	}

	part1(games)
	part2(games)
}

func part1(games []Game) {
	points := 0

	for _, game := range games {
		gamePoints := 0
		for _, number := range game.numbers {
			if slices.Contains(game.winningNumbers, number) {
				if gamePoints == 0 {
					gamePoints++
				} else {
					gamePoints = gamePoints * 2
				}
			}
		}

		points += gamePoints
	}

	fmt.Println(points)
}

func part2(games []Game) {
	for i := 0; i < len(games); i++ {
		game := games[i]
		matchingNumbers := 0
		for _, number := range game.numbers {
			if slices.Contains(game.winningNumbers, number) {
				matchingNumbers++
			}
		}

		for j := game.index; j < game.index+matchingNumbers; j++ {
			games = append(games, games[j])
		}
	}

	fmt.Println(len(games))
}

func parseLine(line string) Game {
	lineParts := strings.Split(line, ":")
	cardInfoParts := strings.Fields(lineParts[0])
	cardParts := strings.Split(lineParts[1], "|")

	game := Game{}
	game.index, _ = strconv.Atoi(cardInfoParts[1])
	game.winningNumbers = sliceAtoi(strings.Fields(cardParts[0]))
	game.numbers = sliceAtoi(strings.Fields(cardParts[1]))

	return game
}

func sliceAtoi(sa []string) []int {
	si := make([]int, len(sa))
	for i, a := range sa {
		si[i], _ = strconv.Atoi(a)
	}
	return si
}

func readInput() []string {
	input, err := os.Open("04.txt")
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
