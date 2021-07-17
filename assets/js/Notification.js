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
        time: 5 // In seconds
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
            `;

        /* Adding notification */
        document.body.appendChild(notification);
        Notification.list.push(notification);

        /* Fade in effect */
        setTimeout( () => notification.style.opacity = '1', 0);

        /* Close notification */
        setTimeout( () => {

            /* Fade out effect */
            notification.style.opacity = '0';

            setTimeout( this.close, 1000);

        }, Notification.config.time * 1000);

    }

    close() {


        /* Delete notification */
        Notification.list.shift().remove();

        /* Moving other notifications up */
        for ( let i=0;i<Notification.list.length;i++)
            Notification.list[i].style.top = `${ 5 + i * 55 }px`;

    }

}