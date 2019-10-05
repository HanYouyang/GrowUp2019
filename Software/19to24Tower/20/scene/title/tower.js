class Tower1 extends GuaImage {
    constructor(game, name){
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup(){
        this.attack = 1
        this.range = 50
        this.target = null
    }

    canAttact(enemy){
        let e = enemy
        let enemyExist = e !== null && !e.dead
        if (enemyExist) {
            return this.center().distance(enemy.center()) < this.range
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
        if (this.canAttact(this.target)) {
            log('攻击敌人')
            this.target.underAttact(this.attack)
            if (this.target.dead) {
                this.target = null
            }
        }
    }
}