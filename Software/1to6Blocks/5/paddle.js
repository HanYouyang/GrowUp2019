var Paddle = function(game){
    //对象名字大写
    var img = game.imageByName('paddle')
    //log('img', img)
    var o = {}
    o.image = img.images
    o.w = img.w
    o.h = img.h
    o.x = 450
    o.y = 750
    o.speed = 15
    o.move = function(x){
        if (x < 0) {
            x = 0
        }
        if (x > 1200 - o.w) {
            x = 1200 - o.w
        }
        o.x = x
    }
    o.moveLeft = function(){
        o.move(o.x - o.speed)
    }
    o.moveRight = function(){
        o.move(o.x + o.speed)
    }
    var aInb = function(x, x1, x2){
        return x >= x1 && x <= x2
    }
    o.collide = function(ball){
        //全局变量的野路子看图片的宽和高
        //判断两个图形相交的函数太大了
        var a = o
        var b = ball 
        if ( aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w) ) {
            if ( aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h) ) {
                return true
            }
        }
        return false
    }
    return o
}