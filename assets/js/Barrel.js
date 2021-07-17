'use strict';

import Entity from "./Entity.js";

export default class Barrel extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/barrel.png';

    static width  = 125;
    static height = 150;

    constructor(x, y) {

        super(x, y);

        this.width  = Barrel.width;
        this.height = Barrel.height;

        this.texture = 'assets/media/images/entities/barrel.png';

        Barrel.list.push(this);
    }

}