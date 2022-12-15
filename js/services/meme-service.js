'use strict'

const DEFAULT_MOBILE_FONT_SIZE = 24
const DEFAULT_PC_FONT_SIZE = 36
// politic, dog, celeb, happy, cute, cat, power
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = [
    { id: 1, url: './meme-imgs-square/1.jpg', keywords: ['politic', 'dog', 'celeb'] },
    { id: 2, url: './meme-imgs-square/2.jpg', keywords: ['happy', 'dog', 'cute'] },
    { id: 3, url: './meme-imgs-square/3.jpg', keywords: ['cute', 'dog', 'happy'] },
    { id: 4, url: './meme-imgs-square/4.jpg', keywords: ['cute', 'cat', 'happy'] },
    { id: 5, url: './meme-imgs-square/5.jpg', keywords: ['funny', 'cute', 'power'] },
    { id: 6, url: './meme-imgs-square/6.jpg', keywords: ['funny', 'power'] },
    { id: 7, url: './meme-imgs-square/7.jpg', keywords: ['funny', 'cute', 'happy'] },
    { id: 8, url: './meme-imgs-square/8.jpg', keywords: ['funny', 'power'] },
    { id: 9, url: './meme-imgs-square/9.jpg', keywords: ['funny', 'cute', 'power'] },
    { id: 10, url: './meme-imgs-square/10.jpg', keywords: ['funny', 'power', 'celeb'] },
    { id: 11, url: './meme-imgs-square/11.jpg', keywords: ['celeb', 'power'] },
    { id: 12, url: './meme-imgs-square/12.jpg', keywords: ['funny', 'power'] },
    { id: 13, url: './meme-imgs-square/13.jpg', keywords: ['funny', 'dog'] },
    { id: 14, url: './meme-imgs-square/14.jpg', keywords: ['funny', 'dog'] },
    { id: 15, url: './meme-imgs-square/15.jpg', keywords: ['funny', 'what'] },
    { id: 16, url: './meme-imgs-square/16.jpg', keywords: ['funny', 'dog'] },
    { id: 17, url: './meme-imgs-square/17.jpg', keywords: ['funny', 'dog'] },
    { id: 18, url: './meme-imgs-square/18.jpg', keywords: ['funny', 'dog'] },
]

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
// gImgs.sort((_, __) => 0.5 - Math.random())
var gMeme

function createMeme() {
    // const { width, height } = getCanvasMetrics()
    const fontSize = getDefaultFontSize()
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: null,
        url: './meme-imgs-square/1.jpg',
        lines: [
            getDefaultTextSettings('YOU KNOW NOTHING', gElCanvas.width / 2, 50),
            getDefaultTextSettings(
                'JOHN SNOW',
                gElCanvas.width / 2,
                gElCanvas.height - 50
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
        bold: true,
        italic: false,
        underline: false,
        x: x,
        y: y,
    }
}
function createDownloadedMeme(src) {
    gMeme = {
        selectedImgId: null,
        selectedLineIdx: null,
        url: src,
        lines: [],
    }
}
function getImages() {
    return gImgs
}

function getMeme(id) {
    const img = gImgs.find(img => img.id === id)
    gMeme = createMeme()
    gMeme.selectedImgId = id
    gMeme.url = img.url
    return gMeme
}

function getCurrMeme() {
    return gMeme
}

function setMeme(meme) {
    gMeme = meme
}

function addText(txt) {
    const fontSize = getDefaultFontSize()
    gMeme.lines.push({
        txt: txt,
        size: fontSize,
        font: 'Impact',
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        bold: true,
        italic: false,
        underline: false,
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2,
    })
    console.log(gElCanvas.height, gElCanvas.width)
    renderMeme(gMeme)
}

function surpriseMeme() {
    const image = getRandomItem(gImgs)
    const linesOfText = getRandomInt(1, 3) // 3 is exclusive

    const fontSize = getDefaultFontSize()
    gMeme = {
        selectedImgId: image.id,
        selectedLineIdx: null,
        url: image.url,
        lines: [],
    }
    gMeme.lines.push({
        txt: getRandomItem(gTxts),
        size: fontSize,
        font: 'Impact',
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        bold: true,
        italic: false,
        underline: false,
        x: gElCanvas.width / 2,
        y: 50,
    })
    if (linesOfText > 1) {
        gMeme.lines.push({
            txt: getRandomItem(gTxts),
            size: fontSize,
            font: 'Impact',
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            bold: true,
            italic: false,
            underline: false,
            x: gElCanvas.width / 2,
            y: gElCanvas.height - 50,
        })
    }
}

function getDefaultFontSize() {
    return isMobileDevice() ? DEFAULT_MOBILE_FONT_SIZE : DEFAULT_PC_FONT_SIZE
}
