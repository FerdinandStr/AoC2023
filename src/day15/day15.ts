import { readFileSync } from "fs"

// const input = "HASH"
// const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
const input = readFileSync("./src/day15/input", "utf-8").replaceAll("\n", "")

// Letters at start = Lens
// hash of Letters = box
// = / - = operation
// - remove lens from box (do nothing of no lens matches)
// move remaining lenses forward

// = followed number of focal lengh (lens)
// 1) replace if lens with same number is in!
// 2) if no match, add lens at back

const expectedResult = [["rn=1", "cm=2"], [], [], ["ot=7", "ab=5", "pc=6"]]
let boxArray: string[][] = []
for (let i = 0; i < 256; i++) {
    boxArray.push([])
}

hashInput(input)

function putLensInBoxArray(element: string) {
    console.log(boxArray[1])
    const indexOfOperator = getIndexOfOperator(element)
    const lensLabel = element.slice(0, indexOfOperator)
    const boxId = hashOfElement(lensLabel)
    let box = boxArray[boxId]
    console.log("START", element, "Box", boxId)
    const operation = element.slice(indexOfOperator, indexOfOperator + 1)

    const lensLabelIndexInBox = box.findIndex((el) => el.slice(0, indexOfOperator) == lensLabel)

    console.log("IsInNBox=?", lensLabelIndexInBox)
    if (operation == "=") {
        if (lensLabelIndexInBox != -1) {
            //REPLACE LENS WITH NEW LENS
            box[lensLabelIndexInBox] = element
        } else {
            //ADD NEW LENS TO BACK IF NOT IN BOX
            box.push(element)
        }
    } else {
        //DELETE LENS ON "-" OPERATION
        box = box.filter((el) => el.slice(0, indexOfOperator) != lensLabel)
    }

    //put updated box back in boxArray
    boxArray[boxId] = box
    // console.log(box)
    // console.log(boxArray)
}

function hashOfElement(element: string) {
    return element.split("").reduce((acc, char) => ((acc + hashCharacter(char)) * 17) % 256, 0)
}

function hashInput(input: string) {
    const inputArray = input.split(",")
    let globalSum = 0

    for (const element of inputArray) {
        console.log(element)

        putLensInBoxArray(element)

        // console.log(hashOfElement(element))
        let currentValue = hashOfElement(element)
        // for (const char of element) {
        //     currentValue = currentValue + hashCharacter(char)
        //     // console.log("ASCII", currentValue)
        //     currentValue = currentValue * 17
        //     currentValue = currentValue % 256
        //     // console.log(currentValue)
        // }
        // console.log("RUN", currentValue)
        globalSum = globalSum + currentValue
    }

    const totalFocusingPower = boxArray.reduce((acc, box) => {
        let boxFocusingPower = 0
        box.forEach((lens, lensSlot) => {
            const indexOfOperator = getIndexOfOperator(lens)
            const lensLabel = lens.slice(0, indexOfOperator)
            const boxId = hashOfElement(lensLabel)
            const focalLength = lens.slice(indexOfOperator + 1, indexOfOperator + 2)
            const lensfocusingPower = (boxId + 1) * (lensSlot + 1) * Number(focalLength)
            // console.log("INFO", lens, lensLabel, boxId, focalLength)
            boxFocusingPower = boxFocusingPower + lensfocusingPower
        })
        return acc + boxFocusingPower
    }, 0)

    console.log(totalFocusingPower) //244199
    console.log(globalSum) //514281
}

function getIndexOfOperator(element: string) {
    console.log("INDEXCALC", element)
    const operatorIndex = element.indexOf("=") != -1 ? element.indexOf("=") : element.indexOf("-")
    console.log(operatorIndex)
    return operatorIndex
}

function hashCharacter(char: string) {
    return char.charCodeAt(0)
}
