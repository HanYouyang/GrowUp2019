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

//下面的所有内容封装到对象里面去
//每次建立一个对象就立即实例化到下面的主程序函数里面去
// var GuaGame = function(fps, images, runCallback){
//     var canvas = document.querySelector('#id-canvas')
//     var context = canvas.getContext('2d')
//     var g = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         images: {},
//     }
//     g.canvas = canvas
//     g.context = context

//     g.drawImage = function(guaGame){
//         //log('guaGame Now', guaGame)
//         g.context.drawImage(guaGame.image, guaGame.x, guaGame.y)
//     }
//     //自己增添相关的函数继承方法
//     g.update = function(){
//         g.scene.update()
//     }
//     g.draw = function(){
//         g.scene.draw()
//     }

//     //这里一方面是要监听你的按键响应动作，另外一方面是要监听你注册的事件
//     window.addEventListener('keydown', function(event){
//         g.keydowns[event.key] = true
//         //event.key还是应该用的关键字
//     })
//     window.addEventListener('keyup', function(event){
//         g.keydowns[event.key] = false
//     })
//     //注册函数获得你要的事件
//     g.registerAction = function(key, callback){
//         g.actions[key] = callback
//         //给出了你注册的新的key和新的callback到actions里面
//         //内部就是丰富出来了actions这个属性的新建对象
//         //只不过是下面又继续监听对象
//         //这个时候的问题在于key本身是一个变动的对象，所以要根据这个属性调用函数
//     }
//     //timer让自己的内容出现所谓的
//     window.fps = 30
    
//     var runloop = function(){
//         //events监听你注册的事件，如果你发现有什么事件被新注册进来就放到对象里面去
//         //这里的监听放在这里转换有点刻意，不过理解就好，不必非得放在这里面时刻监听，毕竟你注册就直接在main里面而不是说一直监听下去
//         var actions = Object.keys(g.actions)//将对象的对应key转化为数组
//         for (let i = 0; i < actions.length; i++) {
//             let key = actions[i]
//             // log('key', key)
//             //依次遍历自己现在的内容从而让自己能够使用
//             //log('g.actions[key]', g.actions[key])
//             // log('g.actions[key]()', g.actions[key]())
//             if (g.keydowns[key]){
//                 //如果按键被按下调用注册的action
//                 g.actions[key]()
//             }
//         }
//         //update
//         g.update()//最后的update是完全和整个监听按键分离开了，这个和操作与本来的不用关系了
//         //clear
//         context.clearRect(0, 0, canvas.width, canvas.height)
//         //draw
//         g.draw()
//         //g.run()
//         setTimeout(function(){
//             runloop()
//         }, 1000/(fps+1))//通过+1避免出现除以0
//     }   
//         //开始程序前应该先载入所有内容
//         var loads = []
//         var names = Object.keys(images)
//         for (let i = 0; i < names.length; i++) {
//             let name = names[i]
//             let path = images[name] //这里的变量在for里面使用块极作用域实际上是对自己非常好的一种方式，能够让自己的
//             //log('name + path', name, path)
//             let img = new Image()
//             img.src = path
//             img.onload = function(){
//                 g.images[name] = img
//                 loads.push(1)
//                 if (loads.length == names.length) {
//                     //所有图片都载入成功后就使用g.run
//                     log('load images全部图片结束')
//                     g.__start()
//                 }
//             }
//         }
//         g.imageByName = function(name){
//             var img = g.images[name]
//             var image = {
//                 w: img.width,
//                 h: img.height,
//                 images: img,
//             }
//             //log('image.now', image)
//             return image
//         }
//         g.runWithScene = function(scene){
//             g.scene = scene//有点绕，因为game先初始化出来
//             //这时候初始化得到的是scene为Null的game，再用这个game
//             //初始化scene并且把scene放到game里面
//             //可以内部通过别的函数接口传个参数过来所以可以继续增添内容
//             //相当于这里传入之后，上面的内容就有得更新了
//             setTimeout(function(){
//                 // log('执行runloop前')
//                 runloop()
//                 // log('执行runloop后')
//             }, 1000/(fps+1))//通过+1避免出现除以0
//         }
//         g.replaceScene = function(rep){
//             g.scene = rep
//         }
//         g.__start = function(){
//             runCallback(g)//首次运行要有生成的内容
//             //为的是给回调和函数里面的所有内容一个初始化生成的空间
//         }
//     return g
// }