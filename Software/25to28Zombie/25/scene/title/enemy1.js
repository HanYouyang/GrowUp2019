class Enemy1 extends GuaImage {
    constructor(game, name){
        name = name || 'soldier'
        super(game, name)
        this.tileSize = 0
        this.setup()
    }
    resetPath(path){
        let steps = []
        let s = this.tileSize
        for (let p of path) {
            let c = [p.x * s, p.y * s]
            steps.push(c)
        }
        this.steps = steps
        log('this.steps', this.steps)
        this.stepIndex = 0
    }
    setup(){
        this.map = null

        this.stepIndex = 0
        this.steps =  []

        this.dead = false
        this.y = 100
        this.speed = 1
        this.maxHp = 180
        this.hp = this.maxHp
        this.destination = 500
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
    // update(){
    //     if (this.dead) {
    //         return
    //     }
    //     this.x += this.speed
    //     if (this.x > this.destination) {
    //         log('敌人到位')
    //     }
    // }
    update(){
        if (this.dead) {
            return
        }
        let [dx, dy] = this.steps[this.stepIndex]
        // log('dx, dy now', dx, dy)
        let signX = dx > this.x ? 1 : -1
        let signY = dy > this.y ? 1 : -1
        this.x += this.speed * signX
        this.y += this.speed * signY
        if (dx == this.x) {
            signX = 0
        }
        if (dy == this.y) {
            signY = 0
        }
        if (this.x == dx && this.y == dy) {
            this.stepIndex = this.stepIndex + 1
            // let [dx, dy] = this.steps[this.stepIndex]
            // log('敌人到目标点, stepIndex', this.stepIndex)

            if (this.stepIndex == this.steps.length) {
                log('敌人到终点')
                this.die()
            }
        } 
    }
}


