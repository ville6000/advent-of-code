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
	winningNumbers []int
	numbers        []int
}

func main() {
	lines := readInput()
	games := getGames(lines)
	fmt.Println(part1(games))
	fmt.Println(part2(games))
}

func getGames(lines []string) []Game {
	var games []Game

	for _, line := range lines {
		games = append(games, parseLine(line))
	}

	return games
}

func part1(games []Game) int {
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

	return points
}

func part2(games []Game) int {
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

	return len(games)
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
