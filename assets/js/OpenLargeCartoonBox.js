'use strict';

import Entity from "./Entity.js";

export default class OpenLargeCartoonBox extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/open-large-cartoon-box.png';

    static width  = 200;
    static height = 125;

    constructor(x, y) {

        super(x, y);

        this.width  = OpenLargeCartoonBox.width;
        this.height = OpenLargeCartoonBox.height;

        this.texture = 'assets/media/images/entities/open-large-cartoon-box.png';

        OpenLargeCartoonBox.list.push(this);
    }

}