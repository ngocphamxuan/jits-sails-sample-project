const apiStatus = require("../constants/ApiStatus")
const httpStatus = require("../constants/HttpStatus")
const response = require("../responses/response")

module.exports = (req, res, next) => {
    if (req.role === 'Manager') next()
    // role is student
    else if (req.role === undefined && req.params.id && req.userId == req.params.id){
        next()
    } 

    else response(res, httpStatus.FORBIDDEN, apiStatus.OTHER_ERROR, 'You dont have permission')
}