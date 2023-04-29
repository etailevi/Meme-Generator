'use strict'

const STORAGE_KEY = 'memesDB'
let gSavedMemes = _createSavedMemes()

let gImgId
let gCanvasWidth = 400
let gCanvasHeight = 400
let gMeme = _createMeme()
const gEmojis = ['🤓', '😍', '😉', '😥', '😎', '😋', '🤔', '😭', '🥸', '😻', '❤️', '👄', '👀', '👾', '💩']
let gEmojiIdx = 0

function _createSavedMemes() {
    let savedMemes = loadFromStorage(STORAGE_KEY)

    if (!savedMemes || !savedMemes.length) {
        savedMemes = []
        saveToStorage(STORAGE_KEY, savedMemes)
    }

    return savedMemes
}

function saveNewMeme(memeUrl) {
    const memeIdx = gSavedMemes.findIndex(meme => (meme.id === gMeme.id))
    if (memeIdx >= 0) {
        gSavedMemes[memeIdx].src = dataURL
    } else {
        let savedMeme = gMeme
        savedMeme.src = memeUrl
        savedMeme.id = getRandomId()
        gSavedMemes.push(savedMeme)
    }
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function removeSavedMeme(memeId) {
    const memeIdx = gSavedMemes.findIndex(meme => (meme.id === memeId))
    gSavedMemes.splice(memeIdx, 1)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function getSavedMemes() {
    return gSavedMemes
}

function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function _createMeme(pos) {
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
                isDrag: false
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
                isDrag: false
            }
        ]
    }
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

//Check if the click is inside the line
function isLineClicked(clickedPos) {
    return gMeme.lines.findIndex(line => {
        const { xStart, xEnd, yStart, yEnd} = line.borders
        return ((clickedPos.offsetY >= yStart && clickedPos.offsetY <= yEnd)
         && (clickedPos.offsetX >= xStart && clickedPos.offsetX <= xEnd))
    })
}


function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

// Move the line in a delta, diff from the pervious pos
function moveLine(dx, dy) {
    // console.log('dx:', dx)
    // console.log('dy:', dy)
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
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
            y: gCanvasHeight / 2
        },
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
            y: gCanvasHeight / 2
        },
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
    gMeme.lines[idx].borders = { xStart, yStart, xEnd: xStart + xEnd, yEnd: yStart + yEnd }
}