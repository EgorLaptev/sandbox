'use strict';

export default class World {

    static config = {};

    static paused = false;

    static cnv = document.getElementById('world');
    static ctx = this.cnv.getContext('2d');

    static init() {

        this.cnv.width  = window.innerWidth;
        this.cnv.height = window.innerHeight;

        this.listeners();
        this.loop();

    }

    static loop() {

        if ( !World.paused ) {
            World.render();
        }

        requestAnimationFrame(World.loop) ;

    }

    static render() {

        const cnv = this.cnv,
              ctx = this.ctx;

        /* Clear world */
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        /* Ground */
        ctx.fillStyle = '#090909';
        ctx.fillRect(0, cnv.height - 50, cnv.width, cnv.height);

    }

    static listeners() {

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        })

    }

}