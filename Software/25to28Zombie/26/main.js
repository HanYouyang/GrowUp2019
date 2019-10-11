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
var GuaAddAnimation = function(images, animationZombie){
    let a = animationZombie
    let pathFormat = a.pathFormat
    let keyName = a.name

    for (let action of a.actions) {
        let name = action.name
        let numberOfFrames = action.numberOfFrames
        // log('name', name)
        // log('numberOfFrames', numberOfFrames)
        // log('pathFormat', pathFormat)
        // log('pathFormat.replace([action], name)', pathFormat.replace('[action]', name))
        // log('pathFormat.replace([action], name).pathFormat.replace([action], name)', pathFormat.replace('[action]', name).replace('[action]', name))
        let p = pathFormat.replace('[action]', name).replace('[action]', name)
        
        for (let i = 1; i < numberOfFrames; i++) {
            // var index = '0' + '0'.repeat(String(a.numberOfFrames).length - String(i).length) + String(i)
            if (numberOfFrames < 10) {
                var index = '0'.repeat(String(numberOfFrames).length) + String(i)
            } else {
                var index = '0'.repeat(String(numberOfFrames).length - String(i).length) + String(i)
            }
            let key = action.name + index
            let value = p.replace('[index]', index)
            images[key] = value
            // log('images', images)
        }
    }
    
}
var __main = function(){
    let animationZombie = {
        // numberOfFrames: 7,//与僵尸图片数目相等
        name: 'zombieBasic',
        pathFormat:'img/zombie/[action]/z_1_[action]_[index].png',
        actions: [
            {
                name: 'walk',
                numberOfFrames: 7,
            },
            {
                name: 'attack',
                numberOfFrames: 11,
            },
        ]
    }
    let images = {
        // bg: 'img/bird/bg.png',//这个不能去除，因为还是生成背景  
        // t1: 'img/mario/t1.png',
        // gun: 'img/tower/gun.png',
        // soldier: 'img/tower/soldier.png',
        // zombieWalk01:'img/zombie/walk/z_1_01.png',
    }
    GuaAddAnimation(images, animationZombie)
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