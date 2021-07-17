'use strict';

import Cursor from "./Cursor.js";
import LargeBox from "./LargeBox.js";
import MediumBox from "./MediumBox.js";
import SmallBox from "./SmallBox.js";
import AppleBox from "./AppleBox.js";

export default class ContextMenu {

    static opened = false;

    static element = document.getElementById('entitiesMenu');

    static open() {
        this.opened = true;
        this.element.style.display = 'grid';
    }

    static close() {
        this.opened = false;
        this.element.style.display = 'none';
    }

}