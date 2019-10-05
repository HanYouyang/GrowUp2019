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
    draw(){
        this.game.drawImage(this)
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