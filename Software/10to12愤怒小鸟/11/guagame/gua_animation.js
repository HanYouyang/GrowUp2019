class GuaAnimation {
    constructor(game){
        this.game = game 
        this.animations = {
            idle: [],
            walk: [],
        }
        
        for (var i = 1; i < 20; i ++) {
            var name = 'walk' + i
            var t = game.textureByName(name)
            this.animations['walk'].push(t) 
        }
        for (var i = 1; i < 16; i ++) {
            var name = 'idle' + i
            var t = game.textureByName(name)
            this.animations['idle'].push(t) 
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]

        this.w = this.texture.width
        this.h = this.texture.height
        this.flipx = false

        this.frameIndex = 0
        this.frameNumber = 3

    }
    static new(game){
        return new this(game)
    }
    frames(){
        return this.animations[this.animationName]
    }
    draw(){
        var context = this.game.context 
        if (this.flipx) {
            //下面代码来自stack
            context.save()
            log('this.x', this.x)
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)

            context.drawImage(this.texture, this.x, this.y)
            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
    }
    update(){
        this.frameNumber --
        if (this.frameNumber == 0) {
            this.frameNumber = 3
            this.frameIndex = ( this.frameIndex + 1 ) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    move(x, keyStatus){
        this.flipx = x < 0
        this.x += x
        var animationNames = {
            down: 'walk',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name){
        this.animationName = name 
    }
}