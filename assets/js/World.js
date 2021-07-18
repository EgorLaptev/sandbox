'use strict';

import Sidebar      from "./Sidebar.js";
import Controller   from "./Controller.js";
import Camera       from "./Camera.js";
import Cursor       from "./Cursor.js";
import Entity       from "./Entity.js";
import Player       from "./Player.js";
import Notification from "./Notification.js";
import collision    from "./collision.js";

export default class World {

    static player     = null;
    static controller = Controller;
    static camera     = Camera;
    static cursor     = Cursor;

    static cnv = document.getElementById('world');
    static ctx = this.cnv.getContext('2d');

    static config = {
        audio: {
            src: '',
            volume: 1,
            repeat: true
        },
        bg: {
            color: '#222',
            src: 'assets/media/images/bg.PNG',
            offset: {
                x: 0,
                y: 0
            }
        },
        floor: {
          height: 50,
          color: '#090909'
        },
        map: {
            width: 250,
            height: this.cnv.height
        },
        gravity: {
            power: 1,
            maxPower: 25
        },
        friction: 0.95,
        attraction: 1
    };

    static paused = false;

    static init() {

        /* Canvas options */
        this.cnv.width  = window.innerWidth;
        this.cnv.height = window.innerHeight;
        if ( this.config.bg.src ) this.cnv.style.background = `${ this.config.bg?.color } url( ${ this.config.bg.src } ) ${ this.config.bg.offset.x }px ${ this.config.bg.offset.y }px`;

        /* Player */
        this.player = new Player(50, this.cnv.height - 50 - Player.height);
        this.player.setStatus('stand', this.cnv, false);

        /* Controller */
        this.controller.init( this.player, this.camera );

        /* Context menu */
        Sidebar.init();

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

        this.notifications();
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

        /* Background */
        if ( this.config.bg.src )  cnv.style.backgroundPosition = `${ this.config.bg.offset.x }px ${ this.config.bg.offset.y }px`;

        /* Clear world */
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        /* Entities */
        for ( let i=0; i < Entity.list.length; i++)
            Entity.list[i].render( ctx, this.camera);

        /* Ground */
        ctx.fillStyle = this.config.floor.color;
        ctx.fillRect(0, cnv.height - this.config.floor.height - this.camera.y, cnv.width, cnv.height);

    }

    static physic() {

        for ( let i=0; i < Entity.list.length; i++ ) {

            let entity = Entity.list[i];

            entity.x += entity.velocity.x;
            entity.y += entity.velocity.y;

            this.friction(entity);
            this.gravity(entity);
            this.collisions(entity);

        }

    }

    static friction(entity) {

        if ( entity.y + entity.height >= this.cnv.height - this.config.floor.height ) entity.velocity.x *= this.config.friction;

    }

    static gravity(entity) {

        /* Overclocking */
        if ( entity.y + entity.height < this.cnv.height - this.config.floor.height && !entity.dragged ) {

            if ( entity.velocity.y < this.config.gravity.maxPower) {
                entity.velocity.y += this.config.gravity.power;
            }

        } else entity.velocity.y = 0;

        /* Stop falling */
        if ( entity.y + entity.height >= this.cnv.height - this.config.floor.height ) {
            entity.y = this.cnv.height - this.config.floor.height - entity.height;
        }

    }

    static collisions(entity) {

    }

    static pause() {

        this.paused = !this.paused;
        this.controller.disabled = this.paused;

        /* Pause screen */
        this.ctx.fillStyle = 'rgba(0,0,0,.5)';
        this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);

    }

    static listeners() {


        // General

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        });

        document.addEventListener('keydown', e => {

            /* Esc - pause */
            if ( e.keyCode === 27 ) this.pause();

            /* E - spawn entity */
            if ( e.keyCode === 69 && this.cursor.insert) {

                let coll = false;

                console.log(coll);

                for (let i=0;i<Entity.list.length;i++)
                    if ( collision({
                        x: this.cursor.x - this.cursor.insert.width/2 + Camera.x,
                        y: this.cursor.y - this.cursor.insert.height/2 + Camera.y,
                        width: this.cursor.insert.width,
                        height: this.cursor.insert.height
                    }, Entity.list[i]) ) coll = true;


                if (!coll) new this.cursor.insert(this.cursor.x - this.cursor.insert.width/2 + Camera.x, this.cursor.y - this.cursor.insert.height/2 + Camera.y);

            }

            /* Q - open context menu */
            if ( e.keyCode === 81 ) {
                Sidebar.opened ? Sidebar.close() : Sidebar.open();
            }

        })

        // Player control
        this.controller.default( () => {

            if ( !this.player.lying && !this.player.jumping )
                this.player.setStatus('stand', this.cnv);

        });

        /* Left */
        this.controller.bind(65, () => {

            if ( this.player.x <= 0) return false;

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

            const x = e.clientX - this.cursor.width/2,
                  y = e.clientY - this.cursor.height/2;

            this.cursor.velocity.x = (x - this.cursor.x) * .3;
            this.cursor.velocity.y = (y - this.cursor.y) * .3;

            this.cursor.x = x;
            this.cursor.y = y;

        })

        this.cnv.addEventListener('contextmenu', e => {
            e.preventDefault();
        });

    }

    static notifications() {

        setTimeout( () => {
            new Notification('Arrow keys - for control camera ');
        }, 2500);

        setTimeout( () => {
           new Notification('W, A, S, D - To move');
        }, 5000);

        setTimeout( () => {
           new Notification('Q - to open side menu');
        }, 7500);

        setTimeout( () => {
           new Notification('E - to spawn entity');
        }, 10000);

    }

}