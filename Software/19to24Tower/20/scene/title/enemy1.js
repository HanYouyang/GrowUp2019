class Enemy1 extends GuaImage {
    constructor(game, name){
        name = name || 't1'
        super(game, name)
        this.setup()
    }
    setup(){
        this.dead = false
        this.y = 200
        this.speed = 1
        this.hp = 3
        this.destination = 600
    }
    underAttact(ap){
        this.hp -= ap
        if (this.hp <= 0) {
            this.die()
        }
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


