'use strict'

let gUserPref = { format: 'jpeg', lang: 'en' }

function getUserPref() {
    return gUserPref
}

function setUserPref(userPref) {
    gUserPref = userPref
}
