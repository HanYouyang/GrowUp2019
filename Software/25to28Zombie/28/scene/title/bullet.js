class PeaBullet extends GuaImage {
    constructor(game, name){
        super(game, name)
        this.damage = 1
        this.speed = 3
        this.row = -1
    }
    static new(...args){
        return new this(...args)
    }
    debug(){
        this.speed = config.bullet_speed.value
    }
    update(){
        this.x += this.speed
    }
    remove(){
        this.scene.removeBullets(this)
    }
}