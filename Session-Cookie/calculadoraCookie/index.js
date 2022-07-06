const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    let contas = []

    if ('contas' in req.cookies) {
        contas = req.cookies.contas
    }

    res.render('index', {
        contas
    })
})

app.post('/calc', (req, res) => {
    const { num1, num2, op } = req.body
    let total = 0
    let contas = []

    if (op === '+') {
        total = parseFloat(num1) + parseFloat(num2)
    } else if (op === '-') {
        total = parseFloat(num1) - parseFloat(num2)
    } else if (op === '*') {
        total = parseFloat(num1) * parseFloat(num2)
    } else if (op === '/') {
        total = parseFloat(num1) / parseFloat(num2)
    }
    if ('contas' in req.cookies) {
        contas = req.cookies.contas
    }
    contas.push({
        num1, num2, op, total
    })

    res.cookie('contas', contas, { /*expires:*/ maxAge: 1000 })
    res.redirect('/')
})

app.listen(port, () => console.log('running on port ' + port))

