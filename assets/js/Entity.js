'use strict';

export default class Entity {

    static list = [];

    constructor() {
        Entity.list.push(this);
    }


}