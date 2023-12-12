import { readFileSync } from "fs"

const direction =
    "LRRLRRLRRRLRLLRRRLLRRRLRLRRRLRLRRLRRRLRRRLRLRRRLRRRLRRLRRRLLLRLRRRLRRRLRRRLRLRLRRLLRRRLRLLRLRRRLRRLLRLRLRRLRRRLRRLLRLRRRLLRRLRRRLRLRRLLRRRLRRLLRRLRRRLRLRRRLRRLRRRLRRRLRRLRRRLRLRRLRRRLRRRLRRLLRLRRLRRLRRRLRLLLRRRLLRRRLRLRRRLRLRRLRRRLLLRLRRRLRLRRLRRRLRRRLRRLRLRLRRRR"

loopOverInput()

function readInput() {
    const input = readFileSync("./src/day8/input", "utf-8").split(/\n/)
    return input.map((el) => {
        const location = el.split(" = ")

        return {
            [location[0]]: location[1].replace("(", "").replace(")", "").split(", "),
        }
    })
}

function loopOverInput() {
    const input = readInput()

    let position = "AAA"
    const end = "ZZZ"

    let step = 0

    // while (position != end) {
    //     const foundPos = input.find((el) => Object.keys(el)[0] == position)
    //     console.log("POS", foundPos[position])
    //     let next_direction = direction[step % direction.length] == "R" ? 1 : 0
    //     console.log("next dir:", next_direction)
    //     console.log("POS", foundPos[position])
    //     position = foundPos[position][next_direction]

    //     console.log("POSITION", position)
    //     step += 1
    // }

    console.log("steps:", step)

    //SOLUTION 11309
}

function moveToNextDestination() {}
