class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        this.setup()
    }
    setup(){
        this.map = TDmap.new(this.game, 6, 4)
        this.enemies = []
        this.towers = []
        this.setupBG()
        this.setupTower()
        this.setupGameElements()
        this.setupHUD()
        this.setUpInputs()
    }
    setupBG(){
        let bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)
    }
    // addTower(x, y){
    //     let t1 = Tower1.new(this.game)
    //     t1.x = x
    //     t1.y = y
    //     this.addElement(t1)
    //     this.towers.push(t1)
    // }
    // setupTower(){
    //    this.addTower(100, 150)
    //    this.addTower(100, 200)
    // }
    addTower(x, y){
        let t1 = Tower1.new(this.game)
        let towerSize = t1.w
        let i = Math.floor(x / towerSize) 
        let j = Math.floor(y / towerSize)
        x = i * towerSize
        y = j * towerSize
        this.map.addTower(i, j)
        t1.x = x
        t1.y = y
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupTower(){
       this.addTower(100, 190)
       this.addTower(100, 280)
    }
    setupGameElements(){
        // for (let i = 0; i < 30; i++) {
        //     let e1 = Enemy1.new(this.game)
        //     e1.x -= i * 40
        //     this.addElement(e1)
        //     this.enemies.push(e1)
        // }
        // let offset = [0, 10]
        for (let i = 0; i < 50; i++) {
            let e1 = Enemy1.new(this.game)
            e1.x -= i * 50
            // e1.y += offset[i % 2]
            this.enemies.push(e1)

            this.addElement(e1)
        }
    }
    setupHUD(){
        let gun = GuaImage.new(this.game, 'gun')
        gun.x = 500
        gun.y = 300
        this.gun = gun
        this.addElement(gun)
    }
    debug(){

    }
    //这里不能自己写有update，会覆盖其他内容
    update(){
        super.update()
        //让tower寻找目标
        for (let t of this.towers) {
            if (t.target === null) {
                t.findTarget(this.enemies)
            }
        }
    }
    setUpInputs(){
        //mouse inputs
        let self = this
        let startDrag = false
        let ox = 0
        let oy = 0
        this.game.registerMouse(function(event, status){
            let x = event.offsetX 
            let y = event.offsetY
            if (status == 'down') {
                let inPicture = self.gun.pointInFrame(x, y)
                if (inPicture) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                    ox = self.gun.x - x
                    oy = self.gun.y - y
                }
            } else if(status == 'move') {
                self.tower.x = x + ox
                self.tower.y = y + oy
            } else {
                startDrag = false
                self.removeElement(self.tower)
                self.addTower(x, y)
            }
            // log('mouse event', status, event)
        })

        var playerSpeed = 5
    }

}