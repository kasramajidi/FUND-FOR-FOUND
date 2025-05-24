'use strict';

const nodemailer = require('nodemailer');
const verificationCodes = require('../services/verification-codes');

module.exports = {
    async sendVerificationCode(ctx) {
        const { email } = ctx.request.body;

        // Generate a 4-digit verification code
        const verificationCode = Math.floor(1000 + Math.random() * 9000);
        console.log('Generated code:', verificationCode); // برای دیباگ

        // Save the verification code
        verificationCodes.saveCode(email, verificationCode);

        // Save or update user information
        const userService = strapi.service('api::user.user');
        await userService.createOrUpdate({
            data: {
                email,
                verificationCode: verificationCode.toString(),
                isVerified: false
            }
        });

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "kasramajidy81@gmail.com",
                pass: "nnqtxfqyiflhsenw", // اینجا رمز عبور برنامه Gmail را قرار دهید
            },
        });

        const mailOptions = {
            from: "kasramajidy81@gmail.com",
            to: email,
            subject: "membership confirmation code",
            text: `Your verification code: ${verificationCode}`,
            html: `<h1>Your verification code: ${verificationCode}</h1>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return {
                message: 'Email sent successfully',
                status: 'success',
                code: verificationCode // اضافه کردن کد به پاسخ برای تست
            };
        } catch (error) {
            console.error('Email error:', error);
            return ctx.badRequest('Error sending email', { error });
        }
    },

    async verifyCode(ctx) {
        const { email, code } = ctx.request.body;

        if (!email || !code) {
            return ctx.badRequest("Email and verification code are required");
        }

        const result = verificationCodes.verifyCode(email, code);

        if (result.isValid) {
            // Update user verification status
            const userService = strapi.service('api::user.user');
            await userService.updateByEmail(email, {
                isVerified: true,
                verificationCode: null
            });
        }

        return result;
    }
}; 