const cardMap = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

enum HandTypeEnum {
    HighCard = 1,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

interface HandInfo {
    hand: string
    intHand: number[]
    handType: HandTypeEnum
    bid: number
}

export function convertHandToIntHand(hand: string) {
    return hand.split("").map((el) => cardMap.indexOf(el))
}

export function convertRowDataToHandInfo(rowData: string): HandInfo {
    const [hand, bid] = rowData.split(" ")
    return { hand, intHand: convertHandToIntHand(hand), handType: determineHandType(hand), bid: Number(bid) }
}

export function orderHandInfoList(handInfoList: HandInfo[]) {
    return handInfoList.sort((a, b) => {
        if (a.handType == b.handType) {
            let handOrderIfSimilar = 0
            for (let i = 0; i < a.intHand.length; i++) {
                if (a.intHand[i] != b.intHand[i]) {
                    handOrderIfSimilar = a.intHand[i] - b.intHand[i]
                    break
                }
            }
            return handOrderIfSimilar
        } else {
            return a.handType - b.handType
        }
    })
}

export function calculateWinnings(handInfoList: HandInfo[]) {
    return handInfoList.reduce((acc, el, i) => {
        return acc + el.bid * (i + 1)
    }, 0)
}

export function determineHandType(hand: string) {
    const intHand = convertHandToIntHand(hand)
    const sortedHand = intHand.sort((a, b) => b - a)
    // console.log(sortedHand)
    let cardCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let value of sortedHand) {
        cardCount[value] = cardCount[value] + 1
    }

    // console.log(cardCount)
    let strongestType = HandTypeEnum.HighCard

    for (let count of cardCount) {
        switch (count) {
            case 5:
                strongestType = HandTypeEnum.FiveOfAKind
                break
            case 4:
                strongestType = HandTypeEnum.FourOfAKind
                break
            case 3:
                //Check Fullhouse 2
                if (cardCount.includes(2)) {
                    strongestType = HandTypeEnum.FullHouse
                } else {
                    //Only ThreeOfAKind
                    strongestType = HandTypeEnum.ThreeOfAKind
                }
                break
            case 2:
                if (strongestType < HandTypeEnum.TwoPair && cardCount.indexOf(2) != cardCount.lastIndexOf(2)) {
                    strongestType = HandTypeEnum.TwoPair
                } else if (strongestType < HandTypeEnum.OnePair) {
                    strongestType = HandTypeEnum.OnePair
                }
                break
            case 1:
                if (strongestType < HandTypeEnum.HighCard) {
                    strongestType = HandTypeEnum.HighCard
                }
                break
        }
    }
    return strongestType
}

export type { HandInfo }
export { HandTypeEnum }
