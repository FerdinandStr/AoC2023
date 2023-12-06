// start with seed 79

import { readFileSync } from "fs"
import {
    checkIfNumberIsInRange,
    convertInputData,
    convertNumberWithRowData,
    runSeedValueToLocationWithMap,
    turnRowDataIntoObject,
} from "./day5"

// seed to soil
const rowData = [18, 25, 70]
const seed = 79
const nextValue = 74

describe("seed locator", () => {
    const inputData = convertInputData()
    const map = inputData.map

    it("checks if the seed (number) is in range of the row values", () => {
        const { rangeStart, rangeEnd } = turnRowDataIntoObject(rowData)
        let isInRange = checkIfNumberIsInRange(rangeStart, rangeEnd, seed)
        expect(isInRange).toBe(false)
        isInRange = checkIfNumberIsInRange(rangeStart, rangeEnd, seed)
        expect(isInRange).toBe(true)
    })

    it("converts the seed (number) to the next target number", () => {
        const { targetDifference } = turnRowDataIntoObject(rowData)
        const newNumber = convertNumberWithRowData(targetDifference, 81)

        expect(newNumber).toBe(nextValue)
    })

    it("can run a seed trough all conversions with multiple rows", () => {
        const location = runSeedValueToLocationWithMap(seed, map)

        expect(location).toBe(82)
    })
    // REAL INPUT DATA GOLDEN WITH LOWEST LOCATION 174137457
})
