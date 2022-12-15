'use strict'

function renderModuleText() {
    document.querySelector('.tab-container').innerHTML = `
    <div class="text-module">
    ${getModuleHeader('text')}
        <input type="text" name="" id="add-text-input" class="add-text-input"
            placeholder="When you realize..." oninput="onChangeText(this.value)">
        <button class="btn round-btn add-text-btn" onclick="onAddText()">Add Text</button>
        <div class="font-area">
            <label for="font" class="text-white">Font</label>
            <select class="font-family-select" onchange="onFontChange(this.value)">
                <option style="font-family: impact, sans-serif;">Impact</option>
                <option style="font-family: Arial, sans-serif;">Arial</option>
                <option style="font-family: Times New Roman, sans-serif;">Times New Roman</option>
                <option style="font-family: Courier New, sans-serif;">Courier New</option>
                <option style="font-family: serif, sans-serif;">serif</option>
                <option style="font-family: sans-serif, sans-serif;">sans-serif</option>
            </select>
            <select class="font-size-select" onchange="onFontSizeChange(this.value)">
                <option>8</option>
                <option>10</option>
                <option>12</option>
                <option>14</option>
                <option>18</option>
                <option>24</option>
                <option>30</option>
                <option selected>36</option>
                <option>42</option>
                <option>48</option>
                <option>64</option>
                <option>72</option>
                <option>96</option>
            </select>
            <div class="font-buttons">
                <button class="btn bold-btn" onclick="onBold()"><i class="fa-solid fa-bold"></i></button>
                <button class="btn italic-btn" onclick="onItalic()"><i class="fa-solid fa-italic"></i></button>
                <button class="btn underline-btn" onclick="onUnderline()"><i
                        class="fa-solid fa-underline"></i></button>
                <button class="btn align-left-btn" onclick="onAlignLeft()"><i
                        class="fa-solid fa-align-left"></i></button>
                <button class="btn align-center-btn" onclick="onAlignCenter()"><i
                        class="fa-solid fa-align-center"></i></button>
                <button class="btn align-right-btn" onclick="onAlignRight()"><i
                        class="fa-solid fa-align-right"></i></button>
            </div>
            <div class="font-colors">
                <div class="flex justify-space-between align-items-center">
                    <label for="text-color" class="text-white">Text Color</label>
                    <input type="color" name="" id="text-color" value="#FFFFFF"
                        oninput="onTextColorChange(this.value)">
                </div>
                <div class="flex justify-space-between align-items-center">

                    <label for="text-outline" class="text-white">Text Outline</label>
                    <input type="color" name="" id="text-outline"
                        oninput="onTextOutlineColorChange(this.value)">
                </div>
            </div>
            <button class="btn round-btn default" onclick="onTextDefaultSettings()">Default Settings</button>
        </div>
    </div>
    `
}

function renderModuleStickers() {
    let strHTMLs = []
    strHTMLs.push(`
    <div class="stickers-label font-600">
        <div>Popular</div>
        <div class="stickers grid-5-columns text-bigger">
            <button class="btn util-btn" onclick="addText(this.innerText)">😂</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">❤️</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">😍</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">🙏</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">🎉</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">😊</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">🔥</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">🥺</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">😎</button>
            <button class="btn util-btn" onclick="addText(this.innerText)">💪</button>
        </div>
    </div>
    <div class="stickers-label font-600">
        <div>Emojis</div>
    </div>`)
    strHTMLs.push('<div class="grid-5-columns text-bigger">')
    for (let i = 128512; i < 128592; i++) {
        strHTMLs.push(
            `<button class="btn util-btn" onclick="addText(this.innerText)">&#${i}</button>`
        )
    }
    for (let i = 129296; i < 129336; i++) {
        strHTMLs.push(
            `<button class="btn util-btn" onclick="addText(this.innerText)">&#${i}</button>`
        )
    }

    strHTMLs.unshift(getModuleHeader('Stickers'))
    strHTMLs.push('</div>')
    document.querySelector('.tab-container').innerHTML = strHTMLs.join('')
}

function renderModuleSearch() {
    document.querySelector('.tab-container').innerHTML = `
    ${getModuleHeader('Search')}
    <div class="gallery-actions">
    <input type="search" name="" id="" placeholder="Search Memes" class="font-600 search-input" oninput="onSearch(this.value)">
    <h3 class="font-600">Popular Searches</h3>
    <div class="categories">

        ${getCategories()}
    </div>
    <label type="file" name="" for="file-upload" class="custom-file-input">Upload <i
            class="fa-solid fa-arrow-up-from-bracket"></i></label>
    <input type="file" name="" id="file-upload" onchange="onImgInput(event)" hidden>
</div>`
}

function getCategories() {
    return `<div class="categories">

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
</div>`
}

function renderModuleSavedMemes() {
    const memes = getSavedMemes()
    // console.log(imgs)

    let strHTML = memes.map((meme, idx) => {
        console.log(meme)
        return `<img src=${meme.imageSrc} alt="" srcset="" onclick="renderMeme(getSavedMeme(${idx}))">`
    })
    strHTML.unshift('<div class="media grid-2-columns">')
    strHTML.unshift(getModuleHeader('Saved memes'))
    strHTML.push(`</div>`)
    document.querySelector('.tab-container').innerHTML = strHTML.join('')
}
