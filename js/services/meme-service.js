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
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    url: './meme-imgs-square/1.jpg',
    lines: [
        {
            txt: 'You Know Nothing',
            size: 40,
            font: 'impact',
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            bold: false,
            italic: false,
            underline: false,
            x: 275,
            y: 50,
        },
        {
            txt: 'John Snow',
            size: 40,
            font: 'impact',
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            bold: false,
            italic: false,
            underline: false,
            x: 275,
            y: 500,
        },
    ],
}

function getImages() {
    return gImgs
}

function getMeme(id) {
    const img = gImgs.find(img => img.id === id)
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
        bold: false,
        italic: false,
        underline: false,
        x: 275,
        y: 275,
    })
    renderMeme(gMeme)
}
