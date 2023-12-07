package main

import (
	"strings"
	"testing"
)

func getTestInput() []string {
	input := `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`
	return strings.Split(input, "\n")
}

func TestPart2(t *testing.T) {
	input := getTestInput()
	actual := part2(input)
	expected := 5905

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestFindRanks(t *testing.T) {
	input := getTestInput()
	hands := parseHands(input)
	rankedHands := findRanks(hands)
	expected := rankedHands[0].bid
	actual := 220

	if actual != expected {
		t.Errorf("Expected %v but was %v", expected, actual)
	}
}

func TestHandValueFiveOfAKind(t *testing.T) {
	cards := []string{"5", "5", "5", "5", "5"}
	actual := handValue(cards)
	expected := fiveOfAKind

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}

	cards = []string{"8", "8", "J", "8", "J"}
	actual = handValue(cards)
	expected = fiveOfAKind

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestHandValueFourOfAKind(t *testing.T) {
	cards := []string{"5", "5", "5", "5", "1"}
	actual := handValue(cards)
	expected := fourOfAKind

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}

	cards = []string{"8", "8", "J", "8", "Q"}
	actual = handValue(cards)
	expected = fourOfAKind

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}

	cards = []string{"K", "T", "J", "J", "T"}
	actual = handValue(cards)
	expected = fourOfAKind

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestHandValueThreeOfAKind(t *testing.T) {
	cards := []string{"5", "5", "5", "4", "3"}
	actual := handValue(cards)
	expected := threeOfAKind

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}

	cards = []string{"8", "8", "J", "4", "Q"}
	actual = handValue(cards)
	expected = threeOfAKind

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestHandValueFullHouse(t *testing.T) {
	cards := []string{"5", "5", "2", "2", "2"}
	actual := handValue(cards)
	expected := fullHouse

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}

	cards = []string{"8", "8", "J", "Q", "Q"}
	actual = handValue(cards)
	expected = fullHouse

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestHandValueTwoPair(t *testing.T) {
	cards := []string{"5", "5", "2", "2", "8"}
	actual := handValue(cards)
	expected := twoPair

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}

func TestHandValueOnePair(t *testing.T) {
	cards := []string{"5", "5", "7", "2", "8"}
	actual := handValue(cards)
	expected := onePair

	if actual != expected {
		t.Errorf("Expected %d but was %d", expected, actual)
	}
}
