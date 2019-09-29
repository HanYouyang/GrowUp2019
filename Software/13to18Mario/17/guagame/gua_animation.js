class GuaAnimation {
    constructor(game){
        this.game = game 
        this.animations = {
            b: [],
        }
        // 抽象+继承+复用
        for (var i = 1; i < 3; i ++) {
            var name = 'b' + i
            var t = game.textureByName(name)
            this.animations['b'].push(t) 
        }
        this.animationName = 'b'
        this.texture = this.frames()[0]

        this.w = this.texture.width
        this.h = this.texture.height
        this.flipx = false
        //重力加速度
        this.gy = 10
        this.vy = 0

        this.frameIndex = 0
        this.frameNumber = 3

        this.rotation = 0
        this.alpha = 1
    }
    static new(game){
        return new this(game)
    }
    frames(){
        return this.animations[this.animationName]
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
    jump(){
        this.vy = -3
        this.rotation = -45
    }
    update(){
        //更新Alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        //更新重力
        this.y += this.vy
        this.vy += this.gy * 0.02
        var baseHeight = 435
        if (this.y > baseHeight) {
            this.y = baseHeight
        }
        if (this.rotation < 45) {
            this.rotation += 5
        }
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
    }
    changeAnimation(name){
        this.animationName = name 
    }
}