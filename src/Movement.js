class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        })
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)
        // animations
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        })
        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        })
        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        cursors = this.input.keyboard.createCursorKeys()
        this.player.body.setSize(32, 32).setOffset(8, 16)
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'
        // handle left and right
        if(cursors.left.isDown){
            playerVector.x = -1
        }
        else if (cursors.right.isDown){
            playerVector.x += 1
            playerDirection = 'left'
        }
        // handle up and down
        if(cursors.up.isDown){
            playerVector.y = -1
            playerDirection = 'up'
        }
        else if(cursors.down.isDown){
            playerVector.y = 1
            playerDirection = 'down'
        }

        playerVector.normalize()

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true)

        // this.player.x += playerVector.x * this.PLAYER_VELOCITY
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY
    }
}