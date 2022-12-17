'use strict'

let gElCanvas
let gCtx

const RESIZE_BALL_RADIUS = 7
const EPSILON = 10
const RESIZE_CONSTANT = 5
const ROTATE_BALL_RADIUS = 8

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gIsDragging
let gIsResizing
let gStartPos
let gCurrentResizeCorner
let gIsRotating

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    loadImages()
    addListeners()
    onModuleSearch()
    loadSavedMemes()
    loadFont()

    if (isMobileDevice()) initMobile()
    defaultConfig()
    renderGallery()
}

function defaultConfig() {
    gCtx.font = '36px impact'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.lineWidth = 4
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
        setMeme(meme)
        doTrans()
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
    // console.log(
    //     pos.x,
    //     line.x - width / 2,
    //     pos.x,
    //     line.x + width / 2,
    //     pos.y,
    //     line.y - height / 2,
    //     pos.y,
    //     line.y + height / 2
    // )
    return (
        pos.x > line.x - width / 2 &&
        pos.x < line.x + width / 2 &&
        pos.y > line.y - height / 2 &&
        pos.y < line.y + height / 2
    )
}

function loadFont() {
    var f = new FontFace('Impact', 'url(./font/unicode.impact.ttf)')
    f.load().then(function (font) {
        // Ready to use the font in a canvas context
        console.log('font ready')

        // Add font on the html page
        document.fonts.add(font)
    })
}

function getLineWidth(line) {
    const { txt, size, font, align, bold, italic, x, y } = line
    gCtx.font = `${bold ? 'bold' : 'normal'} ${italic ? 'italic' : 'normal'} ${size}px ${font}`
    const textMeasurements = gCtx.measureText(txt)
    return textMeasurements.width
}
function getLineHeight(line) {
    const { txt, size, font, align, bold, italic, x, y } = line
    gCtx.font = `${bold ? 'bold' : 'normal'} ${italic ? 'italic' : 'normal'} ${size}px ${font}`
    const textMeasurements = gCtx.measureText(txt)
    const height =
        textMeasurements.actualBoundingBoxAscent + textMeasurements.actualBoundingBoxDescent
    return height
}

function markRotatedLine(line) {
    const width = getLineWidth(line)
    const height = getLineHeight(line)
    const startX = line.x - width / 2
    const rectWidth = line.x + width / 2 - startX
    const startY = line.y - height / 2
    const rectHeight = line.y + height / 2 - startY
    gCtx.beginPath()
    gCtx.save()
    gCtx.translate(startX + rectWidth / 2, startY + rectHeight / 2)
    gCtx.rotate(line.rotateValue)
    gCtx.strokeRect(
        -(rectWidth / 2 + EPSILON),
        -(rectHeight / 2 + EPSILON),
        rectWidth + 2 * EPSILON,
        rectHeight + 2 * EPSILON
    )
    gCtx.textAlign = 'center'
    // gCtx.strokeText(txt, 0, 0)
    // gCtx.fillText(txt, 0, 0)
    gCtx.restore()
    defaultConfig()
}
function markSelectedLine(line) {
    const width = getLineWidth(line)
    const height = getLineHeight(line)
    const startX = line.x - width / 2
    const rectWidth = line.x + width / 2 - startX
    const startY = line.y - height / 2
    const rectHeight = line.y + height / 2 - startY
    // gCtx.save()
    gCtx.lineWidth = 2
    if (line.rotateValue != 0) return markRotatedLine(line)
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(
        startX - EPSILON,
        startY - EPSILON,
        rectWidth + 2 * EPSILON,
        rectHeight + 2 * EPSILON
    )

    gCtx.lineWidth = 1
    gCtx.fillStyle = '#0083e2'
    gCtx.strokeStyle = 'black'

    // Left Top
    gCtx.beginPath()
    gCtx.arc(startX - EPSILON, startY - EPSILON, RESIZE_BALL_RADIUS, 0, Math.PI * 2)
    gCtx.fill()
    gCtx.stroke()

    // Left Bottom
    gCtx.beginPath()
    gCtx.arc(startX - EPSILON, line.y + height / 2 + EPSILON, RESIZE_BALL_RADIUS, 0, Math.PI * 2)
    gCtx.fill()
    gCtx.stroke()

    // Right Bottom
    gCtx.beginPath()
    gCtx.arc(
        line.x + width / 2 + EPSILON,
        line.y - height / 2 - EPSILON,
        RESIZE_BALL_RADIUS,
        0,
        Math.PI * 2
    )
    gCtx.fill()
    gCtx.stroke()

    // Right Top
    gCtx.beginPath()
    gCtx.arc(
        line.x + width / 2 + EPSILON,
        line.y + height / 2 + EPSILON,
        RESIZE_BALL_RADIUS,
        0,
        Math.PI * 2
    )
    gCtx.fill()
    gCtx.stroke()

    // Rotate Circle
    gCtx.fillStyle = '#00e1d7'

    gCtx.beginPath()
    gCtx.moveTo(line.x, line.y + height / 2 + EPSILON)
    gCtx.lineTo(line.x, rectHeight + line.y + 20)
    gCtx.stroke()

    gCtx.beginPath()
    gCtx.arc(line.x, rectHeight + line.y + 20, ROTATE_BALL_RADIUS, 0, Math.PI * 2)
    gCtx.fill()
    gCtx.stroke()

    // gCtx.restore()
    defaultConfig()
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
    let { txt, size, font, align, bold, italic, underline } = line
    if (txt !== 'ADD YOUR TEXT HERE') {
        document.querySelector('.add-text-input').value = txt
    }
    document.querySelector('.font-family-select').value = font

    size = Math.trunc(size) // after resizing it comes as a decimal
    const elFontSelect = document.querySelector('.font-size-select')
    // removing the last child
    elFontSelect.removeChild(elFontSelect.options[elFontSelect.options.length - 1])
    // appending the new one
    var opt = document.createElement('option')
    opt.value = size
    opt.innerHTML = size
    elFontSelect.appendChild(opt)
    document.querySelector('.font-size-select').value = size

    // console.log(value, text)
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
    doTrans()
}

function removeSelectedLine() {
    const meme = getCurrMeme()
    meme.selectedLineIdx = null
    setMeme(meme)
    renderMeme(meme)
}

function openEditor() {
    hideElement('.gallery')
    showElement('.editor')
    onModuleText()
    doTrans()
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
    meme.lines[meme.selectedLineIdx].underline = !meme.lines[meme.selectedLineIdx].underline
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

async function onShare() {
    if (!getCurrMeme()) return
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    const blob = await (await fetch(imgDataUrl)).blob()
    const filesArray = [
        new File([blob], 'animation.png', {
            type: blob.type,
            lastModified: new Date().getTime(),
        }),
    ]
    const shareData = {
        files: filesArray,
    }
    navigator.share(shareData)

    // Working Facebook Share
    // const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format
    // // A function to be called if request succeeds
    // function onSuccess(uploadedImgUrl) {
    //     // Encode the instance of certain characters in the url
    //     const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    //     window.open(
    //         `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    //     )
    // }
    // // Send the image to the server
    // doUploadImg(imgDataUrl, onSuccess)
}

function onDownload() {
    if (!getCurrMeme()) return
    removeSelectedLine()
    const userPref = getUserPref()
    // Hopefully selected line is removed
    setTimeout(() => {
        let link = document.createElement('a')
        link.download = `meme.${userPref.format}`
        link.href = gElCanvas.toDataURL(`image/${userPref.format}`)
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
    meme.lines[meme.selectedLineIdx].size = parseInt(value)
    setMeme(meme)
    renderMeme(meme)
}

function onChangeText(value) {
    const meme = getCurrMeme()
    if (meme.selectedLineIdx == null) return

    meme.lines[meme.selectedLineIdx].txt = value
    setMeme(meme)
    renderMeme(meme)
}

function onAlignLeft() {
    const meme = getCurrMeme()
    if (meme.selectedLineIdx == null) return

    const line = meme.lines[meme.selectedLineIdx]
    line.align = 'left'

    const lineWidth = getLineWidth(line)
    line.x = lineWidth / 2 + 25

    setMeme(meme)
    renderMeme(meme)
    applyTextModuleStyles(line)
}
function onAlignCenter() {
    const meme = getCurrMeme()
    if (meme.selectedLineIdx == null) return

    const line = meme.lines[meme.selectedLineIdx]
    line.align = 'center'
    line.x = gElCanvas.width / 2

    setMeme(meme)
    renderMeme(meme)
    applyTextModuleStyles(line)
}
function onAlignRight() {
    const meme = getCurrMeme()
    if (meme.selectedLineIdx == null) return

    const line = meme.lines[meme.selectedLineIdx]
    line.align = 'right'

    const lineWidth = getLineWidth(line)
    line.x = gElCanvas.width - lineWidth / 2 - 25

    setMeme(meme)
    renderMeme(meme)
    applyTextModuleStyles(line)
}

function onBack() {
    hideElement('.editor')
    showElement('.gallery')
    renderGallery()
    doTrans()
}

function onSurpriseMe() {
    surpriseMeme()
    openEditor()
    renderMeme(getCurrMeme())
    renderMeme(getCurrMeme())
}

function onSearch(value) {
    document.querySelector('.search-input').value = value
    const images = getUnfilteredImages()
    const filteredImages = images.filter(image => {
        return image.keywords.find(keyword => {
            return keyword.includes(value.toLowerCase())
        })
    })
    setFilteredImgs(filteredImages)
    renderGallery()
    doTrans()
}

function onSave() {
    removeSelectedLine()
    // Hopefully selected line is removed
    setTimeout(() => {
        const meme = getCurrMeme()
        const savedMemes = getSavedMemes()
        meme.imageSrc = gElCanvas.toDataURL('image/jpeg')
        savedMemes.push(meme)
        saveToStorage(SAVED_MEMES_KEY, savedMemes)
        onModuleSavedMemes()
        doTrans()
    }, 100)
}

//Check if the click is inside the circle
function isClickedOnResize(line, clickedPos) {
    const width = getLineWidth(line)
    const height = getLineHeight(line)

    const startX = line.x - width / 2
    const startY = line.y - height / 2

    const resizeBallsCor = [
        { ballX: startX - EPSILON, ballY: startY - EPSILON, corner: 'left-top' },
        {
            ballX: startX - EPSILON,
            ballY: line.y + height / 2 + EPSILON,
            corner: 'left-bottom',
        },
        {
            ballX: line.x + width / 2 + EPSILON,
            ballY: line.y - height / 2 - EPSILON,
            corner: 'right-top',
        },
        {
            ballX: line.x + width / 2 + EPSILON,
            ballY: line.y + height / 2 + EPSILON,
            corner: 'right-bottom',
        },
    ]

    let corner = ''
    resizeBallsCor.forEach(cor => {
        let distance = Math.sqrt((cor.ballX - clickedPos.x) ** 2 + (cor.ballY - clickedPos.y) ** 2)
        if (distance <= RESIZE_BALL_RADIUS) corner = cor.corner
    })
    return corner
}

function isClickedOnRotate(line, clickedPos) {
    const width = getLineWidth(line)
    const height = getLineHeight(line)

    const startX = line.x - width / 2
    const rectWidth = line.x + width / 2 - startX
    const startY = line.y - height / 2
    const rectHeight = line.y + height / 2 - startY

    gCtx.arc(line.x, rectHeight + line.y + 20, RESIZE_BALL_RADIUS + 1, 0, Math.PI * 2)

    let distance = Math.sqrt(
        (line.x - clickedPos.x) ** 2 + (rectHeight + line.y + 20 - clickedPos.y) ** 2
    )
    return distance <= ROTATE_BALL_RADIUS
}

function onDown(ev) {
    document.body.style.cursor = 'grabbing'
    // console.clear()
    const pos = getEvPos(ev)
    gStartPos = pos

    const meme = getCurrMeme()
    meme.selectedLineIdx = null
    meme.lines.forEach((line, idx) => {
        if (isClickedText(line, pos)) {
            // console.log(idx, meme.selectedLineIdx)
            meme.selectedLineIdx = idx
            renderMeme(getCurrMeme())
            onModuleText()
            applyTextModuleStyles(line)
            gIsDragging = true
        }
        const corner = isClickedOnResize(line, pos)
        if (corner) {
            meme.selectedLineIdx = idx
            gIsResizing = true
            gCurrentResizeCorner = corner
        }
        if (isClickedOnRotate(line, pos)) {
            meme.selectedLineIdx = idx
            gIsRotating = true
            console.log('YES')
        }
    })

    if (meme.selectedLineIdx == null) onModuleText()
    defaultConfig()
    renderMeme(getCurrMeme())
}

function onUp(ev) {
    gIsDragging = false
    gIsResizing = false
    gIsRotating = false
    gCurrentResizeCorner = ''
    document.body.style.cursor = 'auto'
}

function onDrag(ev) {
    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    const meme = getCurrMeme()

    moveLine(meme.lines[meme.selectedLineIdx], dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    setMeme(meme)
    renderMeme(meme)
}

function onResize(ev) {
    // console.log('YES')
    const meme = getCurrMeme()
    const line = meme.lines[meme.selectedLineIdx]

    // if (gCurrentResizeCorner=='')

    const pos = getEvPos(ev)
    // // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    // const meme = getCurrMeme()

    resizeLine(line, dx)
    // // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    setMeme(meme)
    renderMeme(meme)
}

function onRotate(ev) {
    // console.log('YES')
    const meme = getCurrMeme()
    const line = meme.lines[meme.selectedLineIdx]

    // if (gCurrentResizeCorner=='')

    const pos = getEvPos(ev)
    // // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    // const meme = getCurrMeme()

    rotateLine(line, dx)
    // // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    setMeme(meme)
    renderMeme(meme)
}

function rotateLine(line, dx, dy) {
    line.rotateValue += -dx / 80
    // console.log('ROTATING')
    // gCtx.save()
    // gCtx.translate(newx, newy)
    // gCtx.rotate(-Math.PI / 2)
    // gCtx.textAlign = 'center'
    // gCtx.fillText('Your Label Here', labelXposition, 0)
    // gCtx.restore()
}
function onMove(ev) {
    if (gIsDragging) onDrag(ev)
    if (gIsResizing) onResize(ev)
    if (gIsRotating) onRotate(ev)

    const meme = getCurrMeme()
    if (meme.selectedLineIdx == null) return
    const line = meme.lines[meme.selectedLineIdx]
    line.align = null
}

function resizeLine(line, dx) {
    if (gCurrentResizeCorner === 'left-top' || gCurrentResizeCorner === 'left-bottom') {
        dx = -dx
    }
    line.size += dx / RESIZE_CONSTANT
    line.size = Math.max(line.size, 15)
    applyTextModuleStyles(line)
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
    doTrans()
}

function onModuleGallery(elBtn) {
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleGallery()
    doTrans()
}
function onModuleStickers(elBtn) {
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleStickers()
    doTrans()
}

function onModuleSearch(elBtn) {
    if (!elBtn) elBtn = document.querySelector('.search-btn')
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleSearch()
    doTrans()
}
function onModuleSavedMemes(elBtn) {
    if (!elBtn) elBtn = document.querySelector('.saved-memes-btn')
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleSavedMemes()
    doTrans()
}
function onModuleExamples(elBtn) {
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleExamples()
    doTrans()
}

function onModuleHelp(elBtn) {
    showElement('.tab-container')
    removeActiveModules()
    elBtn.classList.add('active')
    renderModuleHelp()
    doTrans()
}

function renderModuleHelp() {
    document.querySelector('.tab-container').innerHTML = `
    ${getModuleHeader('Help')}
    <div class="help-module">
        <h3 data-trans="help-module-header">Need Some Help?</h3>
        <p data-trans="help-module-p">You can contact me via one of my socials</p>
        <div class="socials">
            <a href="https://www.facebook.com/yaron.kashayev/" target="_blank" class="btn"><img src="imgs/facebook.png" alt=""></a>
            <a href="https://www.linkedin.com/in/yaron-shapira/" target="_blank" class="btn"><img src="imgs/linkedin.png" alt=""></a>
            <a href="https://www.instagram.com/yaron_shapira_k/" target="_blank" class="btn"><img src="imgs/instagram.png" alt=""></a>
            <a href="https://github.com/ForeseN" target="_blank" class="btn"><img src="imgs/github.png" alt=""></a>
        </div>
        <p class="copyright">&copy; 2022, <span data-trans="full-name">Yaron Shapira</span></p>
    </div>
    `
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
        rotateValue,
        x,
        y,
    } = line

    gCtx.font = `
    ${bold ? 'bold' : 'normal'}
    ${italic ? 'italic' : 'normal'}
    ${size}px ${font}`

    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.lineJoin = 'miter'
    gCtx.miterLimit = 2
    if (rotateValue != 0) {
        drawRotatedText(txt, x, y, rotateValue)
    } else {
        gCtx.strokeText(txt, x, y)
        gCtx.fillText(txt, x, y)
    }
    defaultConfig() // revert settings
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawRotatedText(txt, x, y, rotateValue) {
    gCtx.save()
    gCtx.translate(x, y)
    gCtx.rotate(rotateValue)
    gCtx.textAlign = 'center'
    gCtx.strokeText(txt, 0, 0)
    gCtx.fillText(txt, 0, 0)
    gCtx.restore()
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

function resizeCanvas(url) {
    let img = new Image() // Create a new html img element
    img.src = url

    // while (!img.width) {}

    const ratio = img.height / img.width

    const pageWidth = getPageWidth()
    // console.log(pageWidth)
    if (pageWidth > 1080) {
        gElCanvas.width = 650
    }
    if (pageWidth < 1080 && pageWidth > 580) {
        gElCanvas.width = 400
    }
    if (pageWidth < 580) {
        gElCanvas.width = pageWidth * 0.9
    }
    gElCanvas.height = gElCanvas.width * ratio
    console.log('resizeCanvas() Done')
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
    openEditor()
    doTrans()
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
            doTrans()
        }
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function onCloseModal() {
    hideElement('.modal')
    hideElement('.black-overlay')
}

function onOpenSettings() {
    renderSettingsModal()
    openModal()
}

function openModal() {
    showElement('.modal')
    showElement('.black-overlay')
    doTrans()
}

function onChangeUserPrefFormat(elBtn) {
    document
        .querySelectorAll('.format-buttons button')
        .forEach(btn => btn.classList.remove('active'))
    elBtn.classList.add('active')

    const userPref = getUserPref()
    userPref.format = elBtn.innerText.toLowerCase()
    setUserPref(userPref)
}
function onChangeUserPrefLanguage(elBtn) {
    document
        .querySelectorAll('.language-buttons button')
        .forEach(btn => btn.classList.remove('active'))
    elBtn.classList.add('active')

    const userPref = getUserPref()
    if (userPref.lang !== elBtn.dataset.lang) {
        toggleRTL()
    }
    userPref.lang = elBtn.dataset.lang
    setUserPref(userPref)
    setLang(userPref.lang)
    doTrans()
}

function toggleRTL() {
    document.body.classList.toggle('rtl')
}

// TODO
// check every layout
// add hebrew support
// clean all code!!!
// add favicon
