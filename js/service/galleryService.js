'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
const gImageNums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
let gImgs = _createImgs()

function getImgs() {
    return gImgs
}

function _createImgs() {
    let imgs = [];

    gImageNums.forEach(num => {
        let img = {
            id: num,
            url: `squared-imgs/${num}.jpg`,
            keywords: ['funny', 'cat']
        }
        imgs[num] = img
    })
    
    return imgs
}

function onSetFilterBy(value) {
    SetFilterBy(value)
}