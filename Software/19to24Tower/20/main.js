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

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}
var __main = function(){
    //变量基本名称
    var images = {
        bg: 'img/bird/bg.png',//这个不能去除，因为还是生成背景
        
        t1: 'img/mario/t1.png',
        t2: 'img/mario/t2.png',
        t3: 'img/mario/t3.png',
        t4: 'img/mario/t4.png',

        gun: 'img/tower/gun.png',

    }

    window.paused = false
    window.offset = 32784//上来就设置的
    let drawOffset = 32784//上来就设置的
    log('drawOffset', drawOffset)
    let request = {
        url: 'mario.nes',
        callback(r) {
            //加window也是改成全局变量的方式
            window.bytes = new Uint8Array(r)
            log('bytes', bytes)
            //这里不能重新定义Paused，直接让内部关于Paused的内容全部按照拆出来的函数进行运行
            var game = GuaGame.instance(100, images, function(game){
                // var scene = Scene.new(game)//class生成的类还必须用new
                var scene = SceneTitle.new(game)//class生成的类还必须用new
                // var scene = SceneEditor.new(game)//class生成的类还必须用new
                game.runWithScene(scene)
            })
            enableDebugMode(game, true)
        },
    }
    ajax(request)



}
__main()