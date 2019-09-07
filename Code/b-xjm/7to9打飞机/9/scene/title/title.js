class GuaLabel {
    constructor(game, text){
        this.game = game
        this.text = text
    }
    static new(game, text){
        return new this(game, text)
    }
    draw(){
        this.game.context.font = '30px serif'
        // log('draw label', this.game, this.text)
        this.game.context.fillText(this.text, 90, 600)
    }
    update(){
    }
}
class GuaParticle extends GuaImage {
    constructor(game){
        // this.game = game
        super(game, 'fire')
        this.setup()
    }
    setup(){
        this.life = 5
    }
    init(x, y, vx, vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update(){
        this.life --
        this.x += this.vx
        this.y += this.vy
        var factor = 0.1
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }

}
class GuaParticleSystem {
    constructor(game){
        this.game = game
        this.setup()
    }
    setup(){
        this.x = 100
        this.y = 100
        this.numberOfParticles = 80
        this.particles = []

    }
    static new(game){
        return new this(game)
    }
    update(){
        //添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            var s = 10
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        //更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        //删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw(){
        for (var p of this.particles) {
            p.draw()
        }
    }

}

class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        var ps = GuaParticleSystem.new(game)
        log('ps', ps)
        this.addElement(ps)
    }
    //这里不能自己写有update，会覆盖其他内容
}