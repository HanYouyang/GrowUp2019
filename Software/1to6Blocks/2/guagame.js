//下面的所有内容封装到对象里面去
//每次建立一个对象就立即实例化到下面的主程序函数里面去
var GuaGame = function(fps){
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    
    var g = {
        actions: {},
        keydowns: {},
    }
    g.canvas = canvas
    g.context = context
    g.drawImage = function(guaGame){
        g.context.drawImage(guaGame.image, guaGame.x, guaGame.y)

    }
    //这里一方面是要监听你的按键响应动作，另外一方面是要监听你注册的事件
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
        //event.key还是应该用的关键字
    })
    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })
    //注册函数获得你要的事件
    g.registerAction = function(key, callback){
        g.actions[key] = callback
        //给出了你注册的新的key和新的callback到actions里面
        //内部就是丰富出来了actions这个属性的新建对象
        //只不过是下面又继续监听对象
        //这个时候的问题在于key本身是一个变动的对象，所以要根据这个属性调用函数
    }
    //timer让自己的内容出现所谓的
    window.fps = 30
    var runloop = function(){
        //events监听你注册的事件，如果你发现有什么事件被新注册进来就放到对象里面去
        //这里的监听放在这里转换有点刻意，不过理解就好，不必非得放在这里面时刻监听，毕竟你注册就直接在main里面而不是说一直监听下去
        var actions = Object.keys(g.actions)//将对象的对应key转化为数组
        for (let i = 0; i < actions.length; i++) {
            var key = actions[i]
            //依次遍历自己现在的内容从而让自己能够使用
            if (g.keydowns[key]){
                //如果按键被按下调用注册的action
                g.actions[key]()
            }
        }
        //update
        g.update()
        //最后的update是完全和整个监听按键分离开了，这个和操作与本来的不用关系了
        //clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        //draw
        g.draw()
        //这里再次调用的意思是让两个循环起来，但是真的需要再写一个么？
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    setTimeout(function(){
        runloop()
    }, 1000/window.fps)
    return g
}