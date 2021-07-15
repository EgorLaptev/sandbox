'use strict';

export default class Player {

    static x;
    static y;

    static width = 50;
    static height = 100;

    static health = 100;
    static speed = 2;
    static jump = 100;

    static texture = '';

    static render(ctx) {

        const playerImage = new Image();
        playerImage.src = this.texture;

        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);

    }

}