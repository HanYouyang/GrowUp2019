class GuaTileMap {
    constructor(game){
        this.game = game
        this.tiles = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 
            0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 
            0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 0, 2, 3, 0, 1, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
        ]
        this.th = 15
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
    onTheGround(i, j){
        let index = i * this.onTheGround + j 
        let tile = this.tiles[index]
        return tile != 0
    }
    update(){

    }
    draw(){
        let h = this.th
        // log('h = ', h)
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




