import { readFileSync } from "fs"

interface Part {
    partNo: number
    startPosition: number
}

let testData = [
    "..........................%........*........694.....*.......930...451+....248.......20..........*...........$...$..285..203......904..184...",
    "..................................661..-844......*.../781...835..#163....*.......698.239.........*.....*.............*............*57.......",
    ".....................&...............*......+..139..................................*.........-.......282......................301..........",
]

// checkEngineData()
checkGears()

function checkGears() {
    let input = readFileSync("./day3/input", "utf-8").split("\n")
    testData = input

    let allGearRatios: number[] = []

    for (let i = 0; i < testData.length; i++) {
        const gearPositions: Part[] = findGearRowPosition(testData[i])

        //check each Gear Part
        for (const gear of gearPositions) {
            let partAdjacentToGear: Part[] = []
            // console.log("GEAR", i, gear)
            //checkPrevRow
            if (i > 0) {
                const rowPartPositions = findEnginePartsRowPosition(testData[i - 1])
                const touchingPart = isPartTouchingGear(gear, rowPartPositions)
                if (touchingPart.length > 0) {
                    // console.log("Touching", touchingPart)
                    partAdjacentToGear = [...partAdjacentToGear, ...touchingPart]
                }
            }
            //checkCurrentRow
            const rowPartPositions = findEnginePartsRowPosition(testData[i])
            const touchingPart = isPartTouchingGear(gear, rowPartPositions)
            if (touchingPart.length > 0) {
                // console.log("Touching", touchingPart)
                partAdjacentToGear = [...partAdjacentToGear, ...touchingPart]
            }
            //checkNextRow
            if (i + 1 < testData.length) {
                const rowPartPositions = findEnginePartsRowPosition(testData[i + 1])
                const touchingPart = isPartTouchingGear(gear, rowPartPositions)
                if (touchingPart.length > 0) {
                    // console.log("Touching", touchingPart)
                    partAdjacentToGear = [...partAdjacentToGear, ...touchingPart]
                }
            }
            if (partAdjacentToGear.length > 1) {
                // console.log(partAdjacentToGear)
                const ratio = partAdjacentToGear[0].partNo * partAdjacentToGear[1].partNo
                allGearRatios.push(ratio)
            }
            // console.log(isValidPart, partInfo)
            // console.log(isValidPart)
        }
    }
    console.log(allGearRatios)

    const sum = allGearRatios.reduce((acc, ratio) => acc + ratio, 0)
    console.log(sum) //FINISH: 76314915
}
function isPartTouchingGear(partInfo: Part, partList: Part[]) {
    const partPos = partInfo.startPosition
    let foundPart: Part[] = []
    for (const part of partList) {
        //check PartStartPosition
        const partStart = part.startPosition
        const partEnd = part.startPosition + part.partNo.toString().length - 1
        //check PartEndPosition
        if (partPos - 1 <= partStart && partPos + 1 >= partStart) {
            foundPart.push(part)
            // console.log("Found Part START", part)
        } else if (partPos - 1 <= partEnd && partPos + 1 >= partEnd) {
            foundPart.push(part)
            // console.log("Found Part END", part)
        }
    }
    return foundPart
}

function checkEngineData() {
    let input = readFileSync("./day3/input", "utf-8").split("\n")
    testData = input

    let allValidParts: Part[] = []

    for (let i = 0; i < testData.length; i++) {
        const rowPartPositions: Part[] = findEnginePartsRowPosition(testData[i])
        //check each Engine Part
        const validParts = rowPartPositions.filter((partInfo) => {
            let isValidPart = false
            //checkPrevRow
            if (i > 0) {
                isValidPart = checkIfEnginePartIsSurrounded(testData[i - 1], partInfo) || isValidPart
            }
            //checkCurrentRow
            isValidPart = checkIfEnginePartIsSurrounded(testData[i], partInfo) || isValidPart
            //checkNextRow
            if (i + 1 < testData.length) {
                isValidPart = checkIfEnginePartIsSurrounded(testData[i + 1], partInfo) || isValidPart
            }
            // console.log(isValidPart, partInfo)
            // console.log(isValidPart)
            return isValidPart
        })
        allValidParts = [...allValidParts, ...validParts]
    }
    console.log(allValidParts)

    const sum = allValidParts.reduce((acc, part) => acc + part.partNo, 0)
    console.log(sum)
}

function checkIfEnginePartIsSurrounded(rowToCheck: string, partInfo: Part) {
    const regexSymbols = new RegExp(/[^\.\d]/g)
    const textSurroundingEnginePart = rowToCheck.substring(
        partInfo.startPosition - 1,
        partInfo.startPosition + partInfo.partNo.toString().length + 1
    )
    // console.log(textSurroundingEnginePart)
    return regexSymbols.test(textSurroundingEnginePart)
}

function findEnginePartsRowPosition(rowData: string): Part[] {
    const partRegex = /\d+/g
    return findPartsRowPosition(rowData, partRegex)
}

function findGearRowPosition(rowData: string): Part[] {
    const partRegex = /\*/g
    return findPartsRowPosition(rowData, partRegex)
}

function findPartsRowPosition(rowData: string, matcher: RegExp): Part[] {
    //return all
    const rowMatches = rowData.matchAll(matcher)
    let outputArray: Part[] = []
    for (const match of rowMatches) {
        const partNo = Number.isNaN(Number(match[0])) ? 0 : Number(match[0])
        const partInfo: Part = { partNo: partNo, startPosition: Number(match.index) }
        outputArray.push(partInfo)
    }
    return outputArray
}
