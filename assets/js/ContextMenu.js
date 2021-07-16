'use strict';

import Box from "./Box.js";
import Cursor from "./Cursor.js";

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
                    <img src="assets/media/images/boxes/medium-box.png" alt="medium box" class="menu__preview">
                </li>
            `;

        const menuPreviews = this.element.querySelectorAll('.menu__preview');

        for ( let i=0; i < menuPreviews.length; i++ ) {

            menuPreviews[i].style =
                `
                    height: 50px;
                    width: 75px;
                    object-fit: contain;
                    cursor: pointer;
                `;

            menuPreviews[i].addEventListener('click', e => {
                setTimeout( () => Cursor.insert = Box, 250);
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