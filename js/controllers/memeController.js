'use strict'

let gElCanvas
let gCtx


renderMeme()

function renderMeme() {
    const meme = getMeme()
    const lineDetails = meme.lines[meme.selectedLineIdx]
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    const elImg = new Image() // Create a new html img element
    elImg.src = `squared-imgs/${meme.selectedImgId}.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.font = lineDetails.size + 'px ' + lineDetails.font
        gCtx.fillStyle = lineDetails.fillColor
        gCtx.strokeStyle = lineDetails.strokeColor
        gCtx.textAlign = lineDetails.align
        const memeTxt = (lineDetails.txt) ? lineDetails.txt : ''
        gCtx.fillText(memeTxt, lineDetails.pos.x, lineDetails.pos.y)
        gCtx.strokeText(memeTxt, lineDetails.pos.x, lineDetails.pos.y)
    }
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

function downloadImg(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64

    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}