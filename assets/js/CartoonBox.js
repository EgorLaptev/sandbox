'use strict';

import Entity from "./Entity.js";

export default class CartoonBox extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/cartoon-box.png';

    static width  = 175;
    static height = 125;

    constructor(x, y) {

        super(x, y);

        this.width  = CartoonBox.width;
        this.height = CartoonBox.height;

        this.texture = 'assets/media/images/entities/cartoon-box.png';

        CartoonBox.list.push(this);
    }

}