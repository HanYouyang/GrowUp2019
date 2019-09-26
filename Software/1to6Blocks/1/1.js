//调试基本工具
var log = console.log.bind(console)

//变量基本名称
var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
var x = 150
var y = 200
var speed = 5
var leftDown = false
var rightDown = false

//image
var img = new Image()
img.src = 'paddle.png'//注意图片格式可能出现各种内容
//log(img)
//建立之后自动调用onload，所以必须写这里面运行
img.onload = function(){
    context.drawImage(img, x, y)
}

//events
window.addEventListener('keydown', function(event){
    //log(event)
    //动画的原理就是不断刷新，你需要先清空画面之后获得你新的坐标，需要用到你的x和y，注意像素运行的状态不能太慢
    var k = event.key
    if (k == 'a'){
        leftDown = true
        // x = x - 10
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.drawImage(img, x, y)
    } else if (k == 'd') {
        rightDown = true
    }
})
window.addEventListener('keyup', function(event){
    //log(event)
    //这次的事件是响应键盘上面的键回弹之后改变状态让“自动化”变得可控
    var k = event.key
    if (k == 'a'){
        leftDown = false
    } else if (k == 'd') {
        rightDown = false
    }
})
setInterval(() => {
    //这次换用监听事件状态的思路而不是主动更新事件来调整思路，这样更加“自动化”如我们想要
    //update x and y
    //监听改变的状态，如果状态变了就刷新图像到新位置
    if (leftDown) {
        x = x - speed
    } else if (rightDown){
        x = x + speed
    }
    //接下来还要为了让不超出区域进行判断
    //check x

    //darw
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, x, y)
}, 1000/30);
