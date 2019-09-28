class SceneTitle extends GuaScene {
    constructor(game){
        super(game)

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        let mario = GuaNesSprite.new(game)
        this.addElement(mario)
        mario.x = 100
        mario.y = 400
        this.mario = mario

        this.skipCount = 4
        this.grounds = []
        for (let i = 0; i < 25; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 462
            this.addElement(g)
            this.grounds.push(g)          
        }

        this.setUpInputs()
    }

    //这里不能自己写有update，会覆盖其他内容
    update(){
        super.update()
        
    }
    setUpInputs(){
        var self = this
        var b = this.mario
        var playerSpeed = 5
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