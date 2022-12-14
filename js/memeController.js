'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    defaultConfig()
    // resizeCanvas()
    const meme = getMeme(3)
    // console.log(meme)
    renderMeme(meme)
    renderGallery()
    // renderAsideGallery()
}

function defaultConfig() {
    gCtx.font = '40px impact'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.lineWidth = 2
}

function renderMeme(meme) {
    let img = new Image() // Create a new html img element
    img.src = meme.url // Set the img src
    img.onload = () => {
        renderImg(img)
        renderTextOnMeme(meme)
    }
}

function renderTextOnMeme(meme) {
    meme.lines.forEach(line => {
        drawText(line)
    })
}

// ---------------------- ON FUNCTIONS  ----------------------

function onAddText() {
    const addTextInput = document.querySelector('.add-text-input')
    const txt = addTextInput.value
    addText(txt)
    addTextInput.value = ''
}

function onBold() {
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].bold = !meme.lines[meme.selectedLineIdx].bold
    setMeme(meme)
    renderMeme(meme)
}
function onItalic() {
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].italic = !meme.lines[meme.selectedLineIdx].italic
    setMeme(meme)
    renderMeme(meme)
}
function onUnderline() {
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].underline =
        !meme.lines[meme.selectedLineIdx].underline
    setMeme(meme)
    renderMeme(meme)
}

function onIncFont() {
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].size += 2
    setMeme(meme)
    renderMeme(meme)
}
function onDecFont() {
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].size -= 2
    setMeme(meme)
    renderMeme(meme)
}

function onSwitchLines() {
    const meme = getCurrMeme()
    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length
    console.log(meme.selectedLineIdx)
    setMeme(meme)
}

// ----------------------  ON MODULES   ----------------------

function onModuleText(elBtn) {
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleText()
}

function removeActiveModules() {
    const btns = document.querySelectorAll('.modules button')
    ;[...btns].forEach(btn => {
        btn.classList.remove('active')
    })
}
// ---------------------- RENDER MODULES ----------------------

function renderModuleText() {}

// ---------------------- DRAW & RENDER ----------------------

function drawText(line) {
    const {
        txt,
        size,
        font,
        align,
        fillColor,
        strokeColor,
        bold,
        italic,
        underline,
        x,
        y,
    } = line

    gCtx.font = `${bold ? 'bold' : 'normal'} ${
        italic ? 'italic' : 'normal'
    } ${size}px ${font}`

    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.textAlign = align
    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
    defaultConfig() // revert settings
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
