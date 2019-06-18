var log = console.log.bind(console)

var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')

var img = new Image()
img.src = 'paddle.png'//注意图片格式可能出现各种内容
log(img)
//建立之后自动调用onload，所以必须写这里面运行
img.onload = function(){
    context.drawImage(img, 0, 0)
}
    