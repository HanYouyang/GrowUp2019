class GuaLabel {
    constructor(game, text){
        this.game = game
        this.text = text
    }
    static new(game, text){
        return new this(game, text)
    }
    draw(){
        this.game.context.font = '30px serif'
        // log('draw label', this.game, this.text)
        this.game.context.fillText(this.text, 90, 600)
    }
    update(){
    }
}
