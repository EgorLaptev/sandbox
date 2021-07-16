'use strict';

import ContextMenu  from "./ContextMenu.js";
import Controller   from "./Controller.js";
import Camera       from "./Camera.js";
import Cursor       from "./Cursor.js";
import Entity       from "./Entity.js";
import Player       from "./Player.js";
import Box          from "./Box.js";

export default class World {

    static player     = new Player;
    static controller = Controller;
    static camera     = Camera;
    static cursor     = Cursor;

    static cnv = document.getElementById('world');
    static ctx = this.cnv.getContext('2d');

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
        },
        bg: {
            color: '#222',
            gradients: 'repeating-linear-gradient(90deg, transparent, transparent 5px, #111 5px, #111 100px), repeating-linear-gradient(0deg, transparent, transparent 5px, #111 5px, #111 100px)',
            src: 'assets/media/images/bg.PNG',
            offset: {
                x: 0,
                y: 0
            }
        },
        map: {
            width: 250,
            height: this.cnv.height
        },
        gravity: {
            power: .6,
            maxPower: 25
        }
    };

    static paused = false;

    static init() {

        /* Canvas options */
        this.cnv.width  = window.innerWidth;
        this.cnv.height = window.innerHeight;
        this.cnv.style.background = `${ this.config.bg.gradients } ${ this.config.bg.color }`;
        if ( this.config.bg.src ) this.cnv.style.background = `${ this.config.bg?.color } url( ${ this.config.bg.src } ) ${ this.config.bg.offset.x }px ${ this.config.bg.offset.y }px`;

        /* Player */
        this.player.y = this.cnv.height - 50 - this.player.height;
        this.player.setStatus('stand', this.cnv, false);

        /* Controller */
        this.controller.init( this.player, this.camera );

        /* Cursor */
        this.cursor.init();

        /* Context menu */
        ContextMenu.init();

        /* Camera */
        this.camera.init( this.player, {
            width: this.cnv.width,
            height: this.cnv.height,
            scrollEdge: 100,
            limit: {
                x: this.cnv.width * 2,
                y: this.cnv.height * 1.5
            },
        });

        this.listeners();
        this.loop();

    }

    static loop() {

        if ( !World.paused ) {
            World.physic();
            World.render();
        }

        requestAnimationFrame(World.loop) ;

    }

    static render() {


        const cnv = this.cnv,
              ctx = this.ctx;

        if ( this.config.bg.src )
            cnv.style.background = `
            ${ this.config.bg?.color } 
            url( ${ this.config.bg.src } ) 
            ${ this.config.bg.offset.x }px ${ this.config.bg.offset.y }px `;

        /* Clear world */
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        /* Player */
        this.player.render(ctx, this.camera);

        /* Boxes */
        for ( let i=0; i < Box.list.length; i++)
            Box.list[i].render( ctx, this.camera );

        /* Ground */
        ctx.fillStyle = this.config.floor.color;
        ctx.fillRect(0, cnv.height - this.config.floor.height - this.camera.y, cnv.width, cnv.height);

        /* Cursor */
        this.cursor.render( ctx );

    }

    static physic() {

        const cnv    = this.cnv,
              config = this.config;

        for ( let i=0; i < Entity.list.length; i++ ) {

            let entity = Entity.list[i];

            // Gravity

            /* Overclocking */
            if ( entity.y + entity.height < cnv.height - config.floor.height && !entity.dragged) {
                if ( entity.velocity.y < config.gravity.maxPower ) {
                    entity.velocity.y += config.gravity.power;
                }
            } else entity.velocity.y = 0;

            /* Falling */
            entity.y += entity.velocity.y;

            /* Stop falling */
            if ( entity.y + entity.height >= cnv.height - config.floor.height ) {
                entity.y = cnv.height - config.floor.height - entity.height;
            }

        }

    }

    static pause() {
        this.paused = !this.paused;
    }

    static listeners() {


        // General

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        });


        // Player control

        this.controller.default( () => {

            if ( !this.player.lying && !this.player.jumping )
                this.player.setStatus('stand', this.cnv);

        });

        /* Left */
        this.controller.bind(65, () => {

            if ( this.player.x <= 0 ) return false;

            if ( this.player.x - this.camera.x < this.camera.scrollEdge && this.player.x - this.camera.scrollEdge >= 0 ) {
                this.camera.x -= this.player.speed;
                this.config.bg.offset.x += this.player.speed;
            }

            this.player.x -= this.player._status === 'lie' ? this.player.speed/2 : this.player.speed;
            if ( this.player.jumping ) this.player.setStatus( 'hands_up', this.cnv, true);
            this.player.setStatus( 'walk_2', this.cnv, true);

        });

        /* Right */
        this.controller.bind(68, () => {

            if ( this.player.x + this.player.width >= this.camera.limit.x ) return false;

            if ( this.player.x - this.camera.x + this.player.width > this.camera.width - this.camera.scrollEdge && this.player.x + this.player.width + this.camera.scrollEdge <= this.camera.limit.x ) {
                this.camera.x += this.player.speed;
                this.config.bg.offset.x -= this.player.speed;
            }

            this.player.x += this.player._status === 'lie' ? this.player.speed/2 : this.player.speed;
            if ( this.player.jumping ) this.player.setStatus('hands_up', this.cnv, false);
            this.player.setStatus('walk_2', this.cnv, false);

        });

        /* Jump */
        this.controller.bind(32, () => this.player.jump( this.cnv ) );
        this.controller.bind(87, () => this.player.jump( this.cnv ) );

        /* Lie */
        this.controller.bind(83, () => this.player.lie( this.cnv ) );


        // Camera control

        /* Camera - left */
        this.controller.bind(37, () => {
            if( this.camera.x > 0 ) {
                this.camera.x -= this.camera.speed;
                this.config.bg.offset.x += this.camera.speed;
            }

        });

        /* Camera - top */
        this.controller.bind(38, () => {
            if( -this.camera.y + this.camera.height < this.camera.limit.y ) {
                this.camera.y -= this.camera.speed;
                this.config.bg.offset.y += this.camera.speed;
            }

        });

        /* Camera - right */
        this.controller.bind(39, () => {
            if( this.camera.x + this.camera.width < this.camera.limit.x ) {
                this.camera.x += this.camera.speed;
                this.config.bg.offset.x -= this.camera.speed;
            }
        });

        /* Camera - down */
        this.controller.bind(40, () => {
            if( this.camera.y < 25) {
                this.camera.y += this.camera.speed;
                this.config.bg.offset.y -= this.camera.speed;
            }
        });


        /* Cursor */
        this.cnv.addEventListener('mousemove', e => {

            this.cursor.x = e.clientX - this.cursor.width/2;
            this.cursor.y = e.clientY - this.cursor.height/2;

        })

        this.cnv.addEventListener('contextmenu', e => {
            e.preventDefault();
            ContextMenu.open(e.clientX, e.clientY);
            setTimeout(() => ContextMenu.close(), 2500);
        });

        /* Move entities */
        for ( let i=0; i < Entity.list.length; i++)
            this.controller.dragndrop( Entity.list[i] );

    }

}