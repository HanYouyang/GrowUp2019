class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        this.setup()
    }
    setup(){
        this.debugPath = []
        this.count = 0

        this.map = TDmap.new(this.game, 6, 4)
        this.enemies = []
        this.towers = []
        this.setupBG()
        this.setupGameElements()
        this.setupTower()

        this.setupHUD()
        this.setUpInputs()
    }
    draw(){
        super.draw()
        let s = this.map.tileSize
        for (let p of this.debugPath) {
            let context = this.game.context
            context.fillStyle = 'rgba(200, 200, 200, 0.3)'
            let x = p.x * s
            let y = p.y * s
            context.fillRect(x, y, s, s)
        }
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
        log('t1.w', t1.w)
        let i = Math.floor(x / towerSize) 
        let j = Math.floor(y / towerSize)
        x = i * towerSize
        y = j * towerSize
        this.map.addTower(i, j)
        t1.x = x
        t1.y = y
        this.addElement(t1)
        this.towers.push(t1)
        this.findPathForEnemies()
    }
    findPathForEnemies(){
        let s = this.map.tileSize
        for (let e of this.enemies) {
            let x = e.x
            let y = e.y
            let i = Math.floor(x / s) 
            let j = Math.floor(y / s)
            let path = this.map.pathfinding(i, j)
            log('path', path)
            e.resetPath(path)
            this.debugPath = path
        }
    }
    setupTower(){
       this.addTower(100, 80)//这两个数据影响后面的设置
       this.addTower(100, 180)
    }
    setupGameElements(){
        let offset = [0, 30]
        for (let i = 0; i < 1; i++) {
            let e1 = Enemy1.new(this.game)

            e1.tileSize = this.map.tileSize

            e1.x -= i * 50
            e1.y += offset[i % 2]
            // e1.map = this
            this.addElement(e1)
            this.enemies.push(e1)
            
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
        this.count++
        if (this.count == 100) {
            this.count = 0
            let e1 = Enemy1.new(this.game)

            e1.tileSize = this.map.tileSize

            // e1.x -= i * 50
            // e1.y += offset[i % 2]
            // e1.map = this
            this.addElement(e1)
            this.enemies.push(e1)
            this.findPathForEnemies()

        }
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