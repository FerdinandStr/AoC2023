import { readFileSync } from "fs"
import { PerformanceObserver, performance } from "perf_hooks"
interface conversionData {
    rangeStart: number
    rangeEnd: number
    targetDifference: number
}

const inputData = convertInputData()
let lowestLocation = 99999999999

//PART TO REALLY LONG RUNTIME
// for (let i = 0; i < 20; i = i + 2) {
//     const currentSeed = inputData.seeds[i]
//     const seedCounter = inputData.seeds[i + 1]
//     console.log("Seeds", currentSeed, seedCounter)
//     for (let i = currentSeed; i < currentSeed + seedCounter; i++) {
//         const location = runSeedValueToLocationWithMap(i, inputData.map)
//         // console.log("new seed", i)
//         if (location < lowestLocation) {
//             // console.log("newLow", location)
//             lowestLocation = location
//         }
//     }
// }

//part1
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
    let input_win = readFileSync("./src/day5/input_test", "utf-8").split(/\n\s*\n.*\n/)
    const seeds = input_win[0]
        .slice(7)
        .split(" ")
        .map((el) => Number(el))
    input_win.shift()
    let step2 = input_win.map((el) => el.split("\n").map((el) => el.split(" ").map((el) => Number(el))))
    return { seeds: seeds, map: step2 }
}

export function checkIfNumberIsInRange(rangeStart: number, rangeEnd: number, seed: number) {
    if (seed >= rangeStart && seed <= rangeEnd) {
        return true
    }
    return false
}

export function convertNumberWithRowData(targetDifference: number, seed: number) {
    return seed + targetDifference
}

export function runSeedValueToLocationWithMap(seed: number, map: number[][][]) {
    let nextValue = seed
    map.forEach((conversionList) => {
        for (let i = 0; i < conversionList.length; i++) {
            const rowData = conversionList[i]
            const rangeStart = rowData[1]
            const rangeEnd = rowData[1] + rowData[2] - 1
            const targetDifference = rowData[0] - rowData[1]

            if (checkIfNumberIsInRange(rangeStart, rangeEnd, nextValue)) {
                nextValue = convertNumberWithRowData(targetDifference, nextValue)
                // console.log("CONVERTABLE", conversionData, rowData, nextValue)
                break
            }
        }
    })

    return nextValue
}

export function turnRowDataIntoObject(row: number[]): conversionData {
    const rowData: conversionData = {
        rangeStart: row[1],
        rangeEnd: row[1] + row[2] - 1,
        targetDifference: row[0] - row[1],
    }
    return rowData
}
