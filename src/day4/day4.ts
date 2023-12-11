import { readFileSync } from "fs"

calculatePoints()

function calculatePoints() {
    const input_win = readFileSync("./src/day4/input_win", "utf-8").split("\n")
    const input_luck = readFileSync("./src/day4/input_luck", "utf-8").split("\n")

    const winArray = input_win.map(splitNumbers)
    const luckArray = input_luck.map(splitNumbers)

    //PART ONE
    // const result = luckArray.reduce((acc, row, rowIndex) => {
    //     const pointsOfRow = row.reduce((acc, el) => {
    //         const isLuckNumberInWinArray = winArray[rowIndex].includes(el)
    //         if (isLuckNumberInWinArray) {
    //             if (acc == 0) {
    //                 acc = 1
    //             } else {
    //                 acc = acc * 2
    //             }
    //         }
    //         return acc
    //     }, 0)
    //     return acc + pointsOfRow
    // }, 0)

    let cardCountList = winArray.map(() => 1)
    console.log(cardCountList)

    const result = luckArray.reduce((acc, row, rowIndex) => {
        const rowsToAdd = row.reduce((acc, el) => {
            const isLuckNumberInWinArray = winArray[rowIndex].includes(el)
            if (isLuckNumberInWinArray) {
                return acc + 1
            }
            return acc
        }, 0)

        //füg so viele neue Karten hinzu
        if (rowsToAdd > 0) {
            for (let i = 1; i <= rowsToAdd; i++) {
                //plus current rowRecursionNumber
                cardCountList[rowIndex + i] = cardCountList[rowIndex + i] + cardCountList[rowIndex]
            }
        }

        return acc + rowsToAdd
    }, 0)

    // console.log(result)
    //42572 to high
    //21269 to low

    const resultPart2 = cardCountList.reduce((acc, el) => acc + el, 0)
    console.log(resultPart2)
}

function splitNumbers(row: string) {
    return row.split(/ +/)
}
