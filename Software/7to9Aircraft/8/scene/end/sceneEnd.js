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


// var SceneEnd = function(game){
//     var s = {
//         game: game,

//     }

//     game.registerAction('r', function(){
//         var gameRe = SceneTitle.new(game)
//         game.replaceScene(gameRe)
//     })

//     s.update = function(){
        
//     }

//     s.draw = function(){
//         game.context.font = '30px serif'
//         game.context.fillText('游戏结束，按 r 重新开始游戏', 90, 600)
//     }

//     return s
// }