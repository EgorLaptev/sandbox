'use strict';

import Entity from "./Entity.js";
import Notification from "./Notification.js";

export default class Blackhole extends Entity {

    static list = [];

    static texture = 'assets/media/images/entities/black-hole.png';

    static width  = 150;
    static height = 150;

    static = true;

    constructor(x, y) {

        new Notification('Black holes attract other entities');

        super(x, y);

        this.width  = Blackhole.width;
        this.height = Blackhole.height;

        this.texture = 'assets/media/images/entities/black-hole.png';

        Blackhole.list.push(this);

    }

}