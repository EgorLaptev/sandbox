'use strict';

import Box from "./Box.js";

export default class AppleBox extends Box {

    static list = [];

    texture = 'assets/media/images/boxes/apple-box.png';

    static width  = 100;
    static height = 75;

    constructor(x, y) {

        super(x, y);

        this.width  = AppleBox.width;
        this.height = AppleBox.height;

        AppleBox.list.push(this);

    }

}