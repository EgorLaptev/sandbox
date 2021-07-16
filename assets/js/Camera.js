'use strict';

export default class Camera {

    static x = 0;
    static y = 0;

    static speed = 10

    static observed = null;

    static init( observed, { width  = 1920, height = 1080,  limit = { x: 1920, y: 1080 }, scrollEdge = 100 } ) {

        this.observed = observed;

        this.width      = width;
        this.height     = height;
        this.limit      = limit;
        this.scrollEdge = scrollEdge;
        
    }

}