var Ball = function(){
    //对象名字大写
    var image = imageFromPath('ball.png')
    var o = {
        image: image,
        x: 300,
        y: 400,
        speedX: 15,//JSON当然强制最后不加
        speedY: 15,
        fired: false,
        paused: false,
    }
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
    return o
}
