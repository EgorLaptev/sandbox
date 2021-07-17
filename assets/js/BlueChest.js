'use strict';

import Entity from "./Entity.js";

export default class BlueChest extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/blue-chest.png';

    static width  = 150;
    static height = 100;

    constructor(x, y) {

        super(x, y);

        this.width  = BlueChest.width;
        this.height = BlueChest.height;

        this.texture = 'assets/media/images/entities/blue-chest.png';

        BlueChest.list.push(this);
    }

}