'use strict';

export default class Box {

    static list = [];

    texture = 'assets/media/images/boxes/medium-box.png';

    width  = 200;
    height = 150;

    constructor(x, y) {

        this.x = x;
        this.y = y;

        Box.list.push(this);

    }

    render(ctx) {

        const boxTexture = new Image();
        boxTexture.src = this.texture;

        ctx.drawImage(boxTexture, this.x, this.y, this.width, this.height);

    }

}