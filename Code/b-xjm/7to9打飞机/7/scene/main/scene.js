class Scene extends GuaScene {
    constructor(game){
        super(game)
        this.setup()
    }
    setup(){
        //读图部分和画图部分还是要分开，避免出现找不到资源
        var game = this.game
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = GuaImage.new(game, 'cloud')
        this.sky = GuaImage.new(game, 'bullet')
        this.player = GuaImage.new(game, 'player')
        this.player.x = 100
        this.player.y = 800

        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)

        //log('elements1', this.elements)
    }
    // draw(){
    //     //父类定义好的方法子类必须注释掉避免覆盖

    //     // this.game.drawImage(this.bg)
    //     // this.game.drawImage(this.player)
    //     // this.game.context.font = '30px serif'
    //     // this.game.context.fillText('按 k 开始游戏', 90, 600)
    // }

    update(){
        this.cloud.y += 1
    }

}



// var Scene = function(game){
//     var s = {
//         game: game,
//     }
//     var score = 0
//     var paddle = Paddle(game)
//     var ball = Ball(game)//其实两个都类似所以可以鉴定形成一个类
//     var blocks = loadLevel(game, 1)
//     game.registerAction('a', function(){
//         paddle.moveLeft()//把注册的键位和更新的函数都确定了，而整个game对象内部都有监听所以可以直接行驶功能
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })

//     var enbaleDrag = false
//     window.addEventListener('mousedown', function(event){
//         var x = event.offsetX
//         var y = event.offsetY
//         if (ball.haspoint(x, y)) {
//             enbaleDrag = true
//         }
//     })
//     window.addEventListener('mousemove', function(event){
//         var x = event.offsetX
//         var y = event.offsetY
//         if (enbaleDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     window.addEventListener('mouseup', function(event){
//         enbaleDrag = false
//     })

//     s.update = function(){
//         if (paused) {
//             return
//         }
//         ball.move()
//         //在更新中设置球出界的规则而非其他内容中
//         if (ball.y > paddle.y) {
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         if(paddle.collide(ball)) {
//             ball.back()
//         }
//         for (let i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 block.kill()
//                 ball.back()//循环判断各个砖块是否被打掉
//                 score = score + 1
//             }
//         }
//     }

//     s.draw = function(){
//         //背景板
//         game.context.fillStyle = '#553'
//         game.context.fillRect(0, 0, 1200, 900)
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         for (let i = 0; i < blocks.length; i++) {
//             let block = blocks[i]
//             //log('block', block)
//             if (!block.alive) {
//                 //删除不该出现的元素
//                 let block_name = blocks.indexOf(block) 
//                 blocks.splice(block_name, 1)
//                 //log('blocks after splice')
//             } else {
//                 game.drawImage(block)
//             }
//         }
//         game.context.font = '30px serif'
//         game.context.fillText('分数：' + score, 10, 850)
//     }

//     return s
// }