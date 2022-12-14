'use strict'

function onImgSelect(id) {
    renderMeme(getMeme(id))
    hideElement('.gallery')
    showElement('.editor')
    onModuleText()
}

function renderGallery() {
    const imgs = getImages()
    let strHTML = imgs.map(img => {
        return `<img src=${img.url} alt="" srcset="" onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.gallery-grid').innerHTML = strHTML.join('')
}

function renderAsideGallery() {
    const imgs = getImages()

    let strHTML = imgs.map(img => {
        return `<img src=${img.url} alt="" srcset="" onclick="onImgSelect(${img.id})">`
    })
    strHTML.unshift('<div class="media grid-2-columns">')
    strHTML.unshift(getModuleHeader('media'))
    strHTML.push(`</div>`)
    document.querySelector('.tab-container').innerHTML = strHTML.join('')
}
