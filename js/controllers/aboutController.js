'use strict'

function onShowAbout() {
    const elAboutPage = document.querySelector('.about')
    elAboutPage.classList.remove('none')
    elAboutPage.classList.add('block')
    document.querySelector('.image-gallery').classList.remove('block')
    document.querySelector('.image-gallery').classList.add('none')
    document.querySelector('.meme-editor').classList.remove('block')
    document.querySelector('.meme-editor').classList.add('none')
}