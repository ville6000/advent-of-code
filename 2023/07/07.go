package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

type Hand struct {
	cards      []string
	cardValues []int
	bid        int
	value      int
}

const (
	fiveOfAKind  = 7
	fourOfAKind  = 6
	fullHouse    = 5
	threeOfAKind = 4
	twoPair      = 3
	onePair      = 2
	highCard     = 1

	cardTen   = "T"
	cardJack  = "J"
	cardQueen = "Q"
	cardKing  = "K"
	cardAce   = "A"

	tenValue   = 10
	jackValue  = 11
	queenValue = 12
	kingValue  = 13
	aceValue   = 14
)

func main() {
	input := readInput()
	fmt.Println("Part 1", part1(input))
}

func part1(input []string) int {
	hands := parseHands(input)
	rankedHands := findRanks(hands)

	return calculateTotal(rankedHands)
}

func calculateTotal(hands []Hand) int {
	total := 0
	factor := len(hands)
	for _, hand := range hands {
		total += hand.bid * factor
		factor--
	}

	return total
}

func findRanks(hands []Hand) []Hand {
	for i, hand := range hands {
		hands[i].value = handValue(hand.cards)
	}

	slices.SortFunc(hands, func(a, b Hand) int {
		if a.value > b.value {
			return -1
		}

		if a.value < b.value {
			return 1
		}

		if a.value == b.value {
			for i := 0; i < len(a.cards); i++ {
				aCard := a.cardValues[i]
				bCard := b.cardValues[i]

				if aCard > bCard {
					return -1
				}

				if aCard < bCard {
					return 1
				}
			}
		}

		return 0
	})

	return hands
}

func handValue(cards []string) int {
	uniqueCards := make([]string, 0)

	for _, card := range cards {
		if !slices.Contains(uniqueCards, card) {
			uniqueCards = append(uniqueCards, card)
		}
	}

	for _, card := range cards {
		occurrences := strings.Count(strings.Join(cards, ""), card)

		if occurrences == 5 {
			return fiveOfAKind
		}

		if occurrences == 4 {
			return fourOfAKind
		}

		if (occurrences == 3 || occurrences == 2) && len(uniqueCards) == 2 {
			return fullHouse
		}

		if occurrences == 3 {
			return threeOfAKind
		}

		if occurrences == 2 {
			if len(uniqueCards) > 3 {
				return onePair
			}

			return twoPair
		}
	}

	return highCard
}

func parseHands(input []string) []Hand {
	var hands []Hand

	for _, line := range input {
		parts := strings.Split(line, " ")
		cards := strings.Split(parts[0], "")
		var cardValues []int

		for i := 0; i < len(cards); i++ {
			var val int
			if cards[i] == cardTen {
				val = tenValue
			} else if cards[i] == cardJack {
				val = jackValue
			} else if cards[i] == cardQueen {
				val = queenValue
			} else if cards[i] == cardKing {
				val = kingValue
			} else if cards[i] == cardAce {
				val = aceValue
			} else {
				val, _ = strconv.Atoi(cards[i])
			}

			cardValues = append(cardValues, val)
		}

		bid, _ := strconv.Atoi(parts[1])
		value := highCard

		hands = append(hands, Hand{cards, cardValues, bid, value})
	}

	return hands
}

func readInput() []string {
	input, err := os.Open("07.txt")
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
