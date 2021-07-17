'use strict';

import Box from "./Box.js";

export default class MediumBox extends Box {

    static list = [];

    texture = 'assets/media/images/boxes/medium-box.png';

    static width  = 200;
    static height = 150;

    constructor(x, y) {

        super(x, y);

        this.width  = MediumBox.width;
        this.height = MediumBox.height;

        MediumBox.list.push(this);

    }

}