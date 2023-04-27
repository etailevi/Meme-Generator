'use strict'

let gImgId
let gCanvasWidth = 400
let gCanvasHeight = 400
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
                font: 'Impact',
                size: 30,
                align: 'center',
                strokeColor: 'black',
                fillColor: 'white',
                pos: {
                    x: gCanvasWidth / 2,
                    y: gCanvasHeight * 0.15
                },
            },
            {
                txt: 'Add Text',
                font: 'Impact',
                size: 30,
                align: 'center',
                strokeColor: 'black',
                fillColor: 'white',
                pos: {
                    x: gCanvasWidth / 2,
                    y: gCanvasHeight * 0.85
                },
            }
        ]
    }
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function switchLine(idx) {
    if (idx >= 0) gMeme.selectedLineIdx = idx
    else gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? 0 : gMeme.selectedLineIdx + 1
}

function alignLeft(value) {
    gMeme.lines[gMeme.selectedLineIdx].align = value
}

function alignCenter(value) {
    gMeme.lines[gMeme.selectedLineIdx].align = value
}

function alignRight(value) {
    gMeme.lines[gMeme.selectedLineIdx].align = value
}