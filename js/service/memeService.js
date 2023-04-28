'use strict'

let gImgId
let gCanvasWidth = 400
let gCanvasHeight = 400
let gMeme = _createMeme()
const gEmojis = ['🤓', '😍', '😉', '😥', '😎', '😋', '🤔', '😭', '🥸', '😻', '❤️', '👄', '👀', '👾', '💩']
let gEmojiIdx = 0



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

function addLine() {
    gMeme.isLineSelected = true
    gMeme.lines.push({
        txt: 'Add Text',
        font: 'Impact',
        size: 30,
        align: 'center',
        strokeColor: 'black',
        fillColor: 'white',
        pos: {
            x: gCanvasWidth / 2,
            y: gCanvasHeight / 2 },
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
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

function getEmojis() {
    if (gEmojiIdx + 3 < gEmojis.length) {
        return gEmojis.slice(gEmojiIdx, gEmojiIdx + 4)
    } else {
        const gap = gEmojis.length - gEmojiIdx
        return gEmojis.slice(gEmojiIdx, gEmojiIdx + gap).push(gEmojis.slice(0, 4 - gap))
    }
}

function addEmoji(emoji) {
    gMeme.isLineSelected = true
    gMeme.lines.push({
        txt: emoji,
        font: 'Impact',
        size: 30,
        align: 'center',
        strokeColor: 'black',
        fillColor: 'white',
        pos: {
            x: gCanvasWidth / 2,
            y: gCanvasHeight / 2 },
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getTxtPos(idx) {
    const line = gMeme.lines[idx]
    let height = line.size
    let width = gCtx.measureText(line.txt).width
    let xStart
    let yStart = line.pos.y - height
    let xEnd = width + (height / 4)
    let yEnd = height + (height / 4)
    
    if (line.align === 'center') xStart = line.pos.x - (width / 2) - 5
    else if (line.align === 'start') xStart = line.pos.x - 5
    else xStart = line.pos.x - width - 5

    return { xStart, yStart, xEnd, yEnd }
}

function setTxtBorders(coords, idx) {
    const { xStart, yStart, xEnd, yEnd } = coords
    gMeme.lines[idx].borders = {xStart, yStart, xEnd: xStart + xEnd, yEnd: yStart + yEnd}
}