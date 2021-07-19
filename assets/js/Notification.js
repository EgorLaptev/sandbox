'use strict';

export default class Notification {

    static list = [];

    static config = {
        font: {
            size: 20,
            color: 'white',
            family: 'sans-serif'
        },
        color: '#222',
        class: 'game-notification',
        time: 10 // Live time in seconds
    }

    constructor(content) {

        const notification = document.createElement('div');
        notification.classList.add(Notification.config.class);

        /* Notification content */
        notification.innerHTML = `${content}`;

        /* Notification style */
        notification.style =
            `
                position: fixed;
                top: ${ 5 + Notification.list.length * 55 }px;
                right: 5px;
                padding: 15px;
                transition: 1s;
                opacity: 0;
                background: ${Notification.config.color};
                font-size: ${Notification.config.font.size};
                font-family: ${Notification.config.font.family};
                color: ${Notification.config.font.color};
                user-select: none;
                cursor: url(assets/media/images/cursor/cursor-active.png), auto;
            `;

        /* Adding notification */
        document.body.appendChild(notification);
        Notification.list.push(notification);

        notification.addEventListener('click', e => this.close( Notification.list.indexOf(e.target) ) );

        /* Fade in effect */
        setTimeout( () => notification.style.opacity = '1', 50);

        /* Close notification */
        setTimeout( () => {

            /* Fade out effect */
            notification.style.opacity = '0';

            setTimeout( this.close, 1000);

        }, Notification.config.time * 1000);

    }

    close( index = 0) {

        if ( !Notification.list.length ) return false;

        /* Delete notification */
        Notification.list.splice(index, 1)[0].remove();

        /* Moving other notifications up */
        for ( let i=0;i<Notification.list.length;i++)
            Notification.list[i].style.top = `${ 5 + i * 55 }px`;

    }

}