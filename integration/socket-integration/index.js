const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const redis = require('socket.io-redis')
const jwt = require('jsonwebtoken')
const secret = 'socket.io-devpleno'

io.adapter(redis())
app.set('view engine', 'ejs')

io.use((socket, next)=>{
    console.log(socket.handshake.query)
    if(socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, secret, (err, data)=>{
            if(err){
                next(new Error('Auth failed'))
            }else{
                console.log(data)
                next()
            }
        })
    }
})

app.get('/', (req, res)=> res.render('index'))

app.get('/sendmsg', (req, res)=>{
    io.emit('msg', req.query)
    res.send({ok: true})
})

setInterval(() => {
    io.emit('msg', {msg: new Date().getTime()}) 
}, 2000);

http.listen(3000, () => console.log('running...'))