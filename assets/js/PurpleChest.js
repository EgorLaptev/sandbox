'use strict';

import Entity from "./Entity.js";

export default class PurpleChest extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/purple-chest.png';

    static width  = 125;
    static height = 90;

    constructor(x, y) {

        super(x, y);

        this.width  = PurpleChest.width;
        this.height = PurpleChest.height;

        this.texture = 'assets/media/images/entities/purple-chest.png';

        PurpleChest.list.push(this);
    }

}