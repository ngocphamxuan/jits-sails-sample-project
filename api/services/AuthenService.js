const jwt = require("jsonwebtoken")

module.exports = {
    signToken: (id, isTeacher) => {
        JWT_SECRET = "08C5FE2D3DD5AE6071F3ED7F96068728691E7BB5ADE5E336AB0F5E1DBC2F01D6"
        //after 90days JWT will no longer be valid, even the signuter is correct and everything is matched.
        JWT_EXPIRES_IN = 90*60*60*24
        return jwt.sign({
            id: id,
            isTeacher: isTeacher
        }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    },
}