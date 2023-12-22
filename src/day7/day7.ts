const cardMap = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]

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

export function convertRowDataToHandInfoWithJokers(rowData: string): HandInfo {
    const [hand, bid] = rowData.split(" ")
    return { hand, intHand: convertHandToIntHand(hand), handType: determineHandTypeWithJokers(hand), bid: Number(bid) }
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

export function determineHandTypeWithJokers(hand: string) {
    console.log("HAND", hand)
    const intHand = convertHandToIntHand(hand)
    const sortedHand = intHand.sort((a, b) => b - a)
    // console.log("SORTED HAND", sortedHand)
    let cardCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let value of sortedHand) {
        cardCount[value] = cardCount[value] + 1
    }

    // console.log("CARD COUNT", cardCount)
    let strongestType = HandTypeEnum.HighCard

    const jokerCount = cardCount[0]

    const updateStrongestType = (newType: HandTypeEnum) => {
        console.log("UPDATE", strongestType, newType > strongestType ? newType : strongestType)
        return newType > strongestType ? newType : strongestType
    }

    cardCount.forEach((count, cardInt) => {
        // let countWithJoker = count
        // if(jokerCount > 0 && cardInt != 0){
        //     countWithJoker = count + jokerCount
        // }

        switch (count) {
            case 5:
                strongestType = updateStrongestType(HandTypeEnum.FiveOfAKind)
                break
            case 4:
                strongestType = updateStrongestType(HandTypeEnum.FourOfAKind)
                if (jokerCount > 0) {
                    strongestType = updateStrongestType(HandTypeEnum.FiveOfAKind)
                }
                break
            case 3:
                //Check Fullhouse 2
                if (jokerCount == 3) {
                    break
                }
                if (jokerCount == 2) {
                    strongestType = updateStrongestType(HandTypeEnum.FiveOfAKind)
                }
                if (cardCount.includes(2) && jokerCount == 3) {
                    strongestType = updateStrongestType(HandTypeEnum.FiveOfAKind)
                }
                if (cardCount.includes(2)) {
                    strongestType = updateStrongestType(HandTypeEnum.FullHouse)
                } else {
                    //Only ThreeOfAKind
                    strongestType = updateStrongestType(HandTypeEnum.ThreeOfAKind)
                    if (jokerCount > 0) {
                        strongestType = updateStrongestType(HandTypeEnum.ThreeOfAKind + 1 + jokerCount)
                    }
                }
                break
            case 2:
                if (jokerCount == 2) {
                    break
                }

                if (cardCount.indexOf(2) != cardCount.lastIndexOf(2) && jokerCount != 2) {
                    strongestType = updateStrongestType(HandTypeEnum.TwoPair)
                    if (jokerCount > 0) {
                        strongestType = updateStrongestType(HandTypeEnum.FullHouse)
                    }
                } else {
                    strongestType = updateStrongestType(HandTypeEnum.OnePair)
                    if (jokerCount == 1) {
                        strongestType = updateStrongestType(HandTypeEnum.ThreeOfAKind)
                    }
                    if (jokerCount == 2) {
                        strongestType = updateStrongestType(HandTypeEnum.FourOfAKind)
                    }
                    if (jokerCount == 3) {
                        strongestType = updateStrongestType(HandTypeEnum.FiveOfAKind)
                    }
                }
                break
            case 1:
                strongestType = updateStrongestType(HandTypeEnum.HighCard)
                if (jokerCount == 1) {
                    strongestType = updateStrongestType(HandTypeEnum.OnePair)
                }
                if (jokerCount == 2) {
                    strongestType = updateStrongestType(HandTypeEnum.ThreeOfAKind)
                }
                if (jokerCount == 3) {
                    strongestType = updateStrongestType(HandTypeEnum.FourOfAKind)
                }
                break
        }
    })
    return strongestType
}

export type { HandInfo }
export { HandTypeEnum }
