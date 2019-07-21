/*
    Place this file in root folder of repo
    npm i glob gray-matter
    node embed-front-matter
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
            let frontMatter = { layout: 'single' }
            const indexPath = path.join(path.dirname(file), 'index.md')
            if (fs.existsSync(indexPath)) {
                frontMatter = { ...matter.read(indexPath).data, ...frontMatter, }
            }
            const { content, data: currentFrontMatter } = matter.read(file)
            frontMatter = { ...currentFrontMatter, ...frontMatter }
            const output = matter.stringify(content, frontMatter)
            fs.writeFileSync(file, output)
            if (fs.existsSync(indexPath)) {
                fs.unlinkSync(indexPath)
            }
            fileCount++
            console.log(`Done: ${file}`)
        } catch (e) {
            console.log(`Error: ${file}`, e)
        }
        console.log(`(${fileCount}/${totalFiles})`)
    })
})