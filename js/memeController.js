'use strict'

let gElCanvas
let gCtx

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    defaultConfig()
    addListeners()
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

function isClickedText(line, pos) {
    const { txt, size, font, align, bold, italic, x, y } = line
    gCtx.font = `${bold ? 'bold' : 'normal'} ${
        italic ? 'italic' : 'normal'
    } ${size}px ${font}`
    const textMeasurements = gCtx.measureText(txt)
    const width = textMeasurements.width
    const height =
        textMeasurements.actualBoundingBoxAscent +
        textMeasurements.actualBoundingBoxDescent
    // console.log(width, height)
    return (
        pos.x > line.x - width / 2 &&
        pos.x < line.x + width / 2 &&
        pos.y > line.y - height / 2 &&
        pos.y < line.y + height / 2
    )
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

function onDown(ev) {
    console.clear()
    const pos = getEvPos(ev)
    console.log(pos)
    const meme = getCurrMeme()
    console.log(meme)

    meme.lines.forEach((line, idx) => {
        if (isClickedText(line, pos)) {
            meme.selectedLineIdx = idx
        }
    })

    defaultConfig()
}

function onUp(ev) {}
function onMove(ev) {}

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

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        // console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

// ----------------------   LISTENERS   ----------------------

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    // Listen for resize ev
    // window.addEventListener('resize', () => {
    // resizeCanvas()
    // renderCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}
