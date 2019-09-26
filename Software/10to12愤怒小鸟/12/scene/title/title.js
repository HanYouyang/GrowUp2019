class Pipes {
    constructor(game){
        this.game = game
        this.pipes = []
        this.pipeSpaces = 150
        this.wideSpace = 200
        this.columsOfPipes = 3
        for (let i = 0; i < this.columsOfPipes; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.wideSpace
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipePosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game){
        return new this(game)
    }
    resetPipePosition(p1, p2){
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpaces
    }
    debug(){
        this.wideSpace = config.pipe_space_test.value
        this.pipeSpaces = config.pipe_space.value
    }
    update(){
        for (let i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100){
                p1.x += this.wideSpace * this.columsOfPipes
            }
            if (p2.x < -100){
                p2.x += this.wideSpace * this.columsOfPipes
                this.resetPipePosition(p1, p2)
            }
            // 这里的双管子而非三管子问题一直存在
        }
    }
    draw(){
        // 全部继承自guaAnimation的draw
        var context = this.game.context 
        for (var p of this.pipes){
            //下面代码来自stack
            context.save()
            // log('this.x', this.x)

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipx ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation *  Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)

            context.restore()
        }

    }
}


class SceneTitle extends GuaScene {
    constructor(game){
        super(game)
        // var label = GuaLabel.new(game, 'hello')
        // this.addElement(label)

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        var bird = GuaAnimation.new(game)
        bird.x = 100
        bird.y = 230
        this.bird = bird
        this.addElement(bird)

        this.skipCount = 4
        this.grounds = []
        for (let i = 0; i < 25; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 462
            this.addElement(g)
            this.grounds.push(g)          
        }

        this.setUpInputs()
    }

    //这里不能自己写有update，会覆盖其他内容
    update(){
        super.update()
        this.skipCount --
        var offset = -2
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 6
        }
        for (let i = 0; i < 25; i++) {
            var g = this.grounds[i]
            g.x += offset      
        }
    }
    setUpInputs(){
        var self = this
        var b = this.bird
        this.game.registerAction('a', function(keyStatus){
            b.move(-2, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus){
            b.move(2, keyStatus)
        })
        this.game.registerAction('j', function(keyStatus){
            b.jump()
        })
    }
}