import fs from "fs"

interface RuleList {
    [index: string]: Rule
}

interface Rule {
    color: string
    max: number
}

const rules: RuleList = {
    red: { color: "red", max: 12 },
    green: { color: "green", max: 13 },
    blue: { color: "blue", max: 14 },
}

//##################### RUN

// fs.readFile("./day2/input", (err: any, data: any) => {
//     let input = data.toString()

//     const result = returnPassedGameIdsForInputAndRuleList(input, rules)
//     console.1("RESULT", result)
//     console.log(result.reduce((acc, el) => (acc = acc + el), 0))
// })

//###########################

function returnNumberArrayForColor(inputLine: string, color: string) {
    const regex = new RegExp("(\\d+)(?= " + color + ")", "g")
    const iterator = inputLine.matchAll(regex)
    let array = []
    for (const match of iterator) {
        array.push(Number(match[0]))
    }
    return array
}

function getHighestNumberForRule(inputLine: string, rule: Rule) {
    const color = rule.color
    const regex = new RegExp("(\\d+)(?= " + color + ")", "g")
    const numberArray = returnNumberArrayForColor(inputLine, rule.color)
    let higestNumberForRule = 0

    for (const matchedNumber of numberArray) {
        higestNumberForRule = matchedNumber > higestNumberForRule ? matchedNumber : higestNumberForRule
    }
    return higestNumberForRule
}

function isLineValidForGivenRule(inputLine: string, rule: Rule) {
    const higestNumberForRule = getHighestNumberForRule(inputLine, rule)
    if (higestNumberForRule > rule.max) {
        return false
    }
    return true
}

function isLineValidForGivenRuleList(inputLine: string, ruleList: RuleList) {
    let result = true
    for (let key in ruleList) {
        isLineValidForGivenRule(inputLine, ruleList[key]) ? null : (result = false)
    }

    return result
}

function returnPassedGameIdsForInputAndRuleList(inputData: string, ruleList: RuleList) {
    const inputArray = inputData.split("\n")
    let validGameIds: Array<number> = []
    for (let i = 0; i < inputArray.length; i++) {
        if (isLineValidForGivenRuleList(inputArray[i], ruleList)) {
            validGameIds.push(i + 1)
        }
    }
    return validGameIds
}

function returnSumOfPassedGames(inputData: string, ruleList: RuleList) {
    const passedGames = returnPassedGameIdsForInputAndRuleList(inputData, ruleList)
    return passedGames.reduce((acc, el) => acc + el, 0)
}

function createRuleListFromInput(inputData: string): RuleList {
    let newRuleList: RuleList = {
        red: { color: "red", max: 0 },
        green: { color: "green", max: 0 },
        blue: { color: "blue", max: 0 },
    }

    for (const key in newRuleList) {
        const rule = newRuleList[key]
        const higestNumberForRule = getHighestNumberForRule(inputData, rule)
        if (higestNumberForRule > newRuleList[key].max) {
            newRuleList[key].max = higestNumberForRule
        }
    }

    return newRuleList
}

function finishGamePart2ONELINE(inputData: string) {
    const red = getHighestNumberForRule(inputData, { color: "red", max: 0 })
    const blue = getHighestNumberForRule(inputData, { color: "blue", max: 0 })
    const green = getHighestNumberForRule(inputData, { color: "green", max: 0 })

    return red * blue * green
}
function finishGamePart2ALL(inputData: string) {
    const inputArray = inputData.split("\n")

    return inputArray.reduce((acc, el) => acc + finishGamePart2ONELINE(el), 0)
}

export type { RuleList, Rule }

export {
    createRuleListFromInput,
    getHighestNumberForRule,
    isLineValidForGivenRule,
    isLineValidForGivenRuleList,
    returnPassedGameIdsForInputAndRuleList,
    returnSumOfPassedGames,
    finishGamePart2ONELINE,
    finishGamePart2ALL,
}
