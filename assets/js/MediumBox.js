'use strict';

import Entity from "./Entity.js";

export default class MediumBox extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/medium-box.png';

    static width  = 200;
    static height = 150;

    constructor(x, y) {

        super(x, y);

        this.width  = MediumBox.width;
        this.height = MediumBox.height;

        this.texture = 'assets/media/images/entities/medium-box.png';

        MediumBox.list.push(this);

    }

}