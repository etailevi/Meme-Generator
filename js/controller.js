'use strict'

let gElCanvas
let gCtx


renderMeme()

function renderMeme() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    const elImg = new Image() // Create a new html img element
    elImg.src = 'meme-imgs (square)/1.jpg' // Send a network req to get that image, define the img src
    console.log('elImg:', elImg)
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.font = '25px poppins'
        gCtx.fillStyle = 'green'
        gCtx.strokeStyle = 'black'
        gCtx.fillText('hello world!', gElCanvas.width / 3, gElCanvas.height / 2)
        gCtx.strokeText('hello world!', gElCanvas.width / 3, gElCanvas.height / 2)
    }
}

function downloadImg(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64

    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}