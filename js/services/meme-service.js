'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = [
    { id: 1, url: './meme-imgs-square/1.jpg', keywords: ['funny', 'dog'] },
    { id: 2, url: './meme-imgs-square/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: './meme-imgs-square/3.jpg', keywords: ['funny', 'what'] },
    { id: 4, url: './meme-imgs-square/4.jpg', keywords: ['funny', 'dog'] },
    { id: 5, url: './meme-imgs-square/5.jpg', keywords: ['funny', 'dog'] },
    { id: 6, url: './meme-imgs-square/6.jpg', keywords: ['funny', 'dog'] },
    { id: 7, url: './meme-imgs-square/7.jpg', keywords: ['funny', 'what'] },
    { id: 8, url: './meme-imgs-square/8.jpg', keywords: ['funny', 'dog'] },
    { id: 9, url: './meme-imgs-square/9.jpg', keywords: ['funny', 'dog'] },
    { id: 10, url: './meme-imgs-square/10.jpg', keywords: ['funny', 'dog'] },
    { id: 11, url: './meme-imgs-square/11.jpg', keywords: ['funny', 'what'] },
    { id: 12, url: './meme-imgs-square/12.jpg', keywords: ['funny', 'dog'] },
    { id: 13, url: './meme-imgs-square/13.jpg', keywords: ['funny', 'dog'] },
    { id: 14, url: './meme-imgs-square/14.jpg', keywords: ['funny', 'dog'] },
    { id: 15, url: './meme-imgs-square/15.jpg', keywords: ['funny', 'what'] },
    { id: 16, url: './meme-imgs-square/16.jpg', keywords: ['funny', 'dog'] },
    { id: 17, url: './meme-imgs-square/17.jpg', keywords: ['funny', 'dog'] },
    { id: 18, url: './meme-imgs-square/18.jpg', keywords: ['funny', 'dog'] },
]
var gMeme

function createMeme() {
    // const { width, height } = getCanvasMetrics()
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: null,
        url: './meme-imgs-square/1.jpg',
        lines: [
            {
                txt: 'YOU KNOW NOTHING',
                size: 40,
                font: 'impact',
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                bold: true,
                italic: false,
                underline: false,
                x: gElCanvas.width / 2,
                y: 50,
            },
            {
                txt: 'JOHN SNOW',
                size: 40,
                font: 'impact',
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                bold: true,
                italic: false,
                underline: false,
                x: gElCanvas.width / 2,
                y: gElCanvas.height - 50,
            },
        ],
    }
    return gMeme
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
    gMeme.lines.push({
        txt: txt,
        size: 40,
        font: 'impact',
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
