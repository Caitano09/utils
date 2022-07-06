const express = require('express')
const app = express()
const PdfPrinter = require('pdfmake')
const fs = require('fs')
const port = process.env.PORT || 3000

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Bold.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        boldItalics: 'fonts/Roboto-BoldItalic.ttf',
    }
}

const lines = []
lines.push([
    {
        text: 'Nome',
        style: 'header',
    },
    {
        text: 'Email',
        style: 'header',
    },
    {
        text: 'Situação',
        style: 'header',
    }])

for (let i = 0; i < 300; i++) {
    let ativo = 'ativo'
    if (i % 2 == 0) {
        ativo = { text: 'Inativo', style: 'inativo' }
    }
    lines.push(['daniel', 'daniel@gmail.com', ativo])
}

const printer = new PdfPrinter(fonts)

const docDefinition = {
    content: [
        {
            image: 'images/logo.png',
            fit: [100,100]
        },
        { text: 'Fullstack Master' },
        {
            table: {
                widths: ['*', '*', 100],
                body: lines
            }
        }
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
        },
        inativo: {
            fontSize: 18,
            bold: true
        }
    },
    footer: (page, pages) => {
        return {
            columns: [
                'Este documento é parte integrante do Fullstack Master',
                {
                    alignment: 'right',
                    text:[
                        { text: page.toString(), italics: true},
                        ' de ',
                        {text: pages.toString(), italics: true}
                    ]
                }
            ],
            margin: [40, 0] 
        }
    }
}

app.get('/get/:name', (req, res) => {
    const pdf = printer.createPdfKitDocument({
        content: 'Ola ' + req.params.name        
    })
    res.header('Content-disposition', 'inline; filename=meu-pdf.pdf')
    res.header('Content-type', 'application/pdf')
    pdf.pipe(res)
    pdf.end()

})

/*const pdf = printer.createPdfKitDocument(docDefinition)
pdf.pipe(fs.createWriteStream('doc.pdf'))
pdf.end()*/

app.listen(port, ()=> console.log('pdf running on port: ', port))

