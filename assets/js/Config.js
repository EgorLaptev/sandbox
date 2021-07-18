'use strict';

export default class Config {

    audio = {
        src: '',
        volume: 1
    }

    background = {
        color: '#222',
        src: 'assets/media/images/bg.PNG',
        offset: {
            x: 0,
            y: 0
        }
    }

    floor = {
        height: 50,
        color: '#090909'
    }

    map = {
        width: 250,
        height: 250
    }

    gravity = {
        power: 1,
        maxPower: 25
    }

    friction = .95;

}