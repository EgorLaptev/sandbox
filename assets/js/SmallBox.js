'use strict';

import Box from "./Box.js";

export default class SmallBox extends Box {

    static list = [];

    texture = 'assets/media/images/boxes/small-box.png';

    static width  = 100;
    static height = 75;

    constructor(x, y) {

        super(x, y);

        this.width  = SmallBox.width;
        this.height = SmallBox.height;

        SmallBox.list.push(this);
    }

}