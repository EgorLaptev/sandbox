'use strict';

export default class Controller {

    static camera       = null
    static controlled   = null;
    static _pressedKeys = [];
    static _binds       = [];
    static _defaults    = [];
    static _mouseDown   = false;
    static _dragndropTargets = [];
    static disabled     = false;

    static init(controlled, camera) {

        this.controlled = controlled;
        this.camera     = camera;

        document.addEventListener('keydown', e => this._pressedKeys[e.keyCode] = true );
        document.addEventListener('keyup',  e => this._pressedKeys[e.keyCode] = false );

        document.addEventListener('mousedown', e => this._mouseDown = true );
        document.addEventListener('mouseup', e => {
            this._mouseDown = false;
            for ( let i=0; i < this._dragndropTargets.length; i++)  this._dragndropTargets[i].dragged = false;
        } );
        document.addEventListener('mousemove', e => {

            if ( this.disabled ) return false;

            if ( !this._mouseDown ) return false;

            for ( let i=0; i < this._dragndropTargets.length; i++) {

                if (
                    this._dragndropTargets[i].x - this.camera.x <= e.clientX &&
                    this._dragndropTargets[i].x - this.camera.x + this._dragndropTargets[i].width >= e.clientX &&
                    this._dragndropTargets[i].y - this.camera.y <= e.clientY &&
                    this._dragndropTargets[i].y - this.camera.y + this._dragndropTargets[i].height >= e.clientY
                ) {
                    this._dragndropTargets[i].dragged = true;
                    this._dragndropTargets[i].x =e.clientX + this.camera.x - this._dragndropTargets[i].width/2;
                    this._dragndropTargets[i].y =e.clientY + this.camera.y - this._dragndropTargets[i].height/2;
                }

            }

        });

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

        if ( !Controller.disabled ) {

            // Default actions
            for ( const def of Controller._defaults ) def();

            // Actions on bind
            for ( const bind of Controller._binds )
                if ( Controller._pressedKeys[bind.keyCode] ) bind.callback();

        }

        requestAnimationFrame(Controller._watcher);

    }

    static dragndrop( target ) {
        if ( this.disabled ) return false;
        this._dragndropTargets.push(target);
    }

}