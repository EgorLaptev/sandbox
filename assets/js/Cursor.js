'use strict';

export default class Cursor {

    static insert = null;

    static x = 0;
    static y = 0;

    static width = 25;
    static height = 25;

    static texture = 'assets/media/images/cursor/cursor.png';

    static init() {

        document.addEventListener('click', e => {
            if ( this.insert ) new this.insert(e.clientX - this.insert.width/2, e.clientY - this.insert.height/2);
        });

    }

    static render( ctx ) {

        const cursorTexture = new Image();
        cursorTexture.src = this.texture;

        ctx.drawImage( cursorTexture, this.x, this.y, this.width, this.height );

    }

}

