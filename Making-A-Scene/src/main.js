// Code Practice: Making a Scene
// Name: Victoria Ayala
// Date: 1/17/24

"use strict"

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true                                  //always use when using pixel art
    },
    scene: [ MainMenu, Play ]
}

let game = new Phaser.Game(config)