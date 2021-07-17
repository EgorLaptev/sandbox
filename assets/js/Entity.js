'use strict';

import Controller from "./Controller.js";

export default class Entity {

    static list = [];

    dragged = false;

    velocity = {
        x: 0,
        y: 0
    }

    constructor(x, y) {

        this.x = x;
        this.y = y;

        Controller.dragndrop(this);
        Entity.list.push(this);
    }

}