'use strict';

import Entity from "./Entity.js";

export default class Stone extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/stone.png';

    static width  = 75;
    static height = 75;

    constructor(x, y) {

        super(x, y);

        this.width  = Stone.width;
        this.height = Stone.height;

        this.texture = 'assets/media/images/entities/stone.png';

        Stone.list.push(this);

    }

}