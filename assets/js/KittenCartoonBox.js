'use strict';

import Entity from "./Entity.js";

export default class KittenCartoonBox extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/kitten-cartoon-box.png';

    static width  = 150;
    static height = 100;

    constructor(x, y) {

        super(x, y);

        this.width  = KittenCartoonBox.width;
        this.height = KittenCartoonBox.height;

        this.texture = 'assets/media/images/entities/kitten-cartoon-box.png';

        KittenCartoonBox.list.push(this);
    }

}