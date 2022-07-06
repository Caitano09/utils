const express = require('express')
const app = express()
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const redis = require('redis')
redisClient = redis.createClient() 

let database


const findDB = (db, collectionName) =>{
    return new Promise((resolve, reject)=>{
        const collection = db.collection(collectionName)
        const cursor = collection.find({})
        const data = []
        cursor.forEach(doc => data.push(doc), () => resolve(data))
    })
}

const getCache = (key) =>{
    return new Promise((resolve, reject)=>{
        redisClient.get(key, (err, value)=>{
            if(err){
                reject(err)
            }else{
                resolve(value)
            }
        })
    })
}

const setCache = (key, value) =>{
    return new Promise((resolve, reject)=>{
        redisClient.set(key, value, 'EX', 10, err =>{
            if(err){
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}

app.get('/', async(req, res)=> {
    const value = await getCache('listUsers1')
    if(value){
        res.send(JSON.parse(value))
        console.log('cache hit')
    } else{
    const data = await findDB(database, 'users') 
    setCache('listUsers1', JSON.stringify(data))
    console.log('cache miss')
    res.send(data)
    }
})

MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
    database = client.db('noticias')
    app.listen(3000, ()=> console.log('listening...'))
})


