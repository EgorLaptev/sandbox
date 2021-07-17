'use strict';

import Entity from "./Entity.js";

export default class RestChest extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/red-chest.png';

    static width  = 150;
    static height = 100;

    constructor(x, y) {

        super(x, y);

        this.width  = RestChest.width;
        this.height = RestChest.height;

        this.texture = 'assets/media/images/entities/red-chest.png';

        RestChest.list.push(this);
    }

}