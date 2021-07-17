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
        time: 10 // In seconds
    }

    constructor(content) {

        const notification = document.createElement('div');
        notification.classList.add(Notification.config.class);

        notification.innerHTML = `${content}`;

        notification.style =
            `
                position: fixed;
                top: ${ 5 + Notification.list.length * 55 }px;
                right: 5px;
                padding: 15px;
                background: ${Notification.config.color};
                font-size: ${Notification.config.font.size};
                font-family: ${Notification.config.font.family};
                color: ${Notification.config.font.color};
            `;

        document.body.appendChild(notification);

        Notification.list.push(notification);

        setTimeout( () => {
            Notification.list.shift().remove();
        }, Notification.config.time * 1000);

    }

}