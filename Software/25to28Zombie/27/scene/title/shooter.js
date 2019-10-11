class Shooter extends GuaAnimation {
    static new(game){
        let animation = {
            name: 'shooterBasic',
            pathFormat:'img/shooter/[action]/[action]_[index].png',
            actions: [
                {
                    name: 'idle',
                    numberOfFrames: 8,
                },
                {
                    name: 'attack',
                    numberOfFrames: 8,
                },
            ]
        }
        return new this(game, animation)
    }
    setup(){

    }
    
}