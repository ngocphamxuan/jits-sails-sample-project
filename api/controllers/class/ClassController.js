const apiStatus = require("../../constants/ApiStatus");
const httpStatus = require("../../constants/HttpStatus");
const validatorInput = require("../../ultils/validatorInput");
const response = require("../../responses/response");
const AuthenService = require("../../services/AuthenService");
module.exports = {
    // only manager
    create: async (req, res) => {
        try {
            const isMissingParam = validatorInput(req, ["name"]);
            if (isMissingParam.status === "ERROR") {
                return response(res, httpStatus.BAD_REQUEST, apiStatus.INVALID_PARAM, isMissingParam.message, {})
            }

            const newClass = await Class.create({
                ...req.body
            }).fetch();
            return response(res, httpStatus.CREATED, apiStatus.SUCCESS, "CREATED", newClass)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    // this student + manager + teacher on this class
    getById: async (req, res) => {
        try {
            const classes = await Class.findOne({ id: req.params.id })
            if (!classes) response(res, httpStatus.OK, apiStatus.INVALID_PARAM, `Not found with id: ${req.params.id}`)
            response(res, httpStatus.OK, apiStatus.SUCCESS, "Success", classes)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    // only manager
    getAll: async (req, res) => {
        try {
            const page = req.query.page || 1
            const perpage = req.query.perpage || 10
            const classess = await Class.find({
                where: {
                    name: {
                        'contains': req.query.name || "",
                    },

                },
                limit: perpage * page,
                skip: (page - 1) * perpage,
            })
            response(res, httpStatus.OK, apiStatus.SUCCESS, "SUCCESS", classess)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    // only manager
    update: async (req, res) => {
        try {
            const classRecord = await Class.updateOne({
                id: req.params.id,
                isdeleted: false
            }).set({
                name: req.body.name,
                description: req.body.description,
                max_students: req.body.max_students
            }).fetch()
            response(res, httpStatus.OK, apiStatus.SUCCESS, "SUCCESS", classRecord)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    // only manager
    delete: async (req, res) => {
        try {
            const classRecord = await Class.update({ id: req.params.id }).set({
                isdeleted: true,
            })
            response(res, httpStatus.OK, apiStatus.SUCCESS, "SUCCESS", classRecord)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },

}