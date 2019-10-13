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
    removeElement(node){
        // 等价过滤
        this.elements = this.elements.filter(e => e != node)
        // for (let e of this.elements) {
        //     if (e == node) {
        //         log('删除元素', e)
        //     }
        // }
    }

    draw(){//这里一定要被继承的函数必须有这个相应的内容
        for (var element of this.elements) {
            element.draw()
        }
    }

    update(){
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i]
                // log('element', element)
                element.debug && element.debug()
                // element.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i]
            element.update()
        }
    }
}
