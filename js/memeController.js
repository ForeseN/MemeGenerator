'use strict'

let gElCanvas
let gCtx

const EPSILON = 10

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    defaultConfig()
    addListeners()

    // if (isMobileDevice()) initMobile()

    resizeCanvas()

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
    gCtx.lineWidth = 1
}

function renderMeme(meme) {
    let img = new Image() // Create a new html img element
    img.src = meme.url // Set the img src
    img.onload = () => {
        renderImg(img)
        renderTextOnMeme(meme)
        if (meme.selectedLineIdx != null) {
            markSelectedLine(meme.lines[meme.selectedLineIdx])
        }

        // resizeCanvas()
    }
}

function renderTextOnMeme(meme) {
    meme.lines.forEach(line => {
        drawText(line)
    })
}

function isClickedText(line, pos) {
    const width = getLineWidth(line)
    const height = getLineHeight(line)
    console.log(
        pos.x,
        line.x - width / 2,
        pos.x,
        line.x + width / 2,
        pos.y,
        line.y - height / 2,
        pos.y,
        line.y + height / 2
    )
    return (
        pos.x > line.x - width / 2 &&
        pos.x < line.x + width / 2 &&
        pos.y > line.y - height / 2 &&
        pos.y < line.y + height / 2
    )
}

function getLineWidth(line) {
    const { txt, size, font, align, bold, italic, x, y } = line
    gCtx.font = `${bold ? 'bold' : 'normal'} ${
        italic ? 'italic' : 'normal'
    } ${size}px ${font}`
    const textMeasurements = gCtx.measureText(txt)
    const width = textMeasurements.width
    return width
}
function getLineHeight(line) {
    const { txt, size, font, align, bold, italic, x, y } = line
    gCtx.font = `${bold ? 'bold' : 'normal'} ${
        italic ? 'italic' : 'normal'
    } ${size}px ${font}`
    const textMeasurements = gCtx.measureText(txt)
    const height =
        textMeasurements.actualBoundingBoxAscent +
        textMeasurements.actualBoundingBoxDescent
    return height
}
function markSelectedLine(line) {
    const width = getLineWidth(line)
    const height = getLineHeight(line)
    const startX = line.x - width / 2
    const endX = line.x + width / 2 - startX
    const startY = line.y - height / 2
    const endY = line.y + height / 2 - startY
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(
        startX - EPSILON,
        startY - EPSILON,
        endX + 2 * EPSILON,
        endY + 2 * EPSILON
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

function onTextColorChange(value) {
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].fillColor = value
    renderMeme(meme)
}
function onTextOutlineColorChange(value) {
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].strokeColor = value
    renderMeme(meme)
}

function onDown(ev) {
    console.clear()
    const pos = getEvPos(ev)
    console.log(pos)
    const meme = getCurrMeme()
    meme.selectedLineIdx = null
    meme.lines.forEach((line, idx) => {
        if (isClickedText(line, pos)) {
            meme.selectedLineIdx = idx
            renderMeme(getCurrMeme())
        }
    })
    defaultConfig()
    renderMeme(getCurrMeme())
}

function onUp(ev) {}
function onMove(ev) {}

// ----------------------  ON MODULES   ----------------------

function onModuleText(elBtn) {
    if (!elBtn) elBtn = document.querySelector('.txt-btn')
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleText()
}

function onModuleGallery(elBtn) {
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderAsideGallery()
}
function onModuleStickers(elBtn) {
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleStickers()
}

function removeActiveModules() {
    const btns = document.querySelectorAll('.modules button')
    ;[...btns].forEach(btn => {
        btn.classList.remove('active')
    })
}

function onCloseModule() {
    removeActiveModules()
    hideElement('.tab-container')
}

function getModuleHeader(txt) {
    return `
    
        <div class="module-header">${txt}
        <button class="btn pc-hide close-module" onclick="onCloseModule()"><i class="fa-solid fa-xmark fa-1x"></i></button>
    </div>`
}
// ---------------------- RENDER MODULES ----------------------

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

    gCtx.font = `
    ${bold ? 'bold' : 'normal'}
    ${italic ? 'italic' : 'normal'}
    ${size}px ${font}`

    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.textAlign = align
    gCtx.lineJoin = 'miter'
    gCtx.miterLimit = 2
    if (isMobileDevice()) {
        gCtx.lineWidth = 4
        gCtx.strokeText(txt, x, y)
        gCtx.fillText(txt, x, y)
    } else {
        gCtx.fillText(txt, x, y)
        gCtx.strokeText(txt, x, y)
    }
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
    window.addEventListener('resize', () => {
        // resizeCanvas()
        // renderCanvas()
    })
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

function resizeCanvas() {
    // const elContainer = document.querySelector('.canvas-container')
    // console.log(elContainer.offsetWidth)
    // const oldCanvasWidth = gElCanvas.width
    // const oldCanvasHeight = gElCanvas.height
    // gElCanvas.width = elContainer.offsetWidth - 20
    // gElCanvas.height = elContainer.offsetHeight - 20
    // const hWidth = gElCanvas.width / oldCanvasWidth
    // const hHeight = gElCanvas.width / oldCanvasHeight
    // console.log(gElCanvas.width)
    // const meme = getCurrMeme()
    // meme.lines.forEach(line => {
    //     line.x *= hWidth
    //     line.y *= hHeight
    // })
    // renderMeme(getCurrMeme())
    // gElCanvas = document.getElementById('my-canvas')
    // gElCanvas.width = gElCanvas.offsetWidth
    // gElCanvas.height = gElCanvas.offsetHeight
    const pageWidth = getPageWidth()
    // console.log(pageWidth)
    if (pageWidth > 1080) {
        gElCanvas.width = 450
        gElCanvas.height = 450
    }
    if (pageWidth < 1080 && pageWidth > 580) {
        gElCanvas.width = 400
        gElCanvas.height = 400
    }
    if (pageWidth < 580) {
        // gElCanvas.width = 200
        // gElCanvas.height = 200
        gElCanvas.width = pageWidth * 0.95
        gElCanvas.height = pageWidth * 0.95
    }
    // console.log(gElCanvas.height, gElCanvas.width)
    // getMeme(1)
    // renderMeme(getCurrMeme())
}

function getCanvasMetrics() {
    const pageWidth = getPageWidth()
    if (pageWidth > 1080) {
        return { width: 450, height: 450 }
    }
    if (pageWidth < 1080 && pageWidth > 580) {
        return { width: 400, height: 400 }
    }
    if (pageWidth < 580) {
        return { width: pageWidth * 0.95, height: pageWidth * 0.95 }
    }
}

function getPageWidth() {
    return Math.max(
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    )
}

function initMobile() {
    removeActiveModules()
    hideElement('.tab-container')
}
