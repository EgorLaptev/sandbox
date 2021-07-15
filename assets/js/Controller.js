'use strict';

export default class Controller {

    static controlled   = null;
    static _pressedKeys = [];
    static _binds       = [];

    static init(controlled) {

        this.controlled = controlled;

        document.addEventListener('keydown', e => this._pressedKeys[e.keyCode] = true );
        document.addEventListener('keyup',  e => this._pressedKeys[e.keyCode] = false );

        this._watcher();

    }

    static bind( keyCode, callback ) {
        this._binds.push({ keyCode: keyCode, callback });
    }

    static _watcher() {

        for ( const bind of Controller._binds )
            if ( Controller._pressedKeys[bind.keyCode] ) bind.callback();

        requestAnimationFrame(Controller._watcher);

    }

}