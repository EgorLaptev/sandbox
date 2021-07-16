'use strict';

export default class Entity {

    static list = [];

    dragged = false;

    velocity = {
        x: 0,
        y: 0
    }

    constructor() {
        Entity.list.push(this);
    }

}