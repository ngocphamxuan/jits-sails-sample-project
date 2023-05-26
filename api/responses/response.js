module.exports = (res, httpStatus, apiStatus, message, data) => {
    return res.status(httpStatus).json({
        apiStatus,
        message,
        data
    })
}