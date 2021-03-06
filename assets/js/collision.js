'use strict';

import Camera from "./Camera.js";

export default function collision(obj1, obj2) {
    return obj1.y <= (obj2.y + obj2.height)     &&
           obj1.x <= (obj2.x + obj2.width)      &&
           (obj1.x + obj1.width) >= obj2.x      &&
           (obj1.y + obj1.height) >= obj2.y     &&
           obj1 !== obj2
}