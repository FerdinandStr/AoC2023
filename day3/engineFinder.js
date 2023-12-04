function checkEngineData() {
    var rowPartPositions = findEnginePartsRowPosition("467..114..");
}
function findEnginePartsRowPosition(rowData) {
    //: Array<Array<number, number>>
    //return all
    var rowMatches = rowData.matchAll(/\d+/);
    console.log(rowMatches);
}
