'use strict';

import Entity from "./Entity.js";

export default class Box extends Entity {

    static list = [];

    texture = 'assets/media/images/boxes/medium-box.png';

    width  = 200;
    height = 150;

    constructor(x, y) {

        super();

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