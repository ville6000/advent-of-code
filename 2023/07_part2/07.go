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
	cardJoker = "J"
	cardQueen = "Q"
	cardKing  = "K"
	cardAce   = "A"

	tenValue   = 10
	jokerValue = 1
	queenValue = 12
	kingValue  = 13
	aceValue   = 14
)

func main() {
	input := readInput()
	fmt.Println("Part 2", part2(input))
}

func part2(input []string) int {
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
	uniqueCards := getUniqueCards(cards)
	jokers := strings.Count(strings.Join(cards, ""), cardJoker)

	if len(uniqueCards) == 1 {
		return fiveOfAKind
	}

	largestValue := 0

	for _, card := range cards {
		if card == cardJoker {
			continue
		}

		occurrences := strings.Count(strings.Join(cards, ""), card)
		total := occurrences + jokers

		if jokers == 0 {
			val := handValuesWithoutJokers(occurrences, uniqueCards)

			if val != -1 {
				return val
			}
		}

		if total >= 5 {
			if fiveOfAKind > largestValue {
				largestValue = fiveOfAKind
			}
		}

		if total == 4 {
			if fourOfAKind > largestValue {
				largestValue = fourOfAKind
			}
		}

		if (total == 3 || total == 2) && len(uniqueCards) == 3 {
			if fullHouse > largestValue {
				largestValue = fullHouse
			}
		}

		if total == 3 {
			if threeOfAKind > largestValue {
				largestValue = threeOfAKind
			}
		}

		if total == 2 {
			if len(uniqueCards) > 3 {
				if onePair > largestValue {
					largestValue = onePair
				}
			}

			if twoPair > largestValue {
				largestValue = onePair
			}
		}
	}

	if largestValue > 0 {
		return largestValue
	}

	return highCard
}

func getUniqueCards(cards []string) []string {
	uniqueCards := make([]string, 0)

	for _, card := range cards {
		if !slices.Contains(uniqueCards, card) {
			uniqueCards = append(uniqueCards, card)
		}
	}

	return uniqueCards
}

func handValuesWithoutJokers(occurrences int, uniqueCards []string) int {
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

	return -1
}

func parseHands(input []string) []Hand {
	var hands []Hand

	for _, line := range input {
		parts := strings.Split(line, " ")
		cards := strings.Split(parts[0], "")
		var cardValues []int

		for i := 0; i < len(cards); i++ {
			val := getValueFromCard(cards[i])
			cardValues = append(cardValues, val)
		}

		bid, _ := strconv.Atoi(parts[1])
		value := highCard

		hands = append(hands, Hand{cards, cardValues, bid, value})
	}

	return hands
}

func getValueFromCard(card string) int {
	switch card {
	case cardTen:
		return tenValue
	case cardJoker:
		return jokerValue
	case cardQueen:
		return queenValue
	case cardKing:
		return kingValue
	case cardAce:
		return aceValue
	default:
		val, _ := strconv.Atoi(card)
		return val
	}
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
