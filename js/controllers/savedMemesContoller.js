'use strict'

function renderSavedMemes() {
    const memes = getSavedMemes()

    const strHTMLs = memes.map((meme) => {
        return `<section class="saved-meme">
            <img src="${meme.src}" onclick="onImgSelect(this)" id="${meme.id}" class="saved-meme-img" alt="Saved Meme">
                <button class="btn-editor btn-squared btn-remove btn-remove-saved" onclick="onRemoveMeme('${meme.id}')">
                    <img src="icons/trash.png" alt="Trash">
                </button>
        </section>`
    })
    const msg = `<h1 class="empty-saved-memes">You haven't saved any memes yet!<br>
    So, what are you waiting for?!<br>
    Jump to the gallery and make a hilarious one 🤡</h1>`
    const elSavedMemes = document.querySelector('.saved-memes-container')
    elSavedMemes.innerHTML = (memes.length) ? strHTMLs.join('') : msg
}

function onSaveMeme() {
    renderMeme()

    const dataURL = gElCanvas.toDataURL()
    saveNewMeme(dataURL)
    onShowSaved()
}

function onRemoveMeme(memeId) {
    removeSavedMeme(memeId)
    renderSavedMemes()
}

function onShowSaved() {
    const elSavedMemes = document.querySelector('.saved-memes')
    const elGallery = document.querySelector('.image-gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    elSavedMemes.classList.remove('none')
    elSavedMemes.classList.add('block')

    elGallery.classList.remove('block')
    elGallery.classList.add('none')

    elMemeEditor.classList.remove('block')
    elMemeEditor.classList.add('none')
    renderSavedMemes()
}

function hideSaved() {
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.classList.remove('block')
    elSavedMemes.classList.add('none')
}