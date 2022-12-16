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
            <h1>Oops!</h1>
            <h2>We can't seem to find the meme you're looking for.</h2>
            <p>Here are some popular searches instead:</p>
            <div class="categories">

                <ul>
                    <li onclick="onSearch(this.innerText)">Dogs</li>
                    <li onclick="onSearch(this.innerText)">Cats</li>
                    <li onclick="onSearch(this.innerText)">Funny</li>
                    <li onclick="onSearch(this.innerText)">Politic</li>
                    <li onclick="onSearch(this.innerText)">Happy</li>
                    <li onclick="onSearch(this.innerText)">Celeb</li>
                    <li onclick="onSearch(this.innerText)">Cute</li>
                    <li onclick="onSearch(this.innerText)">Baby</li>
                </ul>
            </div>
        </div>
        <div class="sad-smile-wrapper tablet-hide">
            <i class="fa-regular fa-face-sad-tear"></i>
        </div>
    </div>`
    document.querySelector('.gallery-grid').innerHTML = strHTML
    document.querySelector('.gallery-grid').classList.add('no-grid')
}

function popularCategories() {}
