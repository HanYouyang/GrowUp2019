class TDmap {
    constructor(game, w, h){
        name = name || 'gun'
        this.w = w
        this.h = h
        this.tileSize = 100
        this.setup()
    }
    static new(...args){
        return new this(...args)
    }
    addTower(i, j){
        this.grid[i][j] = 10
    }
    setup(){
       let grid = [
        [0, 0, 1, 0,],
        [1, 1, 1, 1,],
        [1, 1, 1, 1,],
        [1, 1, 1, 1,],
        [1, 1, 1, 1,],
        [0, 0, 1, 0,],
       ]
       this.grid = grid
    }
    normalGrid(){
        let grid = []
        for (let column of this.grid) {
            let newColumn = []
            for (let flag of column) {
                if (flag != 1) {
                    newColumn.push(0)
                } else {
                    newColumn.push(1)
                }
            }
            grid.push(newColumn)
        }
        return grid
    }
    pathfinding(i, j){
        // if (i < 0) {
        //     i = 0
        // }
        let map = this.normalGrid()
        let graph = new Graph(map)
        let start = graph.grid[i][j]
        let end = graph.grid[5][2]
        let result = astar.search(graph, start, end)
        return result
    }
}