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
    Search: {
        en: 'Search',
        he: 'חיפוש',
    },
    media: {
        en: 'Media',
        he: 'מדיה',
    },
    text: {
        en: 'Text',
        he: 'טקסט',
    },
    Stickers: {
        en: 'Stickers',
        he: 'סטיקרס',
    },
    Saved: {
        en: 'Saved Memes',
        he: 'מימס שמורים',
    },
    Examples: {
        en: 'Examples',
        he: 'דוגמאות',
    },
    'input-placeholder': {
        en: 'When you realize...',
        he: 'כשאתה קולט...',
    },
    'add-text-btn': {
        en: 'Add Text',
        he: 'הוסף טקסט',
    },
    'font-label': {
        en: 'Font',
        he: 'פונט',
    },
    'text-color': {
        en: 'Text Color',
        he: 'צבע הטקסט',
    },
    'text-outline': {
        en: 'Text Outline',
        he: 'מתווה הטקסט',
    },
    'default-settings-btn': {
        en: 'Default Settings',
        he: 'הגדרות ברירת מחדל',
    },
    'popular-stickers': {
        en: 'Popular',
        he: 'הפופולריים',
    },
    'emojis-label': {
        en: 'Emojis',
        he: "אימוג'ים",
    },
    'search-memes-input': {
        en: 'Search Memes',
        he: 'חפש מימס',
    },
    'popular-searches': {
        en: 'Popular Searches',
        he: 'חיפושים פופולריים',
    },
    dogs: {
        en: 'Dogs',
        he: 'כלבים',
    },
    cats: {
        en: 'Cats',
        he: 'חתולים',
    },
    funny: {
        en: 'Funny',
        he: 'מצחיק',
    },
    politic: {
        en: 'Politic',
        he: 'פוליטי',
    },
    happy: {
        en: 'Happy',
        he: 'שמח',
    },
    celeb: {
        en: 'Celeb',
        he: 'סלב',
    },
    cute: {
        en: 'Cute',
        he: 'חמוד',
    },
    baby: {
        en: 'Baby',
        he: 'תינוק',
    },
    'upload-btn': {
        en: 'Upload',
        he: 'העלאה',
    },
    'empty-saved-memes-header': {
        en: "Haven't Saved Any Memes Yet?",
        he: 'עדיין לא שמרת שום מימ?',
    },
    'empty-saved-memes-p': {
        en: 'This is where your memes should be. Design it. Save it. Laugh at it!',
        he: 'פה אמורים להיות המימס שלך. תעצב אותם. תשמור אותם. תצחק מהם!',
    },
    'try-a-sample-btn': {
        en: 'Try A Sample',
        he: 'נסה דוגמה',
    },
    'example-memes-header': {
        en: 'Need Some Inspiration?',
        he: 'צריך קצת השראה?',
    },
    'example-memes-header-p': {
        en: 'Take a look at the hottest memes right now!',
        he: 'תן מבט במימס הכי חמים עכשיו!',
    },
    settings: {
        en: 'Settings',
        he: 'הגדרות',
    },
    'image-type': {
        en: 'Image Type:',
        he: 'סוג תמונה:',
    },
    language: {
        en: 'Language:',
        he: 'שפה:',
    },
    oops: {
        en: 'Oops!',
        he: 'אופס!',
    },
    'empty-gallery-header': {
        en: "We can't seem to find the meme you're looking for.",
        he: 'אנחנו לא מצליחים למצוא את המימ שחיפשת.',
    },
    'empty-gallery p': {
        en: 'Here are some popular searches instead:',
        he: 'הנה כמה חיפושיים פופולריים במקום:',
    },
    'help-module-header': {
        en: 'Need Some Help?',
        he: 'צריך עזרה?',
    },
    'help-module-p': {
        en: 'You can contact me via one of my socials',
        he: 'ניתן ליצור איתי קשר דרך הרשתות החברתיות',
    },
    'full-name': {
        en: 'Yaron Shapira',
        he: 'ירון שפירא',
    },
    funny: {
        en: 'Funny',
        he: 'מצחיק',
    },
}
const gLTR = ['en']
const gRTL = ['he']
var gCurrLang = 'en'

function getTrans(transKey) {
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    var translation = key[gCurrLang]

    if (!translation) translation = key.en
    return translation
}

function doTrans() {
    //    get the data-trans and use getTrans to replace the innerText
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        // support placeholder
        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function getLang() {
    return gCurrLang
}
