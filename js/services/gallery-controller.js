'use strict'

function onImgSelect(id) {
    renderMeme(getMeme(id))
    hideElement('.gallery')
    showElement('.editor')
}

function renderGallery() {
    const imgs = getImages()
    let strHTML = imgs.map(img => {
        return `<img src=${img.url} alt="" srcset="" onclick="onImgSelect(${img.id})">`
    })
    console.log(imgs)
    document.querySelector('.gallery-grid').innerHTML = strHTML.join('')
}
