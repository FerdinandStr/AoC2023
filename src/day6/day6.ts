// const timeList = [71530]
// const distanceList = [940200]

const timeList = [41667266]
const distanceList = [244104712281040]

// const timeList = [41, 66, 72, 66]
// const distanceList = [244, 1047, 1228, 1040]

// const timeList = [7, 15, 30]
// const distanceList = [9, 40, 200]

runTime()

function runTime() {
    const result = timeList.reduce((acc, time, i) => {
        let marginOfError = 0
        for (let pressedMilliseconds = 1; pressedMilliseconds < time; pressedMilliseconds++) {
            const remainingTIme = time - pressedMilliseconds

            const disctancePossible = pressedMilliseconds * remainingTIme
            // console.log(pressedMilliseconds, disctancePossible)
            if (disctancePossible > distanceList[i]) {
                marginOfError++
            }
        }

        return acc ? acc * marginOfError : marginOfError
    }, 0)

    console.log(result)
}
