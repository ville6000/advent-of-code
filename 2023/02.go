package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Game struct {
	num   int
	hands []Hand
}

type Hand struct {
	red   int
	blue  int
	green int
}

const (
	redLimit   = 12
	greenLimit = 13
	blueLimit  = 14
)

func main() {
	part1()
}

func part1() {
	lines := readInput()
	var games []Game

	for _, line := range lines {
		games = append(games, parseLine(line))
	}

	total := calculatePart1Total(games)

	fmt.Println(total)
}

func calculatePart1Total(games []Game) int {
	total := 0

	for _, game := range games {
		if isValidGame(game) {
			total += game.num
		}
	}

	return total
}

func isValidGame(game Game) bool {
	for _, hand := range game.hands {
		if hand.red > redLimit || hand.green > greenLimit || hand.blue > blueLimit {
			return false
		}
	}

	return true
}

func parseLine(line string) Game {
	lineParts := strings.Split(line, ":")
	gameParts := strings.Split(lineParts[0], " ")
	gameHands := strings.Split(lineParts[1], ";")

	game := Game{}
	game.num, _ = strconv.Atoi(gameParts[1])

	for _, hand := range gameHands {
		cubes := strings.Split(hand, ",")

		newHand := Hand{}
		for _, cube := range cubes {
			cubeParts := strings.Fields(cube)

			switch cubeParts[1] {
			case "red":
				newHand.red, _ = strconv.Atoi(cubeParts[0])
			case "blue":
				newHand.blue, _ = strconv.Atoi(cubeParts[0])
			case "green":
				newHand.green, _ = strconv.Atoi(cubeParts[0])
			}
		}

		game.hands = append(game.hands, newHand)
	}

	return game
}

func readInput() []string {
	input, err := os.Open("02.txt")
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
