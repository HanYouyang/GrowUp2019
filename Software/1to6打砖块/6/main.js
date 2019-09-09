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
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',
        block: 'img/block2.png',
    }
    //这里不能重新定义Paused，直接让内部关于Paused的内容全部按照拆出来的函数进行运行
    var game = GuaGame.instance(100, images, function(game){
        var scene = SceneTitle.new(game)//class生成的类还必须用new
        game.runWithScene(scene)
    })
    enableDebugMode(game, true)
}
__main()