class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        this.setup()
    }
    setup(){
        this.setupBG()
        this.setupZombies()
        this.setupPlants()
        
    }
    setupBG(){
        let bg = GuaImage.new(this.game, 'bg1')
        this.addElement(bg)
    }
    setupZombies(){
        let zombie = Zombie.new(this.game)
        log('zombie', zombie)
        zombie.x = 1200
        zombie.y = 200
        this.addElement(zombie)

        window.z = zombie
    }
    setupPlants(){
        let plant = Shooter.new(this.game)
        plant.x = 300
        plant.y = 200
        this.addElement(plant)

        window.shooter = plant
    }
}