class Tower1 extends GuaImage {
    constructor(game, name){
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup(){
        // this.rotation = 90
        this.attack = 1
        this.range = 100
        this.target = null
        this._cooldown = 8
        this._fireCount = 0
    }
    draw(){
        this.drawAttackRange()
        super.draw()
    }
    drawAttackRange(){
        let context = this.game.context
        context.fillStyle = 'rgba(200, 200, 200, 0.3)'
        context.beginPath()
        let v = this.center()
        context.arc(v.x, v.y, this.range, 0, Math.PI*2)
        context.fill()
    }
    canAttact(enemy){

        let e = enemy
        let enemyExist = e !== null && !e.dead
        if (enemyExist) {
            let can = this.center().distance(enemy.center()) < this.range
            if (this._fireCount != 0) {
                this._fireCount--
                return false
            } else {
                this._fireCount = this._cooldown
                return can
            }
            
        } else {
            return false
        }
    }
    findTarget(enemies){
        for (let e of enemies) {
            if (this.canAttact(e)) {
                this.target = e
                break
            }
        }
    }
    update(){
        this.updateRotation(this.target)
        if (this.canAttact(this.target)) {
            log('攻击敌人')
            this.target.underAttact(this.attack)
            if (this.target.dead) {
                this.target = null
            }
        }
    }
    updateRotation(target){
        if (target !== null) {
            let v = target.center().sub(this.center()).normal()
            // let dx = target.x - this.x 
            // let dy = target.y - this.y
            let r = Math.jwjc(v.x, -v.y)
            this.rotation = r
        }
    }
}