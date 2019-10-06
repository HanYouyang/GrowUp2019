class Map {
    constructor(){
        this.height = 15
        this.width = 20
        this.tiles = []
        this.setupTiles()
    }
    setupTiles(){
        let s = this.height * this.width
        log('s =', s)
        for (let i = 0; i < s; i++) {
            this.tiles[i] = 0
        }
    }
    setTile(i, j, tile){
        let index = i * this.height + j
        this.tiles[index] = tile
    }
    exportJSON(){
        let s = JSON.stringify(this.tiles) 
        log('JSON', s)
    }
}