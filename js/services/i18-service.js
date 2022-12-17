'use strict'

var gTrans = {
    'meme-generator-title': {
        en: 'Meme Generator',
        he: 'מימ גנרטור',
    },
    'share-btn': {
        en: 'Share',
        he: 'שתף',
    },
    'export-project': {
        en: 'Export Project',
        he: 'יצוא פרוייקט',
    },
    'trending-now': {
        en: 'Trending Now',
        he: 'החמים הביותר',
    },
    'surprise-btn': {
        en: 'Surpirse Me',
        he: 'הפתע אותי',
    },
    rating: {
        en: 'Rating',
        he: 'דרוג',
    },
    'create-new-book': {
        en: 'Create new book',
        he: 'צור ספר חדש',
    },
    books: {
        en: 'Books',
        he: 'ספרים',
    },
    'shopping-cart': {
        en: 'Shopping Cart',
        he: 'עגלת קניות',
    },
    read: {
        en: 'Read',
        he: 'קרא',
    },
    update: {
        en: 'Update',
        he: 'עדכן',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
    },
    // 'next-btn': {
    //     en: 'Next',
    //     he: 'המשך',
    // },
    // 'back-btn': {
    //     en: 'Back',
    //     he: 'חזור',
    // },
    'book-id': {
        en: 'Id',
        he: 'תז',
    },
    'book-title': {
        en: 'Title',
        he: 'שם הספר',
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'book-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'add-book-title': {
        en: 'Adding a new book!',
        he: 'מוסיף ספר חדש!',
    },
    'add-book-name-label': {
        en: 'Enter Book Name:',
        he: ':הכנס את שם הספר',
    },
    'add-book-price-label': {
        en: 'Enter Book Price:',
        he: 'הכנס את מחיר הספר:',
    },
    'add-book-btn': {
        en: 'Add',
        he: 'הוסף',
    },
}
const gLTR = ['en']
const gRTL = ['he']
var gCurrLang = 'en'

function getTrans(transKey) {
    // done: if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en
    return translation
}

function doTrans() {
    // done:
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        // done: support placeholder
        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function getLang() {
    return gCurrLang
}
