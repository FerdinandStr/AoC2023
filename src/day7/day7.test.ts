import { describe, expect, it } from "vitest"
import {
    HandInfo,
    HandTypeEnum,
    calculateWinnings,
    convertHandToIntHand,
    convertRowDataToHandInfo,
    determineHandType,
    orderHandInfoList,
} from "./day7"
import { readFileSync } from "fs"

const input = ["32T3K", 765, "T55J5", 684, "KK677", 28, "KTJJT", 220, "QQQJA", 483]

describe("GameOfCamelCards", () => {
    it("converts a string input hand into a numbered Hand", () => {
        const hand = "32T3K"
        const intHand = convertHandToIntHand(hand)

        expect(intHand).toEqual([1, 0, 8, 1, 11])
    })

    testAllHandTypes()

    it("converts an input to a list of HandInfo", () => {
        let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
        const handInfoList = input.map((rowData) => convertRowDataToHandInfo(rowData))

        expect(handInfoList).toEqual([
            { hand: "32T3K", intHand: [1, 0, 8, 1, 11], handType: 2, bid: 765 },
            { hand: "T55J5", intHand: [8, 3, 3, 9, 3], handType: 4, bid: 684 },
            { hand: "KK677", intHand: [11, 11, 4, 5, 5], handType: 3, bid: 28 },
            { hand: "KTJJT", intHand: [11, 8, 9, 9, 8], handType: 3, bid: 220 },
            {
                hand: "QQQJA",
                intHand: [10, 10, 10, 9, 12],
                handType: 4,
                bid: 483,
            },
        ])
    })

    it("orders a list of HandInfos", () => {
        let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
        const handInfoList = input.map((rowData) => convertRowDataToHandInfo(rowData))
        console.log(orderHandInfoList(handInfoList))
        expect(handInfoList).toEqual([
            { hand: "32T3K", intHand: [1, 0, 8, 1, 11], handType: 2, bid: 765 },
            { hand: "KTJJT", intHand: [11, 8, 9, 9, 8], handType: 3, bid: 220 },
            { hand: "KK677", intHand: [11, 11, 4, 5, 5], handType: 3, bid: 28 },
            { hand: "T55J5", intHand: [8, 3, 3, 9, 3], handType: 4, bid: 684 },
            {
                hand: "QQQJA",
                intHand: [10, 10, 10, 9, 12],
                handType: 4,
                bid: 483,
            },
        ])
    })

    it("calculates the total winnings for a handInfoList", () => {
        let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
        const handInfoList = input.map((rowData) => convertRowDataToHandInfo(rowData))
        const orderedHandInfoList = orderHandInfoList(handInfoList)
        const totalWinnings = calculateWinnings(orderedHandInfoList)
        expect(totalWinnings).toBe(6440)
    })

    it("gives me THE SOLUTION :O", () => {
        let input = readFileSync("src/day7/input", "utf-8").split(/\n/)
        const handInfoList = input.map((rowData) => convertRowDataToHandInfo(rowData))
        const orderedHandInfoList = orderHandInfoList(handInfoList)
        const totalWinnings = calculateWinnings(orderedHandInfoList)
        expect(totalWinnings).toBe(253603890)
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
