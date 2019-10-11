class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        this.setup()
    }
    setup(){
        let zombie = Zombie.new(this.game)
        log('zombie', zombie)
        zombie.x = 100
        zombie.y = 100
        this.addElement(zombie)

        window.z = zombie
    }

}