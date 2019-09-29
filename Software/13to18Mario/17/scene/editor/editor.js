class GuaTileMap {
    constructor(game){
        this.game = game
        this.tiles = [
            1, 1, 1, 0, 1,
            1, 2, 3, 0, 1,
            1, 2, 3, 0, 1,
        ]
        this.th = 5
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 't1'),
            GuaImage.new(game, 't2'),
            GuaImage.new(game, 't3'),
            GuaImage.new(game, 't4'),
        ]
        this.tileSize = 32
    }
    static new(...args){
        return new this(...args)
    }
    update(){

    }
    draw(){
        let h = this.th
        log('h = ', h)
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
            
        }
    }


}




class SceneEditor extends GuaScene {
    constructor(game){
        super(game)

        // var bg = GuaImage.new(game, 'bg')
        // this.addElement(bg)

        let map = GuaTileMap.new(game)
        this.addElement(map)

        let mario = GuaNesSprite.new(game)
        this.addElement(mario)
        mario.x = 100
        mario.y = 100
        this.mario = mario
        this.skipCount = 4

        this.setUpInputs()
    }

    //这里不能自己写有update，会覆盖其他内容
    update(){
        super.update()
        
    }
    setUpInputs(){
        var self = this
        var b = this.mario
        var playerSpeed = 0.5
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