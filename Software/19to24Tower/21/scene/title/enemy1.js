class Enemy1 extends GuaImage {
    constructor(game, name){
        name = name || 'soldier'
        super(game, name)
        this.setup()
    }
    setup(){
        this.dead = false
        this.y = 200
        this.speed = 1
        this.maxHp = 8
        this.hp = this.maxHp
        this.destination = 600
    }
    underAttact(ap){
        this.hp -= ap
        if (this.hp <= 0) {
            this.die()
        }
    }
    drawLifeBar(){
        let context = this.game.context

        context.fillStyle = 'red'
        let [x, y, w, h] = [this.x, this.y - 10, this.w, 10]

        context.fillRect(x, y, w, h)

        context.fillStyle = 'green'
        let w1 = w * (this.hp / this.maxHp)
        context.fillRect(x, y, w1, h)
    }
    draw(){
        super.draw()
        this.drawLifeBar()
    }
    die(){
        this.dead = true
        this.scene.removeElement(this)
    }
    update(){
        if (this.dead) {
            return
        }
        this.x += this.speed
        if (this.x > this.destination) {
            log('敌人到位')
        }
    }
}


