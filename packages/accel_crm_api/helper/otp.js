module.exports = {
    generateOTP: function () {
        return Math.floor(1000 + Math.random() * 9000);
    },
    generatePIN: function () {
        return Math.floor(100000000000 + Math.random() * 900000000000);
    },
    generatePassword: (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

};