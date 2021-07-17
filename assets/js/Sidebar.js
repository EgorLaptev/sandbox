'use strict';

import Cursor from "./Cursor.js";
import LargeBox from "./LargeBox.js";
import MediumBox from "./MediumBox.js";
import SmallBox from "./SmallBox.js";
import AppleBox from "./AppleBox.js";
import Barrel from "./Barrel.js";
import Orange from "./Orange.js";
import Apple from "./Apple.js";
import BlueChest from "./BlueChest.js";
import RedChest from "./RedChest.js";
import PurpleChest from "./PurpleChest.js";
import SuperChest from "./SuperChest.js";
import CartoonBox from "./CartoonBox.js";
import KittenCartoonBox from "./KittenCartoonBox.js";
import OpenCartoonBox from "./OpenCartoonBox.js";
import OpenLargeCartoonBox from "./OpenLargeCartoonBox.js";

export default class Sidebar {

    static opened = false;

    static element = document.getElementById('entitiesMenu');

    static entities = [
        LargeBox,
        MediumBox,
        SmallBox,
        AppleBox,
        Barrel,
        Orange,
        Apple,
        BlueChest,
        RedChest,
        PurpleChest,
        SuperChest,
        CartoonBox,
        KittenCartoonBox,
        OpenCartoonBox,
        OpenLargeCartoonBox
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