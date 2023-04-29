'use strict'

let gElCanvas
let gCtx
let gStartPos
let gIsMouseDown = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function initCanvas() {
    renderMeme()
    addListeners()
}

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

        if (idx === meme.selectedLineIdx) {
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


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // Listen for resize ev
    window.addEventListener('resize', () => {
        onInit()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log('Down!')
    // gIsMouseDown = true
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    console.log('Move!')
    const line = getLine()
    // if (!gIsMouseDown) return
    const { isDrag } = line
    if (!line || !isDrag) return
    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The meme is render again after every move
    renderMeme()
    gElCanvas.style.cursor = 'grabbing'
}

function onUp() {
    console.log('Up!')
    // gIsMouseDown = false
    setLineDrag(false)
    gElCanvas.style.cursor = 'grab'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // console.log('pos:', pos)
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        // console.log('ev.pageX:', ev.pageX)
        // console.log('ev.pageY:', ev.pageY)
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
}

function downloadImg(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64

    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}