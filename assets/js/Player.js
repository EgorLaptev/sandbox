'use strict';

export default class Player {

    static x = 150;
    static y;

    static scale = 0.75;

    static _status   = 'stand';
    static alternate = false;

    /* Sprite's map */
    static spriteArea = {
        'shoot':    { x: 0, y: 0, width: 220, height: 355 },
        'hands_up': { x: 221, y: 0, width: 123, height: 355 },
        'stand':    { x: 346, y: 0, width: 117, height: 355 },
        'walk_1':   { x: 460, y: 0, width: 117, height: 355 },
        'walk_2':   { x: 575, y: 0, width: 115, height: 355 },
        'die':      { x: 0, y: 357, width: 370, height: 90 },
        'lie':     { x: 0, y: 447, width: 420, height: 90 },
    }

    static width    = 115;
    static height   = 355;

    static health     = 100;
    static speed      = 5;
    static jumpHeight = 100;

    static jumping = false;
    static lying   = false;

    static texture = 'assets/media/images/sprites/man2.png';

    static setStatus(status, cnv, alternate = this.alternate) {

        if ( this.jumping && status !== 'hands_up' ) return false;

        this._status = status;

        this.width = this.spriteArea[status].width;
        this.height = this.spriteArea[status].height;

        this.alternate = alternate;

        if (!this.jumping) this.y = cnv.height - this.height * this.scale - 50;

    }

    static render(ctx) {

        const playerImage = new Image();
        playerImage.src = this.texture;

        let offsetX = this.alternate ? this.spriteArea[this._status].x + 691 : this.spriteArea[this._status].x;

        ctx.drawImage(
            playerImage,
            offsetX,
            this.spriteArea[this._status].y,
            this.width, this.height,
            this.x, this.y,
            this.width * this.scale, this.height * this.scale
        );

    }

    static jump( cnv ) {

        if (this.jumping) return false;
        this.jumping = true;

        this.setStatus('hands_up', cnv);

        this.y -= this.jumpHeight;

        setTimeout( () => this.jumping = false, 1000);

    }

    static lie( cnv ) {
        if (this.jumping) return false;
        this.lying = true;
        this.setStatus('lie', cnv);

        clearTimeout(this.lieDelay);
        this.lieDelay = setTimeout( ()=> this.lying = false, 100 );

    }

}