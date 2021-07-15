'use strict';

export default class Controller {

    static controlled   = null;
    static _pressedKeys = [];
    static _binds       = [];
    static _defaults    = [];

    static init(controlled) {

        this.controlled = controlled;

        document.addEventListener('keydown', e => this._pressedKeys[e.keyCode] = true );
        document.addEventListener('keyup',  e => this._pressedKeys[e.keyCode] = false );

        this._watcher();

    }

    /* Adding bind actions */
    static bind( keyCode, callback ) {
        this._binds.push({ keyCode: keyCode, callback });
    }

    /* Adding default actions */
    static default ( callback ) {
        this._defaults.push( callback );
    }

    static _watcher() {

        // Default actions
        for ( const def of Controller._defaults ) def();

        // Actions on bind
        for ( const bind of Controller._binds )
            if ( Controller._pressedKeys[bind.keyCode] ) bind.callback();

        requestAnimationFrame(Controller._watcher);

    }

}