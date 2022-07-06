const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const compression = require('compression')

const largeObject = []
for(let i=0; i < 10000; i++){
    largeObject.push({
        name: 'Daniel',
        address: 'addr',
        anotherField: 'aaaaaaaa'
    })
}

app.use(compression())

app.get('/', (req,res)=> {
    res.header('Cache-control', 'public max-age=3600')
    res.send(largeObject)
})

app.listen(port, ()=> console.log('listening port '+ port))