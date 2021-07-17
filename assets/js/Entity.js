'use strict';

import Controller from "./Controller.js";

export default class Entity {

    static list = [];

    dragged = false;

    velocity = {
        x: 0,
        y: 0
    }

    constructor() {
        Controller.dragndrop(this);
        Entity.list.push(this);
    }

}