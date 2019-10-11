class Zombie extends GuaAnimation {
    // constructor(game, name){
    //     name = name || 'soldier'
    //     super(game, name)
    //     this.tileSize = 0
    //     this.setup()
    // }
    static new(game){
        let animation = {
            // numberOfFrames: 7,//与僵尸图片数目相等
            name: 'zombieBasic',
            pathFormat:'img/zombie/[action]/z_1_[action]_[index].png',
            actions: [
                {
                    name: 'walk',
                    numberOfFrames: 7,
                },
                {
                    name: 'attack',
                    numberOfFrames: 11,
                },
            ]
        }
        return new this(game, animation)
    }
    setup(){

    }
    
}