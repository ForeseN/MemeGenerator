'use strict'

function onInit() {
    loadCanvas()
    loadImages()
    addListeners()
    onModuleSearch()
    loadSavedMemes()
    loadFont()

    if (isMobileDevice()) initMobile()
    defaultConfig()
    renderGallery()
}

function toggleRTL() {
    document.body.classList.toggle('rtl')
}

function initMobile() {
    removeActiveModules()
    hideElement('.tab-container')
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

function getPageWidth() {
    return Math.max(
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    )
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

async function onShare() {
    if (!getCurrMeme()) return

    // removeSelectedLine()
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
