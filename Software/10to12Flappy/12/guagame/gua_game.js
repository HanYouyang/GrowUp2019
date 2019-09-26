class GuaGame {
    constructor(fps, images, runCallback){
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}

        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        var self = this
        window.addEventListener('keydown', function(event){
            self.keydowns[event.key] = 'down'
            //陷阱在于self此时不能和this一样,你此时不明确this到底是谁
            //提前指定好this之后再进行选择
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = 'up'
        })
        this.init()//初始化全部内容的启动就在这里了
        //下面的start是载入静态内容和开始动态内容分界
    }

    static instance(...args){
        this.i = this.i || new this(...args)//为什么这里用的是this.i
        return this.i
    }

    drawImage(img){
        this.context.drawImage(img.texture, img.x, img.y)
    }
    registerAction(key, callback){
        this.actions[key] = callback
    }
    update(){
        this.scene.update()
    }
    draw(){
        this.scene.draw()
    }
    runloop(){
        var g = this
        var actions = Object.keys(g.actions)//将对象的对应key转化为数组
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            var status = g.keydowns[key]
            
            if (status == 'down'){
                //如果按键被按下调用注册的action
                g.actions[key]('down')
            } else if (status == 'up'){
                g.actions[key]('up')
                //删掉key的方法
                g.keydowns[key] = null
            }
        }
        //update
        g.update()//最后的update是完全和整个监听按键分离开了，这个和操作与本来的不用关系了
        //clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        //draw
        g.draw()
        //g.run()
        setTimeout(function(){
            g.runloop()
        }, 1000/(window.fps+1))//通过+1避免出现除以0
    }

    init(){
        var g = this
        var loads = []
        var names = Object.keys(g.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name] //这里的变量在for里面使用块极作用域实际上是对自己非常好的一种方式，能够让自己的
            let img = new Image()
            img.src = path
            img.onload = function(){
                g.images[name] = img
                loads.push(1)
                if (loads.length == names.length) {
                    log('load images全部图片结束')
                    g.start()
                }
            }
        }
    }

    textureByName(name){
        var g = this
        var img = g.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     images: img,
        // }
        //log('image.now', image)
        return img
    }
    runWithScene(scene){
        var g = this
        g.scene = scene
        setTimeout(function(){
            g.runloop()
            // log('执行runloop后')
        }, 1000/(window.fps+1))//通过+1避免出现除以0
    }
    replaceScene(rep){
        var g = this
        g.scene = rep
    }
    start(){
        var g = this
        g.runCallback(g)//首次运行要有生成的内容
        //为的是给回调和函数里面的所有内容一个初始化生成的空间
    }

}
