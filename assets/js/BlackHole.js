'use strict';

import Entity from "./Entity.js";

export default class Blackhole extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/black-hole.png';

    static width  = 150;
    static height = 150;

    constructor(x, y) {

        super(x, y);

        this.width  = Blackhole.width;
        this.height = Blackhole.height;

        this.texture = 'assets/media/images/entities/black-hole.png';

        Blackhole.list.push(this);

    }

}