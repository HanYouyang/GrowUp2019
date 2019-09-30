class SceneEditor extends GuaScene {
    constructor(game){
        super(game)

        // var bg = GuaImage.new(game, 'bg')
        // this.addElement(bg)

        let map = GuaTileMap.new(game)
        this.addElement(map)

        let mario = GuaNesSprite.new(game, map)
        this.addElement(mario)
        mario.x = 100
        mario.y = 100
        this.mario = mario
        this.skipCount = 4

        this.setUpInputs()
    }

    //这里不能自己写有update，会覆盖其他内容
    update(){
        super.update()
        
    }
    setUpInputs(){
        var self = this
        var b = this.mario
        var playerSpeed = 0.5
        this.game.registerAction('a', function(keyStatus){
            b.move(-playerSpeed, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus){
            b.move(playerSpeed, keyStatus)
        })
        this.game.registerAction('j', function(keyStatus){
            b.jump()
        })
    }
}