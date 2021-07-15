'use strict';

export default class Player {

    static x = 150;
    static y;

    static scale = .8;

    static _status = 'stand';

    static spriteArea = {
        'shoot': { x: 0, y: 0, width: 220, height: 355 },
        'hands_up': { x: 220, y: 0, width: 125, height: 355 },
        'stand': { x: 345, y: 0, width: 117, height: 355 },
        'walk_1': { x: 460, y: 0, width: 117, height: 355 },
        'walk_2': { x: 575, y: 0, width: 117, height: 355 },
        'die': { x: 0, y: 357, width: 370, height: 90 },
    }

    static width = 115;
    static height = 355;

    static health = 100;
    static speed = 5;
    static jump = 100;

    static texture = 'assets/media/images/sprites/man/sprite.png';

    static setStatus(status, cnv) {

        this._status = status;

        this.width = this.spriteArea[status].width;
        this.height = this.spriteArea[status].height;

        this.y = cnv.height - this.height * this.scale - 50;

    }

    static render(ctx) {

        const playerImage = new Image();
        playerImage.src = this.texture;

        ctx.drawImage(
            playerImage,
            this.spriteArea[this._status].x,
            this.spriteArea[this._status].y,
            this.width, this.height,
            this.x, this.y,
            this.width * this.scale, this.height * this.scale
        );

    }

}