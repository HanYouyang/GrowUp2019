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
    removeBullets(bullet){
        this.bullets = this.bullets.filter(e => e != bullet)
        this.removeElement(bullet)
    }
    removeZombie(zombie){
        // 等价过滤
        this.zombies = this.zombies.filter(z => z != zombie)
        this.removeElement(zombie)
        // for (let e of this.elements) {
        //     if (e == node) {
        //         log('删除元素', e)
        //     }
        // }
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
    debug(){
        // log('debug')
        this.bulletHitOffset = config.hit_offset.value
    }
    update(){
        super.update()
        // log('',)
        this.debug()
        this.updateFire()
        this.updateHit()
    }
    updateFire(){
        for (let p of this.plants) {
            let row = p.row
            p.sleep()
            for (let z of this.zombies) {
                    if (z.row == row) {
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
                        // b.x += 1000
                        z.getHit(b.damage)
                        b.remove()
                    }
                }
            }
        }
    }
}