class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        this.setup()
    }
    setup(){
        let bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)

        let gun = GuaImage.new(this.game, 'gun')
        gun.x = 500
        gun.y = 300
        this.gun = gun
        this.addElement(gun)

        this.setUpInputs()
    }
    debug(){

    }
    //这里不能自己写有update，会覆盖其他内容
    update(){
        super.update()
    }
    setUpInputs(){
        //mouse inputs
        let self = this
        let startDrag = false
        this.game.registerMouse(function(event, status){
            let x = event.offsetX 
            let y = event.offsetY
            if (status == 'down') {
                let inPicture = self.gun.pointInFrame(x, y)
                if (inPicture) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                }
            } else if(status == 'move') {
                self.tower.x = x
                self.tower.y = y
            } else {
                startDrag = false
                self.removeElement(self.tower)
            }
            // log('mouse event', status, event)
        })

        var playerSpeed = 5
    }

}