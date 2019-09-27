class SceneEnd extends GuaScene {
    constructor(game){
        super(game)
        game.registerAction('r', function(){
            //这个可以放到__initial里面去
            var gameRe = SceneTitle.new(game)
            game.replaceScene(gameRe)
        })
    }

    draw(){
        this.game.context.font = '30px serif'
        this.game.context.fillText('游戏结束，按 r 重新开始游戏', 90, 600)
    }

    update(){
        
    }

}