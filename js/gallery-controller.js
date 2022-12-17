'use strict'

function onImgSelect(id) {
    // DO NOT DELETE 2 RENDER MEMES OTHERWISE THINGS BREAK :(
    renderMeme(getMeme(id))
    renderMeme(getCurrMeme())
    openEditor()
}

function renderGallery() {
    document.querySelector('.gallery-grid').classList.remove('no-grid')
    const imgs = getFilteredImages()
    // return
    if (imgs.length === 0) return renderEmptyGallery()
    let strHTML = imgs.map(img => {
        return `<div><img src=${img.url} alt="" srcset="" onclick="onImgSelect(${img.id})"></div>`
    })
    strHTML.push('<div></div>')
    document.querySelector('.gallery-grid').innerHTML = strHTML.join('')
}

function renderEmptyGallery() {
    const strHTML = `
    <div class="empty-gallery">
        <div class="empty-gallery-content">
            <h1 data-trans="oops">Oops!</h1>
            <h2 data-trans="empty-gallery-header">We can't seem to find the meme you're looking for.</h2>
            <p data-trans="empty-gallery p" >Here are some popular searches instead:</p>
            ${getCategories()}
        </div>
        <div class="sad-smile-wrapper tablet-hide">
            <i class="fa-regular fa-face-sad-tear"></i>
        </div>
    </div>`
    document.querySelector('.gallery-grid').innerHTML = strHTML
    document.querySelector('.gallery-grid').classList.add('no-grid')
}

function popularCategories() {}
