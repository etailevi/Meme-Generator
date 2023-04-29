'use strict'

function getRandomId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''

    for (let i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return id
}