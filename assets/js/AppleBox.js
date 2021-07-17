'use strict';

import Box from "./Box.js";

export default class AppleBox extends Box {

    static list = [];

    static texture = 'assets/media/images/boxes/apple-box.png';

    static width  = 100;
    static height = 75;

    constructor(x, y) {

        super(x, y);

        this.width  = AppleBox.width;
        this.height = AppleBox.height;

        this.texture = 'assets/media/images/boxes/apple-box.png';

        AppleBox.list.push(this);

    }

}