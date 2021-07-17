'use strict';

import Entity from "./Entity.js";

export default class LargeBox extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/large-box.png';

    static width  = 350;
    static height = 250;

    constructor(x, y) {

        super(x, y);

        this.width  = LargeBox.width;
        this.height = LargeBox.height;

        this.texture = 'assets/media/images/entities/large-box.png';

        LargeBox.list.push(this);

    }

}