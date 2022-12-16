'use strict'

const DEFAULT_MOBILE_FONT_SIZE = 24
const DEFAULT_PC_FONT_SIZE = 36

let gSavedMemes

const KEYWORDS = ['politic', 'celeb', 'happy', 'cute', 'dogs', 'funny', 'baby', 'cats']

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = []
// var gImgs = [
//     { id: 1, url: './meme-imgs/01.jpg', keywords: ['politic', 'celebs'] },
//     { id: 2, url: './meme-imgs/02.jpg', keywords: ['happy', 'dogs', 'cute'] },
//     { id: 3, url: './meme-imgs/03.jpg', keywords: ['cute', 'dogs', 'baby'] },
//     { id: 4, url: './meme-imgs/04.jpg', keywords: ['cute', 'cats', 'happy'] },
//     { id: 5, url: './meme-imgs/05.jpg', keywords: ['baby', 'cute', 'power'] },
//     { id: 6, url: './meme-imgs/06.jpg', keywords: ['funny', 'power'] },
//     { id: 7, url: './meme-imgs/07.jpg', keywords: ['funny', 'cute', 'baby'] },
//     { id: 8, url: './meme-imgs/08.jpg', keywords: ['funny', 'power'] },
//     { id: 9, url: './meme-imgs/09.jpg', keywords: ['funny', 'baby', 'power'] },
//     { id: 10, url: './meme-imgs/10.jpg', keywords: ['politic', 'power', 'celeb'] },
//     { id: 11, url: './meme-imgs/11.jpg', keywords: ['celebs', 'power'] },
//     { id: 12, url: './meme-imgs/12.jpg', keywords: ['funny', 'power'] },
//     { id: 13, url: './meme-imgs/13.jpg', keywords: ['power', 'celebs'] },
//     { id: 14, url: './meme-imgs/14.jpg', keywords: ['power', 'celebs'] },
//     { id: 15, url: './meme-imgs/15.jpg', keywords: ['power', 'celebs'] },
//     { id: 16, url: './meme-imgs/16.jpg', keywords: ['funny'] },
//     { id: 17, url: './meme-imgs/17.jpg', keywords: ['celebs', 'politic'] },
//     { id: 18, url: './meme-imgs/18.jpg', keywords: ['funny', 'cute'] },
//     { id: 19, url: './meme-imgs/19.jpg', keywords: ['power', 'celebs'] },
//     { id: 20, url: './meme-imgs/20.jpg', keywords: ['funny'] },
//     { id: 21, url: './meme-imgs/21.jpg', keywords: ['celebs', 'politic'] },
//     { id: 22, url: './meme-imgs/22.jpg', keywords: ['funny', 'cute'] },
//     { id: 23, url: './meme-imgs/23.jpg', keywords: ['power', 'celebs'] },
//     { id: 24, url: './meme-imgs/24.jpg', keywords: ['funny'] },
//     { id: 25, url: './meme-imgs/25.jpg', keywords: ['celebs', 'politic'] },
// ]

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
    // const { width, height } = getCanvasMetrics()
    // resize canvas
    // console.log('BEFORE resizeCanvas()')
    // console.log(gElCanvas.height)
    // console.log(gElCanvas.height)
    // console.log('AFTER resizeCanvas()')
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
    // if (gFilteredImgs == null || gFilteredImgs.length === 0) return gImgs
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
