import { readFileSync, writeFile } from "fs"

mainAllaKatja()
function mainAllaKatja() {
    const input = readFileSync("./src/day11/input_orig", "utf-8")
    const rows = input.split(/\n/)
    let cols: string[] = [""]
    let colCount = 0
    for (const string of input) {
        if (string == "\n") {
            colCount = 0
        } else {
            cols[colCount] = cols[colCount] ? cols[colCount] + string : string
            colCount++
        }
    }

    let emptyColIds: number[] = []
    let emptyRowIds: number[] = []

    cols.forEach((col, id) => {
        if (!col.includes("#")) {
            emptyColIds.push(id)
        }
    })
    rows.forEach((row, id) => {
        if (!row.includes("#")) {
            emptyRowIds.push(id)
        }
    })

    // console.log(emptyColIds)

    let galaxyCount = 0

    let galaxyPositions: number[][] = []

    for (let rowId = 0; rowId < rows.length; rowId++) {
        let colId = 0
        for (let string of rows[rowId]) {
            if (string == "#") {
                galaxyCount++
                galaxyPositions = [...galaxyPositions, [galaxyCount, rowId, colId]]
            }
            colId++
        }
    }

    let sumOfLengths = 0
    for (const startGalaxy of galaxyPositions) {
        const [galaxyId, rowId, columnId] = startGalaxy

        for (const targetGalaxy of galaxyPositions.slice(galaxyId)) {
            const distance = calculateGalaxyDistance(startGalaxy, targetGalaxy, emptyColIds, emptyRowIds)
            // console.log(distance)
            sumOfLengths = sumOfLengths + distance
        }
    }

    console.log(sumOfLengths)
    // toLow 9050472
    // wrong 9764110
    // WINNER PART 1 9445168
    // PART 2 742305960572
}

function calculateGalaxyDistance(
    startGalaxy: number[],
    targetGalaxy: number[],
    emptyColIds: number[],
    emptyRowIds: number[]
) {
    const startRow = startGalaxy[1]
    const targetRow = targetGalaxy[1]
    const startCol = startGalaxy[2]
    const targetCol = targetGalaxy[2]

    let rowDistance = Math.abs(startRow - targetRow)
    let columnDistance = Math.abs(startCol - targetCol)

    emptyColIds.forEach((id) => {
        // console.log("PASSED EMPTY COL?", id, startCol, targetCol)
        if ((id > startCol && id < targetCol) || (id < startCol && id > targetCol)) {
            // console.log("TRUE")
            columnDistance = columnDistance + 999999
        }
    })

    emptyRowIds.forEach((id) => {
        // console.log("PASSED EMPTY COL?", id, startCol, targetCol)
        if ((id > startRow && id < targetRow) || (id < startRow && id > targetRow)) {
            // console.log("TRUE")
            rowDistance = rowDistance + 999999
        }
    })

    const sumOfLengths = rowDistance + columnDistance

    // console.log(startGalaxy, targetGalaxy, rowDistance, columnDistance, sumOfLengths)

    return sumOfLengths
}
