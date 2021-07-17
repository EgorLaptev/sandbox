'use strict';

import Entity from "./Entity.js";

export default class Orange extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/orange.png';

    static width  = 25;
    static height = 25;

    constructor(x, y) {

        super(x, y);

        this.width  = Orange.width;
        this.height = Orange.height;

        this.texture = 'assets/media/images/entities/orange.png';

        Orange.list.push(this);
    }

}