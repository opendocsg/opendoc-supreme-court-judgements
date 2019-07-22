/*
    Place this file in root folder of repo
    npm i glob gray-matter
    node unmove
*/

const glob = require('glob')
const matter = require('gray-matter');
const fs = require('fs')
const path = require('path')

glob("/*/report.md", { root: __dirname }, function (er, files) {
    const totalFiles = files.length
    let fileCount = 0
    files.forEach((file) => {
        try {
            const indexPath = path.join(path.dirname(file), 'index.md')
            const { data: frontMatter } = matter.read(file)
            const output = matter.stringify('', frontMatter)
            fs.writeFileSync(indexPath, output)
            fileCount++
        } catch (e) {
            console.log(`Error: ${file}`, e)
            console.log(`(${fileCount}/${totalFiles})`)
        }
    })
    console.log(`(${fileCount}/${totalFiles})`)
})