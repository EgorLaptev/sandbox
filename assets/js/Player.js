'use strict';

import Entity from "./Entity.js";

export default class Player extends Entity {

    _status   = 'stand';
    alternate = false;

    /* Sprite's map */
    spriteArea = {
        'shoot':    { x: 0, y: 0, width: 220, height: 355 },
        'hands_up': { x: 221, y: 0, width: 123, height: 355 },
        'stand':    { x: 346, y: 0, width: 117, height: 355 },
        'walk_1':   { x: 460, y: 0, width: 117, height: 355 },
        'walk_2':   { x: 575, y: 0, width: 115, height: 355 },
        'die':      { x: 0, y: 357, width: 370, height: 90 },
        'lie':     { x: 0, y: 447, width: 420, height: 90 },
    }

    static width  = 115;
    static height = 355;

    width    = 115;
    height   = 355;

    health     = 100;
    speed      = 5;
    jumpHeight = 125;

    jumping = false;
    lying   = false;

    texture = 'assets/media/images/sprites/man2.png';

    constructor(x, y) {
        super(x, y)
        this.setStatus('stand', this.cnv, false);
    }

    setStatus(status, cnv, alternate = this.alternate) {

        if ( this.jumping && status !== 'hands_up' ) return false;

        this._status = status;

        this.width = this.spriteArea[status].width;
        this.height = this.spriteArea[status].height;

        this.alternate = alternate;

    }

     render(ctx, camera) {

        const playerImage = new Image();
        playerImage.src = this.texture;

        let offsetX = this.alternate ? this.spriteArea[this._status].x + 691 : this.spriteArea[this._status].x;

        ctx.drawImage(
            playerImage,
            offsetX,
            this.spriteArea[this._status].y,
            this.width, this.height,
            this.x - camera.x, this.y - camera.y,
            this.width, this.height
        );

    }

    jump( cnv ) {

        if (this.jumping) return false;
        this.jumping = true;

        this.setStatus('hands_up', cnv);

        this.y -= this.jumpHeight;

        const flightCheck = setInterval( () => {
            if ( this.y + this.height >= cnv.height - 50 ) {
                this.jumping = false;
                clearInterval(flightCheck);
            }
        }, 1000 / 30);

    }

    lie( cnv ) {
        if (this.jumping) return false;
        this.lying = true;
        this.setStatus('lie', cnv);
        this.y = cnv.height - this.height;
        setTimeout( ()=> this.lying = false, 100 );
    }

}