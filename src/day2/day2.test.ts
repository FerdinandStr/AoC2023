//The game can only contain 12 red cubes 13 green cubes 14 blue cubes
import fs from "fs"
import {
    Rule,
    RuleList,
    createRuleListFromInput,
    finishGamePart2ALL,
    finishGamePart2ONELINE,
    getHighestNumberForRule,
    isLineValidForGivenRule,
    isLineValidForGivenRuleList,
    returnPassedGameIdsForInputAndRuleList,
    returnSumOfPassedGames,
} from "./day2"
import { describe, it, expect, should } from "vitest"

describe("rgbBalls Game", () => {
    const rules: RuleList = {
        red: { color: "red", max: 12 },
        green: { color: "green", max: 13 },
        blue: { color: "blue", max: 14 },
        [Symbol.iterator]() {
            return Object.entries(this)
        },
    }

    it("should collect the highest number for the given rule", () => {
        const inputLine =
            "Game 2: 3 red, 13 blue, 5 green; 14 green, 14 blue; 9 blue, 10 green, 3 red; 2 green, 5 blue; 11 green, 3 blue, 3 red; 16 blue, 2 red, 9 green"

        const maxNumber = getHighestNumberForRule(inputLine, rules.green)

        expect(maxNumber).toBe(14)
    })

    it("should return true if the max number for the given rule is note exceeded", () => {
        const inputLine =
            "Game 15: 4 red, 4 green, 7 blue; 14 blue, 1 green, 8 red; 2 red, 10 green, 11 blue; 5 red, 4 blue, 6 green; 9 red, 8 blue, 3 green; 9 blue, 9 red"
        const result = isLineValidForGivenRule(inputLine, rules.blue)

        expect(result).toBe(true)
    })

    it("should return true if a whole RuleList is passed or not", () => {
        const inputLine =
            "Game 5: 3 green, 1 blue, 3 red; 6 red, 2 green, 2 blue; 12 red, 3 green, 1 blue; 2 green, 9 red; 1 blue; 2 blue, 10 red"

        const result = isLineValidForGivenRuleList(inputLine, rules)
        expect(result).toBe(true)
    })

    it("should iterate over input and return line numbers for passed games", () => {
        let input = fs.readFileSync("./src/day2/input", "utf-8")

        const result = returnPassedGameIdsForInputAndRuleList(input, rules)
        expect(result).toBeInstanceOf(Array)
    })

    it("should sum up all the correct games", () => {
        let input = fs.readFileSync("./src/day2/input", "utf-8")

        const result = returnSumOfPassedGames(input, rules)
        // console.log(result)
        expect(result).toBe(1931)
    })

    it("should create a rule List with the highest values of the input", () => {
        const inputLine =
            "Game 5: 3 green, 1 blue, 3 red; 6 red, 2 green, 2 blue; 12 red, 3 green, 1 blue; 2 green, 9 red; 1 blue; 2 blue, 10 red"

        const ruleList = createRuleListFromInput(inputLine)

        expect(ruleList).toEqual({
            red: { color: "red", max: 12 },
            green: { color: "green", max: 3 },
            blue: { color: "blue", max: 2 },
        })
    })

    it("should return the fucking result for game part 2 ONE LINE!!!!", () => {
        //FUCK THIS SHIT
        const inputLine = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"

        const result = finishGamePart2ONELINE(inputLine)

        expect(result).toBe(48)
    })

    it("SUMS UP ALL AND GIVES RESULT GAME2", () => {
        let input = fs.readFileSync("./src/day2/input", "utf-8")

        const result = finishGamePart2ALL(input)
        // console.log(result)

        expect(result).toBe(83105)
    })
})
