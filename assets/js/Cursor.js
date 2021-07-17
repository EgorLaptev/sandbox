'use strict';

import Camera from "./Camera.js";

export default class Cursor {

    static insert = null;

    static x = 0;
    static y = 0;

    static width = 25;
    static height = 25;

    static texture = 'assets/media/images/cursor/cursor.png';

    static init() {

        document.addEventListener('click', e => {
            if ( this.insert ) {
                new this.insert(e.clientX - this.insert.width/2 + Camera.x, e.clientY - this.insert.height/2 + Camera.y);
                this.insert = null; // Limit: 1 click
            }
        });

    }

    static render( ctx ) {

        const cursorTexture = new Image();
        cursorTexture.src = this.texture;

        ctx.drawImage( cursorTexture, this.x, this.y, this.width, this.height );

    }

}

