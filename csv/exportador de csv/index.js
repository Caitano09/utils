const mysql = require('mysql')
const fs = require('fs')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro'
})

const writable = fs.createWriteStream('../pessoas.csv')

writable.write('id,nome\n', () => {
    connection.connect((err) => {
        const query = connection.query('select * from pessoas')
        query.on('result', (row) => {
            connection.pause()
            const data = row.id + ',' + row.nome + '\n'
            writable.write(data, () => {
                connection.resume()
                //console.log('written')
            })
        })
        query.on('end', () => {
            writable.end()
            connection.end()
        })
    })
})