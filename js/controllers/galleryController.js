'use strict'

function onInitImgGallery() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.images-container')
    let strHTMLs = `<button class="btn file-input">
                        <label for="img-input">
                            Upload Your Own Image
                            <input type="file" id="img-input" name="image" onchange="onImgInput(event)" />
                        </label>
                    </button>`
    strHTMLs += imgs.map(img => `
    <img src="${img.url}" onclick="onImgSelect(this.id)" id="${img.id}">`).join('')
    elGallery.innerHTML = strHTMLs
}

function onImgSelect(imgId) {
    setImg(imgId)
    const elGallery = document.querySelector('.image-gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    elGallery.classList.remove('block')
    elGallery.classList.add('none')
    elMemeEditor.classList.remove('none')
    renderEmojis()
    renderMeme()
}

function renderImgs(keyword) {

}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
    const elBtn = document.querySelector('.btn-menu')
    elBtn.innerText = (elBtn.innerText === '☰') ? 'X' : '☰'
}