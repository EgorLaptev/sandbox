'use strict';

import Entity from "./Entity.js";

export default class OpenCartoonBox extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/open-cartoon-box.png';

    static width  = 150;
    static height = 100;

    constructor(x, y) {

        super(x, y);

        this.width  = OpenCartoonBox.width;
        this.height = OpenCartoonBox.height;

        this.texture = 'assets/media/images/entities/open-cartoon-box.png';

        OpenCartoonBox.list.push(this);
    }

}