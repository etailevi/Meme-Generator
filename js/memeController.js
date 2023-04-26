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
        gCtx.font = meme.lines[0].size + 'px '+ 'Impact'
        gCtx.fillStyle = meme.lines[0].fillColor
        gCtx.strokeStyle = meme.lines[0].strokeColor
        gCtx.textAlign = meme.lines[0].align
        const memeTxt = (meme.lines[0].txt) ? meme.lines[0].txt : ''
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

function downloadImg(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64

    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}