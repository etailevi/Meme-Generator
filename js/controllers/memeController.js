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
        gCtx.font = meme.lines[meme.selectedLineIdx].size + 'px ' + meme.lines[meme.selectedLineIdx].font
        gCtx.fillStyle = meme.lines[meme.selectedLineIdx].fillColor
        gCtx.strokeStyle = meme.lines[meme.selectedLineIdx].strokeColor
        gCtx.textAlign = meme.lines[meme.selectedLineIdx].align
        const memeTxt = (meme.lines[meme.selectedLineIdx].txt) ? meme.lines[meme.selectedLineIdx].txt : ''
        gCtx.fillText(memeTxt, gElCanvas.width / 3, 50)
        gCtx.strokeText(memeTxt, gElCanvas.width / 3, 50)
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

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
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

function downloadImg(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64

    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}