'use strict';

import Cursor from "./Cursor.js";
import LargeBox from "./LargeBox.js";
import MediumBox from "./MediumBox.js";
import SmallBox from "./SmallBox.js";
import AppleBox from "./AppleBox.js";

export default class ContextMenu {

    static element;

    static init() {

        this.element = document.createElement('ul');
        this.element.hidden = true;
        this.element.style =
            `
                position: absolute;
                background: #222;
                color: #111;
                font-size: 20px;
                font-family: sans-serif;
                list-style: none;
                padding: 20px;
                border-radius: 3px;
            `;
        
        this.element.innerHTML = 
            `
                <li class="menu__item">
                    <img src="assets/media/images/boxes/large-box.png" alt="medium box" class="menu__preview" data-insert="Box">
                </li>
                <li class="menu__item">
                    <img src="assets/media/images/boxes/medium-box.png" alt="medium box" class="menu__preview" data-insert="Box">
                </li>
                <li class="menu__item">
                    <img src="assets/media/images/boxes/small-box.png" alt="medium box" class="menu__preview" data-insert="Box">
                </li>
                <li class="menu__item">
                    <img src="assets/media/images/boxes/apple-box.png" alt="medium box" class="menu__preview" data-insert="Box">
                </li>
            `;

        const menuPreviews = this.element.querySelectorAll('.menu__preview');

        for ( let i=0; i < menuPreviews.length; i++ ) {

            menuPreviews[i].style =
                `
                    margin: 5px 0;
                    height: 50px;
                    width: 75px;
                    object-fit: contain;
                    cursor: pointer;
                `;

            menuPreviews[i].addEventListener('click', e => {

                let insert;

                switch (i) {
                    case 0: insert = LargeBox; break;
                    case 1: insert = MediumBox; break;
                    case 2: insert = SmallBox; break;
                    case 3: insert = AppleBox; break;
                }

                setTimeout( () => Cursor.insert = insert, 250);
                this.close();
            });

        }

        document.body.appendChild( this.element );

    }

    static open(x, y) {

        this.element.style.left = `${x}px`;
        this.element.style.top  = `${y}px`;

        this.element.hidden = false;

    }

    static close() {
        this.element.hidden = true;
    }

}