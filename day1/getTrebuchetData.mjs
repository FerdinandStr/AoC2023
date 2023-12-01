import fs from "fs"

fs.readFile("./day1/input", (err, data) => {
    let input = data.toString()

    // const output = input
    //     .split("\n")
    //     .map((el) => {
    //         const firstNumber = getFirstNumberFromString(el)
    //         const secondNumber = getSecondNumberFromStringBackwards(el)
    //         const combinedNumber = firstNumber.concat(secondNumber)
    //         return combinedNumber
    //     })
    //     .reduce((acc, el) => acc + 1 * el, 0)

    // console.log(output)

    const output2 = input
        .split("\n")
        .map((el) => {
            console.log("START FAGGOT", el)
            const firstTextNumber = getFristStringNumberFromString(el)
            const firstNumber = getFirstNumberFromString(el)
            const first = firstTextNumber[1] < firstNumber[1] ? firstTextNumber[0] : firstNumber[0]
            console.log(firstTextNumber, firstNumber, first)

            const secondTextNumber = getLastStringNumberFromString(el)
            const secondNumber = getSecondNumberFromStringBackwards(el)
            const second = secondTextNumber[1] > secondNumber[1] ? secondTextNumber[0] : secondNumber[0]
            console.log(secondTextNumber, secondNumber, second)

            const combinedNumber = first.concat(second)
            console.log("COMBINED", combinedNumber)
            return combinedNumber
        })
        .reduce((acc, el) => acc + 1 * el, 0)

    console.log(output2)
})

function getFristStringNumberFromString(string) {
    // console.log("SEARCH FIRST", string)
    let firstIndexOfText = 100
    let number = ""
    for (let i = 0; i < 9; i++) {
        const indexOfText = string.search(stringNumbers[i])

        if (indexOfText != -1 && firstIndexOfText > indexOfText) {
            // console.log("HIT", indexOfText, i)
            firstIndexOfText = indexOfText
            number = i + 1 + ""
        }
    }
    // console.log("result", number)
    return [number, firstIndexOfText]
}

function getLastStringNumberFromString(string) {
    // console.log("SEARCH LAST", string)
    let firstIndexOfText = -1
    let number = ""
    for (let i = 0; i < 9; i++) {
        const indexOfText = string.matchAll(stringNumbers[i])

        for (const el of indexOfText) {
            if (indexOfText != -1 && firstIndexOfText < el.index) {
                // console.log("HIT", indexOfText, i)
                firstIndexOfText = el.index
                number = i + 1 + ""
            }
        }
    }
    // console.log("result", number)
    return [number, firstIndexOfText]
}

const stringNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

function getFirstNumberFromString(string) {
    const indexOfNumber = string.search(/(\d){1}/)
    const number = string.substring(indexOfNumber, indexOfNumber + 1)
    if (indexOfNumber != -1) {
        return [number, indexOfNumber]
    }
    return ["", 9999]
}
function getSecondNumberFromStringBackwards(string) {
    // const reverseString = string.split("").reverse().join("")

    const indexOfNumber = string.search(/(\d)(?!.*\d)/)
    const number = string.substring(indexOfNumber, indexOfNumber + 1)
    if (indexOfNumber != -1) {
        return [number, indexOfNumber]
    }
    return ["", -1]
}
