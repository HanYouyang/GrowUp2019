var Block = function(game, p){
    //对象名字大写
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        alive: true,
        lives: p[2] || 1,
    }
    o.image = img.images
    o.w = img.w
    o.h = img.h
    o.kill = function() {
        log('block被消除了!现在生命为：', o.lives)
        log('现在的生命情况是o.alive：', o.alive)
        o.lives = o.lives - 1
        if (o.lives < 1) {
            o.alive = false
        }
    }
    o.collide = function(b){
        //log('ball撞到了一个block!')//这个地方一直在判断并且不断刷新，原因还是在于这个函数是不停要更新判断的，所以不能认为是错误
        //全局变量的野路子看图片的宽和高
        //判断两个图形相交的函数太大了
        //判断相离取反可能更简单一点，但是这里确实是判断两个图形的点是不是在对方内部
        //这种情况下面写的是b在a里面，但是还是可能a在b里面，所以写一个函数出来比较好，同时有a和b
        return rectIntersects(o, b) || rectIntersects(b, o)
    }
    return o
}