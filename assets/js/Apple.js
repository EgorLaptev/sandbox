'use strict';

import Entity from "./Entity.js";

export default class Apple extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/apple.png';

    static width  = 25;
    static height = 25;

    constructor(x, y) {

        super(x, y);

        this.width  = Apple.width;
        this.height = Apple.height;

        this.texture = 'assets/media/images/entities/apple.png';

        Apple.list.push(this);
    }

}