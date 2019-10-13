class Zombie extends GuaAnimation {
    static new(game){
        let animation = {
            // numberOfFrames: 7,//与僵尸图片数目相等
            name: 'zombieBasic',
            pathFormat:'img/zombie/[action]/z_1_[action]_[index].png',
            actions: [
                {
                    name: 'walk',
                    numberOfFrames: 7,
                },
                {
                    name: 'attack',
                    numberOfFrames: 11,
                },
            ]
        }
        
        let z = new this(game, animation)
        z.setup()
        return z
    }
    update(){
        super.update()
        this.x -= 0.2
    }
    setup(){
        this.row = -1
        this.hp = 5
    }
    getHit(damage){
        this.hp -= damage
        if (this.hp < 1) {
            this.die()
        }
    }
    die(){
        this.scene.removeZombie(this)
    }
}