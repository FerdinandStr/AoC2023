import { describe, expect, it } from "vitest"
import { HandInfo, HandTypeEnum, convertHandToHandInfo, convertHandToIntHand, determineHandType } from "./day7"

const input = ["32T3K", 765, "T55J5", 684, "KK677", 28, "KTJJT", 220, "QQQJA", 483]

describe("GameOfCamelCards", () => {
    it("converts a string input hand into a numbered Hand", () => {
        const hand = "32T3K"
        const intHand = convertHandToIntHand(hand)

        expect(intHand).toEqual([1, 0, 8, 1, 11])
    })

    testAllHandTypes()

    it("converts a Hand to HandInfo and adds all the Info Data", () => {
        const hand = "32T3K"
        const handInfo: HandInfo = convertHandToHandInfo(hand)

        expect(handInfo).toEqual({ hand: "32T3K", intHand: [1, 0, 8, 1, 11], handType: HandTypeEnum.OnePair })
    })
})

function testAllHandTypes() {
    it("returns the Hand Type Five of a Kind", () => {
        const hand = "33333"
        const handType = determineHandType(hand)

        expect(handType).toBe(HandTypeEnum.FiveOfAKind)
    })
    it("returns the Hand Type FourOfAKind", () => {
        const hand = "33233"
        const handType = determineHandType(hand)

        expect(handType).toBe(HandTypeEnum.FourOfAKind)
    })
    it("returns the Hand Type FullHouse", () => {
        const hand = "33222"
        const handType = determineHandType(hand)

        expect(handType).toBe(HandTypeEnum.FullHouse)
    })
    it("returns the Hand Type FullHouse", () => {
        const hand = "AJAJJ"
        const handType = determineHandType(hand)

        expect(handType).toBe(HandTypeEnum.FullHouse)
    })
    it("returns the Hand Type ThreeOfAKind", () => {
        const hand = "12333"
        const handType = determineHandType(hand)

        expect(handType).toBe(HandTypeEnum.ThreeOfAKind)
    })
    it("returns the Hand Type TwoPair", () => {
        const hand = "17733"
        const handType = determineHandType(hand)

        expect(handType).toBe(HandTypeEnum.TwoPair)
    })
    it("returns the Hand Type OnePair", () => {
        const hand = "17734"
        const handType = determineHandType(hand)

        expect(handType).toBe(HandTypeEnum.OnePair)
    })
    it("returns the Hand Type HighCard", () => {
        const hand = "17A34"
        const handType = determineHandType(hand)

        expect(handType).toBe(HandTypeEnum.HighCard)
    })
}
