class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        this.setup()
    }
    setup(){
        this.zombies = []
        this.plants = []
        this.bullets = []

        this.offsetX = 255
        this.offsetY = 100
        this.zombieOffset = 30
        this.heightOfRow = 100
        this.widthOfColumn = 80

        this.bulletHitOffset = 20

        this.setupBG()
        this.setupZombies()
        this.setupPlants()
    }
    setupBG(){
        let bg = GuaImage.new(this.game, 'bg1')
        this.addElement(bg)
    }
    debug(){

        this.bulletHitOffset = config.hit_offset.value
    }
    addPlant(plant, row, column){
        plant.x = this.offsetX + column * this.widthOfColumn
        plant.y = this.offsetY + row * this.heightOfRow
        plant.row = row

        this.addElement(plant)  
        this.plants.push(plant)
    }
    addZombie(row){
        let zombie = Zombie.new(this.game)
        //只需要row表行数
        // log('zombie', zombie)
        zombie.x = 900
        zombie.y = this.zombieOffset + row * this.heightOfRow
        zombie.row = row

        this.addElement(zombie)
        this.zombies.push(zombie)
    }
    setupZombies(){
        // for (let i = 0; i < 3; i = i + 2) {
        //     let zombie = Zombie.new(this.game)
        //     this.addZombie(zombie, i)
        // }
        this.addZombie(1)
        this.addZombie(3)

    }
    setupPlants(){
        for (let j = 0; j < 1; j++) {
            for (let i = 0; i < 5; i++) {
                let plant = Shooter.new(this.game)
                this.addPlant(plant, i, j)
            }
        }
    }
    update(){
        super.update()
        // log('',)
        this.updateFire()
        this.updateHit()

    }
    updateFire(){
        for (let z of this.zombies) {
            let row = z.row
            for (let p of this.plants) {
                if (p.row == row) {
                    p.awake()
                }
            }
        }
    }
    updateHit(){
        for (let z of this.zombies) {
            let row = z.row
            for (let b of this.bullets) {
                if (b.row == row) {
                    if (z.x - b.x < this.bulletHitOffset) {
                        b.x += 1000
                    }
                }
            }
        }
    }
}