import { readFileSync } from "fs"
interface conversionData {
    rangeStart: number
    rangeEnd: number
    targetDifference: number
}

const inputData = convertInputData()
let lowestLocation = 99999999999

for (let i = 0; i < 20; i = i + 2) {
    const currentSeed = inputData.seeds[i]
    const seedCounter = inputData.seeds[i + 1]
    console.log(currentSeed, seedCounter)
    for (let i = currentSeed; i < currentSeed + seedCounter; i++) {
        const location = runSeedValueToLocationWithMap(i, inputData.map)
        console.log("new seed", i)
        if (location < lowestLocation) {
            console.log("newLow", location)
            lowestLocation = location
        }
    }
}
// inputData.seeds.forEach((seed) => {
//     const location = runSeedValueToLocationWithMap(seed, inputData.map)
//     if (location < lowestLocation) {
//         // console.log("newLow", location)
//         lowestLocation = location
//     }
// })

console.log("LOWEST LOCATION", lowestLocation)
// REAL INPUT DATA GOLDEN WITH LOWEST LOCATION 174137457

export function convertInputData() {
    let input_win = readFileSync("./day5/input", "utf-8").split(/\n\s*\n.*\n/)
    const seeds = input_win[0]
        .slice(7)
        .split(" ")
        .map((el) => Number(el))
    input_win.shift()
    let step2 = input_win.map((el) => el.split("\n").map((el) => el.split(" ").map((el) => Number(el))))
    return { seeds: seeds, map: step2 }
}

export function checkIfNumberIsInRange(row: number[], seed: number) {
    const { rangeStart, rangeEnd } = turnRowDataIntoObject(row)
    if (seed >= rangeStart && seed <= rangeEnd) {
        return true
    }
    return false
}

export function convertNumberWithRowData(row: number[], seed: number) {
    const { targetDifference } = turnRowDataIntoObject(row)
    return seed + targetDifference
}

export function runSeedValueToLocationWithMap(seed: number, map: number[][][]) {
    let nextValue = seed
    map.forEach((conversionList) => {
        let hasMatchForList = false
        conversionList.forEach((rowData) => {
            const conversionData = turnRowDataIntoObject(rowData)
            if (checkIfNumberIsInRange(rowData, nextValue) && !hasMatchForList) {
                nextValue = convertNumberWithRowData(rowData, nextValue)
                // console.log("CONVERTABLE", conversionData, rowData, nextValue)
                hasMatchForList = true
                return
            }
        })
    })

    return nextValue
}

function turnRowDataIntoObject(row: number[]): conversionData {
    const rowData: conversionData = {
        rangeStart: row[1],
        rangeEnd: row[1] + row[2] - 1,
        targetDifference: row[0] - row[1],
    }
    return rowData
}
