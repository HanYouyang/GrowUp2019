class GuaScene {
    constructor(game){
        //在这里给出接口就好了，别的不用管了
        this.game = game
        this.elements = []
        this.debugModeEnabled = true
    }
    static new(game){
        var i = new this(game)
        return i
    }

    addElement(guaImage){
        guaImage.scene = this
        this.elements.push(guaImage)
    }

    draw(){//这里一定要被继承的函数必须有这个相应的内容
        //log('elements2', this.elements)
        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i]
            //log('element', element)
            this.game.drawImage(element)
        }
    }
    update(){
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i]
                //log('element', element)
                element.debug && element.debug()
            }
        }

        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i]
            //log('element', element)
            element.update()
        }
    }
}
