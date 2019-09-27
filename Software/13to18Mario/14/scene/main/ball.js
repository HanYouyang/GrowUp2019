var Ball = function(game){
    //对象名字大写
    // var image = imageFromPath('ball.png')
    var img = game.imageByName('ball')//通过我们直接拿到对象来建立自己的一个对象和其属性
    var o = {}
    o.image = img.images
    o.x = 300
    o.y = 400
    o.speedX = 15
    o.speedY = 15
    o.fired = false
    o.w = img.w
    o.h = img.h

    o.fire = function(){
        o.fired = true
    }
    o.move = function(){
        if (o.fired) {
            if (o.x < 0 || o.x > 1200) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 900) {
                o.speedY = -o.speedY    
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.back = function() {
        o.speedY *= -1
    }
    o.haspoint = function(x, y){
        var xIn = x >= o.x && x < o.x + o.w
        var yIn = y >= o.y && y < o.y + o.h
        return xIn && yIn
    }
    return o
}