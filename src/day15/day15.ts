import { readFileSync } from "fs"

// const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
const input = readFileSync("./src/day15/input", "utf-8").replaceAll("\n", "")

hashInput(input)

// Letters at start = Lens
// hash of Letters = box
// = / - = operation
// - remove lens from box (do nothing of no lens matches)
// move remaining lenses forward

// = followed number of focal lengh (lens)
// 1) replace if lens with same number is in!
// 2) if no match, add lens at back

const expectedResult = [["rn=1", "cm=2"], [], [], ["ot=7", "ab=5", "pc=6"]]

let boxArray = new Array<string[]>(256)

putLensInBoxArray()

function putLensInBoxArray() {
    console.log(boxArray)
}

function hashInput(input: string) {
    const inputArray = input.split(",")
    let globalSum = 0

    for (const string of inputArray) {
        // console.log(string)
        let currentValue = 0
        for (const char of string) {
            currentValue = currentValue + hashCharacter(char)
            // console.log("ASCII", currentValue)
            currentValue = currentValue * 17
            currentValue = currentValue % 256
            // console.log(currentValue)
        }
        // console.log("RUN", currentValue)
        globalSum = globalSum + currentValue
    }
    console.log(globalSum)
}

function hashCharacter(char: string) {
    return char.charCodeAt(0)
}
