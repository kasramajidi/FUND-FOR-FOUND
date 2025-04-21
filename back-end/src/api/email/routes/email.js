'use strict';

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/email/send-verification',
            handler: 'email.sendVerificationCode',
            config: {
                policies: [],
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/email/verify-code',
            handler: 'email.verifyCode',
            config: {
                policies: [],
                auth: false,
            },
        },
    ],
}; 