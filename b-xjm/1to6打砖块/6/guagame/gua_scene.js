class GuaScene {
    constructor(game){
        //在这里给出接口就好了，别的不用管了
        this.game = game

    }
    static new(game){
        var i = new this(game)
        return i
    }

    draw(){//这里一定要被继承的函数必须有这个相应的内容
        
    }

    update(){
        
    }
}
