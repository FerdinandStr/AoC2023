import { describe, expect, it } from "vitest"
import {
    HandInfo,
    HandTypeEnum,
    calculateWinnings,
    convertHandToIntHand,
    convertRowDataToHandInfo,
    convertRowDataToHandInfoWithJokers,
    determineHandType,
    determineHandTypeWithJokers,
    orderHandInfoList,
} from "./day7"
import { readFileSync } from "fs"

const input = ["32T3K", 765, "T55J5", 684, "KK677", 28, "KTJJT", 220, "QQQJA", 483]

describe("GameOfCamelCards", () => {
    it("converts a string input hand into a numbered Hand", () => {
        const hand = "32T3K"
        const intHand = convertHandToIntHand(hand)

        expect(intHand).toEqual([2, 1, 9, 2, 11])
    })

    testAllHandTypes()

    testAllHandTypesWithJokers()

    // it("converts an input to a list of HandInfo", () => {
    //     let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
    //     const handInfoList = input.map((rowData) => convertRowDataToHandInfo(rowData))

    //     expect(handInfoList).toEqual([
    //         { hand: "32T3K", intHand: [2, 1, 9, 2, 11], handType: HandTypeEnum.OnePair, bid: 765 },
    //         { hand: "T55J5", intHand: [9, 4, 4, 0, 4], handType: HandTypeEnum.ThreeOfAKind, bid: 684 },
    //         { hand: "KK677", intHand: [11, 11, 5, 6, 6], handType: HandTypeEnum.TwoPair, bid: 28 },
    //         { hand: "KTJJT", intHand: [11, 9, 0, 0, 9], handType: HandTypeEnum.TwoPair, bid: 220 },
    //         {
    //             hand: "QQQJA",
    //             intHand: [10, 10, 10, 0, 12],
    //             handType: 4,
    //             bid: 483,
    //         },
    //     ])
    // })

    // it("converts an input to a list of HandInfo but with Jokers", () => {
    //     let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
    //     const handInfoList = input.map((rowData) => convertRowDataToHandInfoWithJokers(rowData))

    //     expect(handInfoList).toEqual([
    //         { hand: "32T3K", intHand: [2, 1, 9, 2, 11], handType: HandTypeEnum.OnePair, bid: 765 },
    //         { hand: "T55J5", intHand: [9, 4, 4, 0, 4], handType: HandTypeEnum.FourOfAKind, bid: 684 },
    //         { hand: "KK677", intHand: [11, 11, 5, 6, 6], handType: HandTypeEnum.TwoPair, bid: 28 },
    //         { hand: "KTJJT", intHand: [11, 9, 0, 0, 9], handType: HandTypeEnum.FourOfAKind, bid: 220 },
    //         {
    //             hand: "QQQJA",
    //             intHand: [10, 10, 10, 0, 12],
    //             handType: HandTypeEnum.FourOfAKind,
    //             bid: 483,
    //         },
    //     ])
    // })

    // it("orders a list of HandInfos", () => {
    //     let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
    //     const handInfoList = input.map((rowData) => convertRowDataToHandInfo(rowData))
    //     // console.log(orderHandInfoList(handInfoList))
    //     expect(handInfoList).toEqual([
    //         { hand: "32T3K", intHand: [2, 1, 9, 2, 11], handType: 2, bid: 765 },
    //         { hand: "KTJJT", intHand: [11, 9, 0, 0, 9], handType: 3, bid: 220 },
    //         { hand: "KK677", intHand: [11, 11, 5, 6, 6], handType: 3, bid: 28 },
    //         { hand: "T55J5", intHand: [9, 4, 4, 0, 4], handType: 4, bid: 684 },
    //         {
    //             hand: "QQQJA",
    //             intHand: [10, 10, 10, 0, 12],
    //             handType: 4,
    //             bid: 483,
    //         },
    //     ])
    // })

    // it("orders a list of HandInfos", () => {
    //     let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
    //     const handInfoList = input.map((rowData) => convertRowDataToHandInfoWithJokers(rowData))
    //     const orderedHandInfoList = orderHandInfoList(handInfoList)
    //     console.log(orderedHandInfoList)
    //     expect(orderedHandInfoList).toEqual([
    //         { hand: "32T3K", intHand: [2, 1, 9, 2, 11], handType: HandTypeEnum.OnePair, bid: 765 },
    //         { hand: "KK677", intHand: [11, 11, 5, 6, 6], handType: HandTypeEnum.TwoPair, bid: 28 },
    //         { hand: "T55J5", intHand: [9, 4, 4, 0, 4], handType: HandTypeEnum.FourOfAKind, bid: 684 },
    //         {
    //             hand: "QQQJA",
    //             intHand: [10, 10, 10, 0, 12],
    //             handType: HandTypeEnum.FourOfAKind,
    //             bid: 483,
    //         },
    //         { hand: "KTJJT", intHand: [11, 9, 0, 0, 9], handType: HandTypeEnum.FourOfAKind, bid: 220 },
    //     ])
    // })

    // it("calculates the total winnings for a handInfoList", () => {
    //     let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
    //     const handInfoList = input.map((rowData) => convertRowDataToHandInfo(rowData))
    //     const orderedHandInfoList = orderHandInfoList(handInfoList)
    //     const totalWinnings = calculateWinnings(orderedHandInfoList)
    //     expect(totalWinnings).toBe(6440)
    // })

    // it("calculates the total winnings for a handInfoList", () => {
    //     let input = readFileSync("src/day7/input_test", "utf-8").split(/\n/)
    //     const handInfoList = input.map((rowData) => convertRowDataToHandInfoWithJokers(rowData))
    //     const orderedHandInfoList = orderHandInfoList(handInfoList)
    //     const totalWinnings = calculateWinnings(orderedHandInfoList)
    //     expect(totalWinnings).toBe(5905)
    // })

    // it("gives me THE SOLUTION :O", () => {
    //     let input = readFileSync("src/day7/input", "utf-8").split(/\n/)
    //     const handInfoList = input.map((rowData) => convertRowDataToHandInfo(rowData))
    //     const orderedHandInfoList = orderHandInfoList(handInfoList)
    //     const totalWinnings = calculateWinnings(orderedHandInfoList)
    //     expect(totalWinnings).toBe(253603890)
    // })

    it("gives me THE SOLUTION WITH JOKERS :O", () => {
        let input = readFileSync("src/day7/input", "utf-8").split(/\n/)
        const handInfoList = input.map((rowData) => convertRowDataToHandInfoWithJokers(rowData))
        const orderedHandInfoList = orderHandInfoList(handInfoList)
        const totalWinnings = calculateWinnings(orderedHandInfoList)
        console.log("TOTAL", totalWinnings)

        // TO LOW 253174066
        // TO LOW 253473734
        // TO LOW 253623086
        // TO LOW?254098194
        //        253283708
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

function testAllHandTypesWithJokers() {
    it("returns the Hand Type Five of a Kind", () => {
        const hand = "33333"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FiveOfAKind)
    })
    it("returns the Hand Type Five of a Kind", () => {
        const hand = "33J33"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FiveOfAKind)
    })
    it("returns the Hand Type FourOfAKind", () => {
        const hand = "33233"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FourOfAKind)
    })
    it("returns the Hand Type FourOfAKind", () => {
        const hand = "3J233"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FourOfAKind)
    })
    it("returns the Hand Type FullHouse", () => {
        const hand = "33222"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FullHouse)
    })
    it("returns the Hand Type FullHouse", () => {
        const hand = "33J22"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FullHouse)
    })
    it("returns the Hand Type FullHouse", () => {
        const hand = "AKAKK"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FullHouse)
    })
    it("returns the Hand Type FullHouse", () => {
        const hand = "AKJKK"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FourOfAKind)
    })
    it("returns the Hand Type ThreeOfAKind", () => {
        const hand = "52333"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.ThreeOfAKind)
    })
    it("returns the Hand Type ThreeOfAKind", () => {
        const hand = "5233J"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.ThreeOfAKind)
    })
    it("returns the Hand Type TwoPair", () => {
        const hand = "57733"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.TwoPair)
    })
    it("returns the Hand Type OnePair", () => {
        const hand = "57734"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.OnePair)
    })
    it("returns the Hand Type HighCard", () => {
        const hand = "57A34"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.HighCard)
    })
    it("returns the Hand Type HighCard", () => {
        const hand = "57AJ4"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.OnePair)
    })
    it("returns the Hand Type FiveOfAKind", () => {
        const hand = "2JJJJ"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FiveOfAKind)
    })
    it("returns the Hand Type FiveOfAKind", () => {
        const hand = "22JJJ"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FiveOfAKind)
    })
    it("returns the Hand Type FiveOfAKind", () => {
        const hand = "222JJ"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FiveOfAKind)
    })
    it("returns the Hand Type FiveOfAKind", () => {
        const hand = "2222J"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FiveOfAKind)
    })
    it("returns the Hand Type FourOfAKind", () => {
        const hand = "2232J"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FourOfAKind)
    })
    it("returns the Hand Type ThreeOfAKind", () => {
        const hand = "236JJ"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.ThreeOfAKind)
    })
    it("returns the Hand Type OnePair", () => {
        const hand = "2367J"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.OnePair)
    })
    it("returns the Hand Type ThreeOfAKind", () => {
        const hand = "J367J"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.ThreeOfAKind)
    })
    it("returns the Hand Type FourOfAKind", () => {
        const hand = "J3J7J"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FourOfAKind)
    })
    it("returns the Hand Type FiveOfAKind", () => {
        const hand = "JJJ7J"
        const handType = determineHandTypeWithJokers(hand)

        expect(handType).toBe(HandTypeEnum.FiveOfAKind)
    })
}
