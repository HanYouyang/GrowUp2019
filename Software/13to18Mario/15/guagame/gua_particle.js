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
        this.duration = 50

        this.x = 100
        this.y = 100
        this.numberOfParticles = 80
        this.particles = []

    }
    static new(game){
        return new this(game)
    }
    update(){
        this.duration --
        
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
        if (this.duration < 0) {
            //应该从scene 中删除
            return
        }
        for (var p of this.particles) {
            p.draw()
        }
    }

}
