import fs from "fs"

interface RuleList {
    [index: string]: Rule
    [Symbol.iterator](): any
}

interface Rule {
    color: string
    max: number
}

const rules: RuleList = {
    red: { color: "red", max: 12 },
    green: { color: "green", max: 13 },
    blue: { color: "blue", max: 14 },
    [Symbol.iterator]() {
        return Object.entries(this)
    },
}

//##################### RUN

// fs.readFile("./day2/input", (err: any, data: any) => {
//     let input = data.toString()

//     const result = returnPassedGameIdsForInputAndRuleList(input, rules)
//     console.1("RESULT", result)
//     console.log(result.reduce((acc, el) => (acc = acc + el), 0))
// })

//###########################

function checkHighestNumberForRule(inputLine: string, rule: Rule) {
    const color = rule.color
    const regex = new RegExp("(\\d+)(?= " + color + ")", "g")
    const iterator = inputLine.matchAll(regex)

    let higestNumberForRule = 0

    for (const match of iterator) {
        const matchedNumber = Number(match[0])
        higestNumberForRule = matchedNumber > higestNumberForRule ? matchedNumber : higestNumberForRule
    }
    return higestNumberForRule
}

function isLineValidForGivenRule(inputLine: string, rule: Rule) {
    const higestNumberForRule = checkHighestNumberForRule(inputLine, rule)
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

export {
    RuleList,
    checkHighestNumberForRule,
    isLineValidForGivenRule,
    isLineValidForGivenRuleList,
    returnPassedGameIdsForInputAndRuleList,
    returnSumOfPassedGames,
}
