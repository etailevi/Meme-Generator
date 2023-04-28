'use strict'

let gElCanvas
let gCtx


renderMeme()

function renderMeme() {
    const meme = getMeme()
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    const elImg = new Image() // Create a new html img element
    elImg.src = `squared-imgs/${meme.selectedImgId}.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderTxt(meme, meme.lines)
    }
}

function renderTxt(meme, lines) {
    lines.forEach((line, idx) => {
        gCtx.font = line.size + 'px ' + line.font
        gCtx.fillStyle = line.fillColor
        gCtx.lineWidth = 1
        gCtx.strokeStyle = line.strokeColor
        gCtx.textAlign = line.align
        const memeTxt = (line.txt) ? line.txt : ''
        gCtx.fillText(memeTxt, line.pos.x, line.pos.y)
        gCtx.strokeText(memeTxt, line.pos.x, line.pos.y)

        const txtCoords = getTxtPos(idx)
        setTxtBorders(txtCoords, idx)

        if(idx === meme.selectedLineIdx) {
            markSelectedTxt(txtCoords, memeTxt)
        }
    })
}

function markSelectedTxt(coords, txt) {
    if (!txt) return
    const { xStart, yStart, xEnd, yEnd } = coords
    gCtx.beginPath()
    gCtx.roundRect(xStart, yStart, xEnd, yEnd, [5])
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    gCtx.closePath()
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

function onSetFillColor(color) {
    setFillColor(color)
    renderMeme()
}



function onSetFontFamily(font) {
    setFontFamily(font)
    renderMeme()
}

function onSwitchLine(idx) {
    switchLine(idx)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onAlignLeft(value) {
    alignLeft(value)
    renderMeme()
}

function onAlignCenter(value) {
    alignCenter(value)
    renderMeme()
}

function onAlignRight(value) {
    alignRight(value)
    renderMeme()
}

function onAddEmoji(emoji) {
    addEmoji(emoji)
    renderMeme()
}

function renderEmojis() {
    const elStickers = document.querySelector('.emojis-container')
    const emojis = getEmojis()
    let strHTMLs = emojis.map(emoji => `
    <button onclick="onAddEmoji(this.innerText)">${emoji}</button>`).join('')
    elStickers.innerHTML = strHTMLs
    renderMeme()
}

function onSelectEmojis(diff) {
    gEmojiIdx += diff
    if (gEmojiIdx === -1) {
        gEmojiIdx = gEmojis.length - 1
    }
    if (gEmojiIdx === gEmojis.length) gEmojiIdx = 0
    renderEmojis()
}

function downloadImg(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64

    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}