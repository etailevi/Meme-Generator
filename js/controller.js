'use strict'

let gElCanvas
let gCtx


renderMeme()

function renderMeme() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')

    drawImg2()
    gCtx.save()
    renderText()
}



function drawImg2() {
    const elImg = new Image() // Create a new html img element
    elImg.src = 'meme-imgs (square)/1.jpg' // Send a network req to get that image, define the img src
    console.log('elImg:', elImg)
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function renderText() {
    gCtx.font = '30px Arial'
    gCtx.strokeStyle = 'green'
    gCtx.strokeText('Saving the context', 10, 50)

    gCtx.save() // Saves the current drawing style state using a stack.

    gCtx.font = '25px sans serif'
    gCtx.strokeStyle = 'black'
    gCtx.strokeText('Switching to something else', 10, 100)

    gCtx.restore() // Restores the drawing style state to the last element on the 'state stack' saved by save().

    gCtx.strokeText('Back to previous context', 10, 150)
}



function downloadImg(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64

    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}