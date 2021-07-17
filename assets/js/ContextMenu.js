'use strict';

import Cursor from "./Cursor.js";
import LargeBox from "./LargeBox.js";
import MediumBox from "./MediumBox.js";
import SmallBox from "./SmallBox.js";
import AppleBox from "./AppleBox.js";

export default class ContextMenu {

    static opened = false;

    static element = document.getElementById('entitiesMenu');

    static entities = [
        LargeBox,
        MediumBox,
        SmallBox,
        AppleBox,
    ];

    static init() {

        for (let i=0; i<this.entities.length; i++) {

            const previewEntity = document.createElement('img');
            previewEntity.src = this.entities[i].texture;
            previewEntity.classList.add('preview');

            previewEntity.addEventListener('click', e => {
                Cursor.insert = this.entities[i];
                this.close();
            })

            this.element.appendChild(previewEntity);

        }

    }

    static open() {
        this.opened = true;
        this.element.style.display = 'grid';
    }

    static close() {
        this.opened = false;
        this.element.style.display = 'none';
    }

}