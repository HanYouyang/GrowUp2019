class GuaNesSprite {
    constructor(game, map){
        this.game = game
        this.map = map
        this.tileSize = this.map.tileSize
        this.drawOffset = 32784

        this.data = window.bytes.slice(this.drawOffset)
        this.animations = {
            b: [],
        }
        // 现在加上drawBlock drawSprite
        this.pixelWidth = 2
        this.columnsOfSprite = 2
        this.rowsOfSprite = 4
        this.w = this.pixelWidth * this.columnsOfSprite * 8
        this.h = this.pixelWidth * this.rowsOfSprite * 8
        this.flipx = false
        //重力加速度
        this.gy = 10
        this.vy = 0
        this.maxSpeed = 10

        this.frameIndex = 0
        this.frameNumber = 4

        this.rotation = 0
        this.alpha = 1

        this.vx = 0
        this.mx = 0
    }
    static new(...args){
        return new this(...args)
    }
    drawBlock(context, data, x, y, pixelWidth){
        const colors = [
            'white',
            '#FE1000',
            '#FF8010',
            '#AA3030',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8; i++){
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++){
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = (c2 << 1) + c1 
                if (pixel == 0) {
                    continue
                }
                let color = colors[pixel]
                context.fillStyle = color

                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }
    drawSprites(){
        //改变形式的时候放到初始化里面，不用再写出来数字
        let bytesPerBlock = 16
        let dataOffset = this.frameIndex * bytesPerBlock * 8
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock * pixelWidth
        let offset = 0
        for (let i = 0; i < this.rowsOfSprite; i++) {
            for (let j = 0; j < this.columnsOfSprite; j++) {
                let x = j * blockSize
                let y = i * blockSize
                let pixel = data.slice(offset)
                this.drawBlock(context, pixel, x, y, pixelWidth)
                offset += 16
                // log('offset now', offset)
            }
        }
    }
    frames(){
        return this.animations[this.animationName]
    }
    draw(){
        var context = this.game.context 
        
        //下面代码来自stack
        context.save()
        // log('this.x', this.x)
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipx) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation *  Math.PI / 180)
        context.translate(-w2, -h2)
        //画马里奥的地方
        // context.drawImage(this.texture, 0, 0)
        this.drawSprites()

        context.restore()
    }
    jump(keyStatus){
        this.vy = -3
        // this.rotation = this.rotation - 45
    }

    updateGravity(){
        let i = Math.floor(this.x / this.tileSize)
        let j = Math.floor(this.y / this.tileSize) + 2
        let onTheGround = this.map.onTheGround(i, j)
        if (onTheGround && this.vy > 0) {
            this.vy = 1
        } else {
            this.y += this.vy
            this.vy += this.gy * 0.02
            let j = Math.floor(this.y / this.tileSize) + 2
            let onTheGround = this.map.onTheGround(i, j)

            if (onTheGround) {
                this.y = (j - 2) * this.tileSize
            }
        }
    }
    update(){

        //更新摩擦力和加速度
        this.vx += this.mx

        //限制最大速度
        if (Math.abs(this.vx) >= this.maxSpeed) {
            this.vx = parseInt(this.maxSpeed)
        }

        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        } else {
            this.x += this.vx
        }
        //更新重力
        this.updateGravity()

        this.frameNumber --
        if (this.frameNumber == 0) {
            this.frameNumber = 20
            this.frameIndex++
            this.frameIndex %= 3
            // this.frameIndex = ( this.frameIndex + 1 ) % this.frames().length
            // this.texture = this.frames()[this.frameIndex]
        }
    }
    move(x, keyStatus){
        this.flipx = (x < 0)
        // this.x += x

        let s = 1 * x 
        if (keyStatus = 'down') {
            this.vx += s 
            this.mx = -s / 2
        } else {

        }
    }
    changeAnimation(name){
        this.animationName = name 
    }
}