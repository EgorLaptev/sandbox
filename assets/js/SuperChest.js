'use strict';

import Entity from "./Entity.js";

export default class SuperChest extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/super-chest.png';

    static width  = 200;
    static height = 150;

    constructor(x, y) {

        super(x, y);

        this.width  = SuperChest.width;
        this.height = SuperChest.height;

        this.texture = 'assets/media/images/entities/super-chest.png';

        SuperChest.list.push(this);
    }

}