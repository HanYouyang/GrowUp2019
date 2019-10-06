class GuaImage {
    constructor(game, name){
        this.game = game//传到手上
        this.name = name
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height

        //加自管子
        this.flipY = false
        this.rotation = 0
    }
    static new(...args){
        return new this(...args)
    }
    pointInFrame(x, y){
        let xIn = x >= this.x && x <= this.x + this.w
        let yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }
    // draw(){
    //     this.game.drawImage(this)
    // } 被后来的旋转接管
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
    update(){
    }
    clone(){
        let c = GuaImage.new(this.game, this.name)
        c.x = this.x 
        c.y = this.y 
        return  c
    }
    center(){
        let x = this.x + this.w / 2
        let y = this.y + this.h / 2
        return Vector.new(x, y)
    }
}