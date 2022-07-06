const Jimp = require('jimp')

Jimp.read('foto.jpg', (err, image)=>{
    image
        .cover(50, 1000)
        .greyscale()
        //.contrast(0.5)
        //.blur(10)
        .write('foto-50x100-greyscale.jpg')
})