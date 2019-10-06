class GuaTileMap {
    constructor(game){
        this.game = game
        this.offsetX = 10
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
            //
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
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
        let index = i * this.th + j 
        let tile = this.tiles[index]
        let doOn = (tile != 0)
        log('此时站在地面上么？', doOn)
        return tile != 0
    }
    update(){
        this.offsetX -= 1
    }
    draw(){
        let h = this.th
        // log('h = ', h)
        let offsetIndex = Math.abs(parseInt(this.offsetX / this.tileSize))
        let numberOfTiles = h * (12 + 1)
        if (offsetIndex + numberOfTiles < this.tiles.length) {
            numberOfTiles = this.tiles.length
        }
        for (let i = offsetIndex; i < numberOfTiles; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                x += this.offsetX
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
            
        }
    }


}




