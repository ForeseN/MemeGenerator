'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    defaultConfig()
    // resizeCanvas()
    const meme = getMeme(3)
    console.log(meme)
    // renderMeme(meme)
    // renderGallery()
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
        meme.lines.forEach(line => {
            const { txt, size, font, align, fillColor, strokeColor } = line
            drawText(
                txt,
                gElCanvas.width / 2,
                50,
                size,
                font,
                align,
                fillColor,
                strokeColor
            )
        })
    }
}

// ---------------------- ON FUNCTIONS  ----------------------

function onAddText() {
    const txt = document.querySelector('#add-text-input').value
    addText(txt)
}

// ---------------------- DRAW & RENDER ----------------------

function drawText(text, x, y, size, font, align, fillColor, strokeColor) {
    gCtx.font = `${size}px ${font}`
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.textAlign = align
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
    defaultConfig() // revert settings
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
