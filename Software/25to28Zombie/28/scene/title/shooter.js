class Shooter extends GuaAnimation {
    // constructor(game, name){
    //     super(game, name)

    //     this.setup()//替代了constructor
    // }
    static new(game){
        let animation = {
            name: 'shooterBasic',
            pathFormat:'img/shooter/[action]/[action]_[index].png',
            actions: [
                {
                    name: 'idle',
                    numberOfFrames: 8,
                },
                {
                    name: 'attack',
                    numberOfFrames: 8,
                },
            ]
        }
        let p = new this(game, animation)
        p.setup()
        return p
    }
    setup(){
        this.row = -1

        this.cooldown = 50
        this._sleep = true
    }
    sleep(){
        this._sleep = true
    }
    awake(){
        this._sleep = false
    }
    fire(){
        if (this._sleep) {
            return
        }
        this.cooldown--
        if (this.cooldown == 0) {
            this.cooldown = 50

            let pb = PeaBullet.new(this.game, 'bullet1')
            let fix = 35
            pb.x = this.x + fix
            pb.y = this.y
            pb.row = this.row
            let s = this.game.scene
            s.addElement(pb)
            s.bullets.push(pb)
        }
    }
    update(){
        super.update()
        this.fire()
    }
}