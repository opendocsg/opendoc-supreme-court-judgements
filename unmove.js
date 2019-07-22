/*
    Place this file in root folder of repo
    npm i glob gray-matter
    node unmove
*/

const glob = require('glob')
const replace = require('replace-in-file')
const fs = require('fs')
const path = require('path')

replace.sync({
    files: path.join(__dirname, "./*/*.md"),
    from: 'layout: single',
    to: '',
    countMatches: true,
}).then(() => {
    console.log('done')
})