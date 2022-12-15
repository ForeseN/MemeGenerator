'use strict'

let gElCanvas
let gCtx

const EPSILON = 10

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gIsDragging
let gStartPos

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    defaultConfig()
    addListeners()
    onModuleSearch()

    if (isMobileDevice()) initMobile()

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

function onTextDefaultSettings() {
    const meme = getCurrMeme()
    if (meme.selectedLineIdx == null) return
    const line = meme.lines[meme.selectedLineIdx]
    meme.lines[meme.selectedLineIdx] = getDefaultTextSettings(line.txt, line.x, line.y)
    applyTextModuleStyles(meme.lines[meme.selectedLineIdx])
    setMeme(meme)
    renderMeme(meme)
}

function TextModuleStylesClearSlate() {
    document.querySelectorAll('.font-buttons button').forEach(btn => {
        btn.classList.remove('active')
    })
}

function applyTextModuleStyles(line) {
    TextModuleStylesClearSlate()
    const { txt, size, font, align, bold, italic, underline } = line
    document.querySelector('.add-text-input').value = txt
    document.querySelector('.font-family-select').value = font
    document.querySelector('.font-size-select').value = size
    if (bold) document.querySelector('.bold-btn').classList.add('active')
    if (italic) document.querySelector('.italic-btn').classList.add('active')
    if (underline) document.querySelector('.underline-btn').classList.add('active')
    if (align === 'center') {
        document.querySelector('.align-center-btn').classList.add('active')
    }
    if (align === 'left') {
        document.querySelector('.align-left-btn').classList.add('active')
    }
    if (align === 'right') {
        document.querySelector('.align-right-btn').classList.add('active')
    }

    document.querySelector('.font-family-select')
}

function prepareMemeForDownload() {
    const meme = getCurrMeme()
    meme.selectedLineIdx = null
    setMeme(meme)
    renderMeme(meme)
}
// ---------------------- ON FUNCTIONS  ----------------------

function onAddText() {
    const addTextInput = document.querySelector('.add-text-input')
    const txt = addTextInput.value
    addText(txt)
    addTextInput.value = ''
}

function onBold() {
    document.querySelector('.bold-btn').classList.toggle('active')
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].bold = !meme.lines[meme.selectedLineIdx].bold
    setMeme(meme)
    renderMeme(meme)
}
function onItalic() {
    document.querySelector('.italic-btn').classList.toggle('active')
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].italic = !meme.lines[meme.selectedLineIdx].italic
    setMeme(meme)
    renderMeme(meme)
}
function onUnderline() {
    document.querySelector('.underline-btn').classList.toggle('active')
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].underline =
        !meme.lines[meme.selectedLineIdx].underline
    setMeme(meme)
    renderMeme(meme)
}

// function onIncFont() {
//     const meme = getCurrMeme()
//     meme.lines[meme.selectedLineIdx].size += 2
//     setMeme(meme)
//     renderMeme(meme)
// }
// function onDecFont() {
//     const meme = getCurrMeme()
//     meme.lines[meme.selectedLineIdx].size -= 2
//     setMeme(meme)
//     renderMeme(meme)
// }

// function onSwitchLines() {
//     const meme = getCurrMeme()
//     meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length
//     console.log(meme.selectedLineIdx)
//     setMeme(meme)
// }

function onShare() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
        )
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function onDownload() {
    prepareMemeForDownload()
    // Hopefully the preparation is done!
    setTimeout(() => {
        let link = document.createElement('a')
        link.download = 'meme.png'
        link.href = gElCanvas.toDataURL('image/png')
        link.click(), 100
    })
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

function onFontChange(value) {
    const meme = getCurrMeme()
    if (meme.selectedLineIdx == null) return
    meme.lines[meme.selectedLineIdx].font = value
    setMeme(meme)
    renderMeme(meme)
}

function onFontSizeChange(value) {
    const meme = getCurrMeme()
    if (meme.selectedLineIdx == null) return
    meme.lines[meme.selectedLineIdx].size = value
    setMeme(meme)
    renderMeme(meme)
}

function onBack() {
    hideElement('.editor')
    showElement('.gallery')
    renderGallery()
}

function onDown(ev) {
    // console.clear()
    const pos = getEvPos(ev)
    gStartPos = pos
    const meme = getCurrMeme()
    meme.selectedLineIdx = null
    meme.lines.forEach((line, idx) => {
        if (isClickedText(line, pos)) {
            console.log(idx, meme.selectedLineIdx)
            if (meme.selectedLineIdx === idx) putCaret(line)
            meme.selectedLineIdx = idx
            renderMeme(getCurrMeme())
            onModuleText()
            applyTextModuleStyles(line)
            gIsDragging = true
        }
    })
    if (meme.selectedLineIdx == null) onModuleText()
    defaultConfig()
    renderMeme(getCurrMeme())
}

function putCaret(line) {
    console.log('YES')
}
function onUp(ev) {
    gIsDragging = false
}
function onMove(ev) {
    if (!gIsDragging) return

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    const meme = getCurrMeme()

    moveLine(meme.lines[meme.selectedLineIdx], dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    setMeme(meme)
    renderMeme(meme)
}

function moveLine(line, dx, dy) {
    line.x += dx
    line.y += dy
}

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

function onModuleSearch(elBtn) {
    if (!elBtn) elBtn = document.querySelector('.search-btn')
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleSearch()
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
    // defaultConfig()
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
function addKeyboardListeners() {
    gElCanvas.addEventListener('keypress', onKeyDown())
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
        gElCanvas.width = 550
        gElCanvas.height = 550
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
        return { width: 550, height: 550 }
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

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev) {
    hideElement('.gallery')
    showElement('.editor')
    onModuleText()
    loadImageFromInput(ev, renderImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = event => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => {
            createDownloadedMeme(img.src)
            onImageReady(img)
        }
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}
