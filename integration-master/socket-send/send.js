const request = require('request-promise')
request('http://localhost:3000/sendmsg?msg=from node')
    .then(console.log('sent'))