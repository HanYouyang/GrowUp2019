class GuaAnimation {
    // let animationZombie = {
    //     numberOfFrames: 7,//与僵尸图片数目相等
    //     name: 'zombieWalk',
    //     pathFormat:'img/zombie/walk/z_1_{}.png',
    // }
    constructor(game, animation){
        let a = animation
        this.game = game 
        this.animations = {}
        // 抽象+继承+复用
        for (let action of a.actions) {
            this.animations[action.name] = []
            for (var i = 1; i < action.numberOfFrames; i ++) {
                // 这里根据个人图片起始点不同
                if (action.numberOfFrames < 10) {
                    var index = '0'.repeat(String(action.numberOfFrames).length) + String(i)
                } else {
                    var index = '0'.repeat(String(action.numberOfFrames).length - String(i).length) + String(i)
                }
                // let key = a.name + action.name + index
                let key = action.name + index
                // log('index', index)
                // log('String(a.numberOfFrames).length', String(a.numberOfFrames).length)
                // log('String(a.numberOfFrames).length - String(i).length', String(a.numberOfFrames).length - String(i).length)
                // log('key', key)
                var t = game.textureByName(key)
                // log('t', t)
                this.animations[action.name].push(t) 
            }
        }
        this.animationName = a.actions[0].name
        this.texture = this.frames()[0]
        log('this.texture', this.texture)

        this.w = this.texture.width
        this.h = this.texture.height
        this.flipx = false

        this.frameIndex = 0
        // this.frameNumber = a.numberOfFrames
        this.frameNumber = this.frames().length

        this.rotation = 0
        this.alpha = 1
    }
    static new(...args){
        return new this(...args)
    }
    frames(){
        return this.animations[this.animationName]
    }
    updateFrame(){
        this.frameNumber --
        if (this.frameNumber == 0) {
            this.frameNumber = 3
            this.frameIndex = ( this.frameIndex + 1 ) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    update(){
        this.updateFrame()
    }
    draw(){
        var context = this.game.context 
        
        //下面代码来自stack
        context.save()
        // log('this.x', this.x)
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipx) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation *  Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    changeAnimation(name){
        this.animationName = name 
    }
}