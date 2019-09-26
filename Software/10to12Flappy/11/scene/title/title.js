class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        // var label = GuaLabel.new(game, 'hello')
        // this.addElement(label)

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        var bird = GuaAnimation.new(game)
        bird.x = 100
        bird.y = 230
        this.bird = bird
        this.addElement(bird)

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
        this.skipCount --
        var offset = -2
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 6
        }
        for (let i = 0; i < 25; i++) {
            var g = this.grounds[i]
            g.x += offset      
        }
    }
    setUpInputs(){
        var self = this
        var b = this.bird
        this.game.registerAction('a', function(keyStatus){
            b.move(-2, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus){
            b.move(2, keyStatus)
        })
        this.game.registerAction('j', function(keyStatus){
            b.jump()
        })
    }
}