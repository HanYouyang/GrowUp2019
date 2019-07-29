var Paddle = function(game){
    //对象名字大写
    var img = game.imageByName('paddle')
    log('img', img)
    var o = {}
    o.image = img.images
    log('o.image', o.image)
    // var o = {
    //     image: image,
    //     x: 450,
    //     y: 750,
    //     speed: 15,//JSON当然强制最后不加
    // }
    o.x = 450
    o.y = 750
    o.speed = 15
    o.move = function(x){
        if (x < 0) {
            x = 0
        }
        if (x > 1200 - o.image.width) {
            x = 1200 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function(){
        o.move(o.x - o.speed)
    }
    o.moveRight = function(){
        o.move(o.x + o.speed)
    }
    o.collide = function(ball){
        //全局变量的野路子看图片的宽和高
        //判断两个图形相交的函数太大了
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                log('相撞')
                return true
            }
        }
        return false
    }
    return o
}