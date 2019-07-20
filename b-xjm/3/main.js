var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var l = level[i]
        var b = Block(game, l)
        blocks.push(b)
    }
    return blocks
}
var blocks = []
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            paused = !paused
        } else if ('1234567'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        } 
    })
    document.querySelector('#id-input-speed').addEventListener('input', function(event){
        var input = event.target
        //log(event, input.value)
        window.fps = Number(input.value)
    })
}
var __main = function(){
    //变量基本名称
    var images = {
        ball: 'ball.png',
        paddle: 'paddle.png',
        block: 'block2.png',
    }
    //log('images', images)
    //var paused = false //这里不能重新定义Paused，直接让内部关于Paused的内容全部按照拆出来的函数进行运行
    var game = GuaGame(100, images, function(g){
        // log('g', g)
        // log('game', game)
        var score = 0
        var paddle = Paddle(game)
        var ball = Ball(game)//其实两个都类似所以可以鉴定形成一个类
        blocks = loadLevel(game, 1)
        //log('blocks', blocks)
        game.registerAction('a', function(){
            paddle.moveLeft()//把注册的键位和更新的函数都确定了，而整个game对象内部都有监听所以可以直接行驶功能
        })
        game.registerAction('d', function(){
            paddle.moveRight()
        })
        game.registerAction('f', function(){
            ball.fire()
        })
        game.update = function(){
            if (paused) {
                return
            }
            ball.move()
            if(paddle.collide(ball)){
                ball.back()
            }
            for (let i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.collide(ball)) {
                    block.kill()
                    ball.back()//循环判断各个砖块是否被打掉
                    score = score + 1
                }
            }
        }
        game.draw = function(){
            game.drawImage(paddle)
            game.drawImage(ball)
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i]
                //log('block', block)
                if (!block.alive) {
                    //删除掉现有的元素情况
                    let block_name = blocks.indexOf(block) 
                    blocks.splice(block_name, 1)
                    //log('blocks after splice')
                } else {
                    game.drawImage(block)
                }
            }

            game.context.font = '30px serif'
            game.context.fillText('分数：' + score, 10, 850)
        }
    })
    enableDebugMode(game, true)
}
__main()