'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = [
    { id: 1, url: '../../meme-imgs-square/1.jpg', keywords: ['funny', 'dog'] },
    { id: 2, url: '../../meme-imgs-square/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: '../../meme-imgs-square/3.jpg', keywords: ['funny', 'what'] },
    { id: 4, url: '../../meme-imgs-square/4.jpg', keywords: ['funny', 'dog'] },
]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    url: '../../meme-imgs-square/1.jpg',
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            font: 'impact',
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
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

function addText(txt) {
    gMeme.lines.push({
        txt: txt,
        size: 40,
        font: 'impact',
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
    })
    renderMeme(gMeme)
}
