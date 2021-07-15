'use strict';



import Player from "./Player.js";

export default class World {

    static player = Player;

    static config = {
        audio: {
            /* Background audio */
            src: '',
            volume: 1,
            repeat: true
        }
    };

    static paused = false;

    static cnv = document.getElementById('world');
    static ctx = this.cnv.getContext('2d');

    static init() {

        /* Canvas options */
        this.cnv.width  = window.innerWidth;
        this.cnv.height = window.innerHeight;

        /* Player */
        this.player.y = this.cnv.height - 50 - this.player.height * this.player.scale;
        this.player.x = 150;
        this.player.setStatus('stand', this.cnv);

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

        // Entities
        /* Player */
        this.player.render(ctx);

    }

    static listeners() {

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        })

    }

}