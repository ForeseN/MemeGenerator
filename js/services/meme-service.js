'use strict'

const DEFAULT_MOBILE_FONT_SIZE = 24
const DEFAULT_PC_FONT_SIZE = 36

let gSavedMemes

const KEYWORDS = ['politic', 'celeb', 'happy', 'cute', 'dogs', 'funny', 'baby', 'cats']

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = []

function loadImages() {
    for (let i = 26; i < 55; i++) {
        gImgs.push({
            id: i,
            url: `./meme-imgs/${i}.jpg`,
            keywords: [getRandomItem(KEYWORDS), getRandomItem(KEYWORDS), getRandomItem(KEYWORDS)],
        })
    }
    gImgs.sort((_, __) => 0.5 - Math.random())
}
var gFilteredImgs = gImgs

var gTxts = [
    'Life is better in bikini',
    'It’s loud inside my head',
    'Stop existing and start living',
    'Time doesn’t exist. Clocks exist',
    'Bureaucrats cut red tape, lengthwise',
    'Water’s like me. It’s lazy',
    'Love’s a serious mental illness',
    'Wisdom begins at the end',
    'Big Brother is watching you',
    'Some sarcasm’s best told simply',
    'Life’s a sexually transmitted disease',
    'Insomnia is my greatest inspiration',
    'Weather forecast for tonight: dark',
    'Beauty’s the purgation of superfluities',
    'Knowledge shrinks as wisdom grows',
]

var gMeme

function createMeme(id, url) {
    resizeCanvas(url)
    const marginY = isMobileDevice() ? 25 : 40
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: null,
        url: url,
        lines: [
            getDefaultTextSettings('ADD YOUR TEXT HERE', gElCanvas.width / 2, marginY),
            getDefaultTextSettings(
                'ADD YOUR TEXT HERE',
                gElCanvas.width / 2,
                gElCanvas.height - marginY
            ),
        ],
    }
    return gMeme
}

function getDefaultTextSettings(txt, x, y) {
    const fontSize = getDefaultFontSize()
    return {
        txt: txt,
        size: fontSize,
        font: 'Impact',
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        bold: false,
        italic: false,
        underline: false,
        rotateValue: 0,
        x: x,
        y: y,
    }
}
function createDownloadedMeme(src) {
    const meme = createMeme(null, src)
    meme.lines = []
    setMeme(meme)
}

function setFilteredImgs(images) {
    gFilteredImgs = images
}

function getUnfilteredImages() {
    return gImgs
}

function getFilteredImages() {
    return gFilteredImgs
}

function getMeme(id) {
    const img = gImgs.find(img => img.id === id)
    // resizeCanvas()
    gMeme = createMeme(id, img.url)
    return gMeme
}

function getCurrMeme() {
    return gMeme
}

function setMeme(meme) {
    gMeme = meme
}

function addText(txt) {
    gMeme.lines.push(getDefaultTextSettings(txt, gElCanvas.width / 2, gElCanvas.height / 2))
    console.log(gElCanvas.height, gElCanvas.width)
    renderMeme(gMeme)
}

function surpriseMeme() {
    const image = getRandomItem(gImgs)
    const linesOfText = getRandomInt(1, 3) // 3 is exclusive
    const meme = getMeme(image.id)
    meme.lines = []
    gMeme.lines.push(getDefaultTextSettings(getRandomItem(gTxts), gElCanvas.width / 2, 50))

    if (linesOfText > 1) {
        gMeme.lines.push(
            getDefaultTextSettings(getRandomItem(gTxts), gElCanvas.width / 2, gElCanvas.height - 50)
        )
    }
    setMeme(meme)
}

function getDefaultFontSize() {
    return isMobileDevice() ? DEFAULT_MOBILE_FONT_SIZE : DEFAULT_PC_FONT_SIZE
}

function loadSavedMemes() {
    gSavedMemes = loadFromStorage(SAVED_MEMES_KEY)
    if (!gSavedMemes) {
        gSavedMemes = []
    }
}

function getSavedMeme(idx) {
    return gSavedMemes[idx]
}

function getSavedMemes() {
    return gSavedMemes
}

function loadSavedMeme(meme) {
    resizeCanvas(meme.url)
    openEditor()
    // DO NOT DELETE 2 RENDER MEMES OTHERWISE THINGS BREAK :(
    renderMeme(meme)
    setMeme(meme)
    renderMeme(getCurrMeme())
}
const gExampleMemes = []
for (let i = 1; i < 5; i++) {
    gExampleMemes.push({
        id: i,
        url: `./meme-examples/${i}.png`,
        keywords: [],
    })
}

function getExampleMemeImages() {
    return gExampleMemes
}

function loadExampleMeme(id) {
    // DO NOT DELETE 2 RENDER MEMES OTHERWISE THINGS BREAK :(
    const image = gExampleMemes[id]
    const meme = createMeme(null, image.url)
    meme.lines = []
    openEditor()
    setMeme(meme)
    renderMeme(meme)
    renderMeme(getCurrMeme())
}
