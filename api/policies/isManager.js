const apiStatus = require("../constants/ApiStatus")
const httpStatus = require("../constants/HttpStatus")
const response = require("../responses/response")

module.exports = (req, res, next) => {
    if(req.role === 'Manager') next()
    else return response(res, httpStatus.FORBIDDEN, apiStatus.OTHER_ERROR, 'You dont have permission')
}