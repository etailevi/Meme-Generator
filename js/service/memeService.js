'use strict'

let gImgId
let gMeme = _createMeme()


function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function _createMeme() {
    return {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Add Text',
                size: 20,
                align: 'left',
                strokeColor: 'black',
                fillColor: 'white',
            }
        ]
    }
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}

function setStrokeColor(color) {
    gMeme.lines[0].strokeColor = color
}

function setFillColor(color) {
    gMeme.lines[0].fillColor = color
}

function SetFilterBy(value) {

}