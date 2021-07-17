'use strict';

import Box from "./Box.js";

export default class LargeBox extends Box {

    static list = [];

    static texture = 'assets/media/images/boxes/large-box.png';

    static width  = 350;
    static height = 250;

    constructor(x, y) {

        super(x, y);

        this.width  = LargeBox.width;
        this.height = LargeBox.height;

        this.texture = 'assets/media/images/boxes/large-box.png';

        LargeBox.list.push(this);

    }

}