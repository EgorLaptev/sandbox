'use strict';



import Player from "./Player.js";
import Controller from "./Controller.js";

export default class World {

    static player = Player;
    static controller = Controller;

    static config = {
        floor: {
          height: 50,
          color: '#090909'
        },
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
        this.player.setStatus('stand', this.cnv, false);

        /* Controller */
        this.controller.init( this.player );

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
        ctx.fillStyle = this.config.floor.color;
        ctx.fillRect(0, cnv.height - this.config.floor.height, cnv.width, cnv.height);

        // Entities
        /* Player */
        this.player.render(ctx);

    }

    static listeners() {

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        })

        // Player control
        Controller.default( () => {
            this.player.setStatus('stand', this.cnv);
        });

        /* Left */
        Controller.bind(65, () => {
            this.player.setStatus( 'walk_2', this.cnv, true);
            this.player.x -= this.player.speed;
        });
        /* Right */
        Controller.bind(68, () => {
            this.player.setStatus('walk_2', this.cnv, false);
            this.player.x += this.player.speed;
        });
        /* Jump */
        Controller.bind(32, () => this.player.jump( this.cnv ) );

    }

}