class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        var walk = GuaAnimation.new(game)
        walk.x = 100
        walk.y = 200
        this.walk = walk
        this.addElement(walk)

        this.setUpInputs()
    }
    //这里不能自己写有update，会覆盖其他内容
    setUpInputs(){
        var self = this
        this.game.registerAction('a', function(keyStatus){
            self.walk.move(-10, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus){
            self.walk.move(10, keyStatus)
        })
    }
}