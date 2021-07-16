'use strict';

export default class Cursor {

    static insert = null;

    static x = 0;
    static y = 0;

    static width = 25;
    static height = 25;

    static defaultTexture = 'assets/media/images/cursor/cursor.png';
    static texture = '';

    static set( insert ) {

        this.insert = insert;

        this.texture = insert.texture;

        this.width  = insert.width;
        this.height = insert.height;

    }

    static render( ctx ) {

        const cursorTexture = new Image();
        cursorTexture.src = this.texture ? this.texture : this.defaultTexture;

        ctx.drawImage( cursorTexture, this.x, this.y, this.width, this.height );

    }

}

