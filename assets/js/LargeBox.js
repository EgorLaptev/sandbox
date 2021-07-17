'use strict';

import Box from "./Box.js";

export default class LargeBox extends Box {

    static list = [];

    texture = 'assets/media/images/boxes/large-box.png';

    static width  = 350;
    static height = 250;

    constructor(x, y) {

        super(x, y);

        this.width  = LargeBox.width;
        this.height = LargeBox.height;

        LargeBox.list.push(this);

    }

}