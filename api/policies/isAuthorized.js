const jwt = require("jsonwebtoken");
const apiStatus = require("../constants/ApiStatus");
const httpStatus = require("../constants/HttpStatus");
const response = require("../responses/response");
const keys = require("../../config/keys");


module.exports = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (bearerToken === undefined || !bearerToken.startsWith('Bearer ')) 
            response(res, httpStatus.UNAUTHORIZED,apiStatus.AUTH_ERROR, "Invalid Token")
        
        const token = (bearerToken && bearerToken.split(' ')[1]);
        if (!token) return response(res, httpStatus.UNAUTHORIZED, apiStatus.OTHER_ERROR, "Invalid Token", {})
        const decode =await jwt.verify(token,keys.JWt_SECRET_KEY)
        let currentUser
        if(decode.isTeacher) 
            currentUser =  await Teacher.findOne({ id: decode.id })
        else currentUser = await Student.findOne({id: decode.id})
        if (!currentUser)
            throw new CusError(apiStatus.AUTH_ERROR, httpStatus.UNAUTHORIZED, 'Cant get customer from token');

        req.userId = currentUser.id;
        req.role = currentUser.role
        next();
    } catch (error) {
        response(res, httpStatus.UNAUTHORIZED, apiStatus.AUTH_ERROR, error.message)
    }
}