'use strict';

import Controller from "./Controller.js";

export default class Entity {

    static list = [];

    dragged = false;

    velocity = {
        x: 0,
        y: -10
    }

    weight = 1;
    static = false;
    onGround = false;

    constructor(x, y) {

        this.x = x;
        this.y = y;

        Controller.dragndrop(this);

        Entity.list.push(this);

    }

    render(ctx, camera) {

        const texture = new Image();
        texture.src = this.texture;

        ctx.drawImage(texture, this.x - camera.x, this.y - camera.y, this.width, this.height);

    }

    remove() {

        let indexInEntity = Entity.list.indexOf(this),
            indexInParent = this.constructor.list.indexOf(this);

        /* Deleting entity */
        Entity.list.splice(indexInEntity, 1);
        this.constructor.list.splice(indexInParent, 1);

    }

}