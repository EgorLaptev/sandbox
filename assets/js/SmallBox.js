'use strict';

import Entity from "./Entity.js";

export default class SmallBox extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/small-box.png';

    static width  = 100;
    static height = 75;

    constructor(x, y) {

        super(x, y);

        this.width  = SmallBox.width;
        this.height = SmallBox.height;

        this.texture = 'assets/media/images/entities/small-box.png';

        SmallBox.list.push(this);
    }

}