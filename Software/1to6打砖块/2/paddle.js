var Paddle = function(){
    //对象名字大写
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 450,
        y: 750,
        speed: 15,//JSON当然强制最后不加
    }
    o.move = function(x) {
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
        // 这样两个就不撞了 return rectIntersects(o, ball) || rectIntersects(ball, o)
    }
    return o
}