import { readFileSync, writeFile } from "fs"

mainAllaKatja()
function mainAllaKatja() {
    const rows = readFileSync("./src/day11/input", "utf-8").split(/\n/)
    let galaxyCount = 0

    let galaxyPositions: number[][] = []

    for (let rowId = 0; rowId < rows.length; rowId++) {
        let colId = 0
        for (let string of rows[rowId]) {
            colId++
            if (string == "#") {
                galaxyCount++
                galaxyPositions = [...galaxyPositions, [galaxyCount, rowId, colId]]
            }
        }
    }

    let sumOfLengths = 0
    for (const startGalaxy of galaxyPositions) {
        const [galaxyId, rowId, columnId] = startGalaxy

        for (const targetGalaxy of galaxyPositions.slice(galaxyId)) {
            const distance = calculateGalaxyDistance(startGalaxy, targetGalaxy)
            // console.log(distance)
            sumOfLengths = sumOfLengths + distance
        }
    }

    console.log(sumOfLengths)
    // toLow 9050472
}

function calculateGalaxyDistance(startGalaxy: number[], targetGalaxy: number[]) {
    const rowDistance = Math.abs(startGalaxy[1] - targetGalaxy[1])
    const columnDistance = Math.abs(startGalaxy[2] - targetGalaxy[2])
    const sumOfLengths = rowDistance + columnDistance
    if (startGalaxy[0] == 1) {
        console.log(startGalaxy, targetGalaxy, rowDistance, columnDistance, sumOfLengths)
    }

    return sumOfLengths
}
