'use strict'

let gUserPref = { format: 'jpeg', lang: 'english' }

function getUserPref() {
    return gUserPref
}

function setUserPref(userPref) {
    gUserPref = userPref
}
