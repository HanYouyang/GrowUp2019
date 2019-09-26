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
            // blocks = loadLevel(game, Number(k))
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
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        enemy5: 'img/enemy5.png',
        enemy6: 'img/enemy6.png',
        enemy7: 'img/enemy7.png',
        fire: 'img/fire.png',
        walk1: 'img/move/Walk (1).png',
        walk2: 'img/move/Walk (2).png',
        walk3: 'img/move/Walk (3).png',
        walk4: 'img/move/Walk (4).png',
        walk5: 'img/move/Walk (5).png',
        walk6: 'img/move/Walk (6).png',
        walk7: 'img/move/Walk (7).png',
        walk8: 'img/move/Walk (8).png',
        walk9: 'img/move/Walk (9).png',
        walk10: 'img/move/Walk (10).png',
        walk11: 'img/move/Walk (11).png',
        walk12: 'img/move/Walk (12).png',
        walk13: 'img/move/Walk (13).png',
        walk14: 'img/move/Walk (14).png',
        walk15: 'img/move/Walk (15).png',
        walk16: 'img/move/Walk (16).png',
        walk17: 'img/move/Walk (17).png',
        walk18: 'img/move/Walk (18).png',
        walk19: 'img/move/Walk (19).png',
        walk20: 'img/move/Walk (20).png',
        idle1: 'img/move/Idle (1).png',
        idle2: 'img/move/Idle (2).png',
        idle3: 'img/move/Idle (3).png',
        idle4: 'img/move/Idle (4).png',
        idle5: 'img/move/Idle (5).png',
        idle6: 'img/move/Idle (6).png',
        idle7: 'img/move/Idle (7).png',
        idle8: 'img/move/Idle (8).png',
        idle9: 'img/move/Idle (9).png',
        idle10: 'img/move/Idle (10).png',
        idle11: 'img/move/Idle (11).png',
        idle12: 'img/move/Idle (12).png',
        idle13: 'img/move/Idle (13).png',
        idle14: 'img/move/Idle (14).png',
        idle15: 'img/move/Idle (15).png',
        idle16: 'img/move/Idle (16).png',
        //flappy bird
        bg: 'img/bird/bg.png',
        ground: 'img/bird/ground.png',
        b1: 'img/bird/b1.png',
        b2: 'img/bird/b2.png',
        b3: 'img/bird/b3.png',
    }
    //这里不能重新定义Paused，直接让内部关于Paused的内容全部按照拆出来的函数进行运行
    var game = GuaGame.instance(100, images, function(game){
        // var scene = Scene.new(game)//class生成的类还必须用new
        var scene = SceneTitle.new(game)//class生成的类还必须用new
        game.runWithScene(scene)
    })
    enableDebugMode(game, true)
}
__main()