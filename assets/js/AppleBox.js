'use strict';

import Entity from "./Entity.js";

export default class AppleBox extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/apple-box.png';

    static width  = 100;
    static height = 75;

    constructor(x, y) {

        super(x, y);

        this.width  = AppleBox.width;
        this.height = AppleBox.height;

        this.texture = 'assets/media/images/entities/apple-box.png';

        AppleBox.list.push(this);

    }

}