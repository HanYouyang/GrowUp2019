const config = {
    player_speed: 10,
    bullet_speed: 5,
    cloud_speed: 1,
    enemy_speed: 5,
    fire_coolDown: 10,
}


class Bullet extends GuaImage {
    constructor(game){
        super(game, 'bullet')
        this.setup()
    }
    setup(){
        this.speed = config.bullet_speed
        // this.speed = 1
    }
    update(){
        // this.speed = config.bullet_speed
        this.y -= this.speed
    }

}
class Player extends GuaImage {
    constructor(game){
        super(game, 'player')
        this.setup()
    }
    setup(){
        this.speed = 7
        this.coolDown = config.fire_coolDown
    }
    update(){
        this.speed = config.player_speed
        if (this.coolDown > 0) {
            this.coolDown -= 1
        }
    }
    moveLeft(){
        this.x -= this.speed
    }
    moveRight(){
        this.x += this.speed
    }
    moveUp(){
        this.y -= this.speed
    }
    moveDown(){
        this.y += this.speed
    }
    fire(){
        if (this.coolDown == 0) {
            this.coolDown = config.fire_coolDown

            var b = Bullet.new(this.game)
            b.x = this.x + this.w / 2
            b.y = this.y
            this.scene.addElement(b)
        }
    }

}

class Enemy extends GuaImage {
    constructor(game){
        var type = randomBetween(0, 7)
        var enemyName = 'enemy' + type
        super(game, enemyName)
        this.setup()
    }
    setup(){
        this.speed = randomBetween(1, 3)
        this.x = randomBetween(0, 300)
        this.y = randomBetween(0, 100)
    }
    update(){
        this.speed = config.enemy_speed
        this.y += this.speed
        if (this.y > 800){
            this.setup()
        }
    }
}
class Cloud extends GuaImage {
    constructor(game){
        super(game, 'cloud')
        this.setup()
    }
    setup(){
        this.speed = 1
        this.x = randomBetween(0, 300)
        this.y = randomBetween(0, 10)
    }
    update(){
        this.y += this.speed
        if (this.y > 800){
            this.setup()
        }
    }
    debug(){
        this.speed = config.cloud_speed
    }
}
class Scene extends GuaScene {
    constructor(game){
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup(){
        this.numberOfEnemy = 10
        //读图部分和画图部分还是要分开，避免出现找不到资源
        var game = this.game
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Cloud.new(game)
        //this.bullet = GuaImage.new(game, 'bullet')
        //this.player = GuaImage.new(game, 'player')
        this.player = Player.new(game)//仍然需要注册事件
        this.player.x = 100
        this.player.y = 800

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //log('elements1', this.elements)
        this.addEnemies()
    }
    addEnemies(){
        var allEnemy = []
        for (let i = 0; i < this.numberOfEnemy; i++) {
            const e = Enemy.new(this.game)
            allEnemy.push(e)
            this.addElement(e)
        }
        this.enemies = allEnemy
    }
    setupInputs(){
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()//把注册的键位和更新的函数都确定了，而整个game对象内部都有监听所以可以直接行驶功能
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()//把注册的键位和更新的函数都确定了，而整个game对象内部都有监听所以可以直接行驶功能
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }
    update(){
        super.update()
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