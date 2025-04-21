'use strict';

const verificationCodes = new Map();

module.exports = {
    saveCode(email, code) {
        console.log('Saving code:', { email, code }); // برای دیباگ
        verificationCodes.set(email, {
            code: code.toString(), // تبدیل کد به رشته
            timestamp: Date.now(),
            expiresIn: 5 * 60 * 1000 // 5 minutes
        });
    },

    verifyCode(email, code) {
        console.log('Verifying code:', { email, code }); // برای دیباگ
        const storedData = verificationCodes.get(email);

        if (!storedData) {
            console.log('No code found for email:', email);
            return { isValid: false, message: 'Verification code not found' };
        }

        // Check if code is expired
        if (Date.now() - storedData.timestamp > storedData.expiresIn) {
            console.log('Code expired for email:', email);
            verificationCodes.delete(email);
            return { isValid: false, message: "The verification code has expired" };
        }

        // Check if code matches
        if (storedData.code !== code.toString()) {
            console.log('Code mismatch:', { stored: storedData.code, provided: code });
            return { isValid: false, message: 'Verification code is incorrect' };
        }

        // Remove the code after successful verification
        console.log('Code verified successfully for email:', email);
        verificationCodes.delete(email);
        return { isValid: true, message: 'The verification code is correct'};
    }
}; 