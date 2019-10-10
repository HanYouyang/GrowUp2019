class TDmap {
    constructor(game, w, h){
        name = name || 'gun'
        this.w = w
        this.h = h
        this.setup()
    }
    static new(...args){
        return new this(...args)
    }
    addTower(i, j){
        this.grid[j][i] = 10
    }
    setup(){
       let grid = [
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
       ]
       this.grid = grid
    }
    
}