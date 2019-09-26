var SceneEnd = function(game){
    var s = {
        game: game,

    }

    s.update = function(){
        
    }

    s.draw = function(){
        game.context.font = '30px serif'
        game.context.fillText('游戏结束', 90, 600)
    }

   

    return s
}