'use strict'

function onInitImgGallery() {
    renderGallery()
}

function renderGallery() {
    let imgs = getImgs()
    const elGallery = document.querySelector('.images-container')
    const strHTMLs = imgs.map(img => `
    <img src="${img.url}" onclick="onImgSelect(this.id)" id="${img.id}">`)
    elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    const elGallery = document.querySelector('.image-gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    elGallery.classList.remove('block')
    elGallery.classList.add('none')
    elMemeEditor.classList.remove('none')
    renderMeme()
}

function renderImgs(keyword) {

}
