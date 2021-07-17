'use strict';

import Entity from "./Entity.js";

export default class Box extends Entity {

    static list = [];

    constructor(x, y) {

        super(x, y);

        Box.list.push(this);

    }

    render(ctx, camera) {

        const boxTexture = new Image();
        boxTexture.src = this.texture;

        ctx.drawImage(boxTexture, this.x - camera.x, this.y - camera.y, this.width, this.height);

        return true;

    }

}