const apiStatus = require("../constants/ApiStatus");
const httpStatus = require("../constants/HttpStatus");
const response = require("../responses/response");
const AuthenService = require("../services/AuthenService");
const validatorInput = require("../ultils/validatorInput");


module.exports = {
    login: async (req, res) => {
        try {
            const isMissingParam = validatorInput(req, ["email", "password"]);
            if (isMissingParam.status === "ERROR") {
                return response(res, httpStatus.BAD_REQUEST, apiStatus.INVALID_PARAM, isMissingParam.message, {})
            }
            const isTeacher = Boolean(req.body.isTeacher)
            let user
            if(isTeacher) {
                user = await Teacher.findOne({
                    email: req.body.email,
                    isdeleted: false,
                })
            }
            else {
                user = await Student.findOne({
                    email: req.body.email,
                    isdeleted: false
                })
            }
            
            if(!user) {
                return response(res, httpStatus.UNAUTHORIZED, apiStatus.AUTH_ERROR, `Cant find email with: ${req.body.email}`)
            }
            await sails.helpers.passwords.checkPassword(req.body.password, user.password)
            .intercept('incorrect', 'badCombo');
            const token = AuthenService.signToken(user.id, isTeacher)
            delete user.password
            return response(res, httpStatus.OK, apiStatus.SUCCESS,"Success", {
                data: user,
                token: token
            })
        } catch (error) {
            response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message)
        }

    },
}