const apiStatus = require("../../constants/ApiStatus");
const httpStatus = require("../../constants/HttpStatus");
const validatorInput = require("../../ultils/validatorInput");
const response = require("../../responses/response");
const AuthenService = require("../../services/AuthenService");
const bcrypt = require('bcrypt');
const keys = require("../../../config/keys");

module.exports = {
    // only manager
    create: async (req, res) => {
        try {
            const isMissingParam = validatorInput(req, ["fullname", "email", "birthday", "sex", "password"]);
            // check birthday is valid param
            if (isMissingParam.status === "ERROR") {
                return response(res, httpStatus.BAD_REQUEST, apiStatus.INVALID_PARAM, isMissingParam.message, {})
            }

            req.body.password = await sails.helpers.passwords.hashPassword(req.body.password)
            const newStudent = await Student.create({
                ...req.body
            }).fetch();
            delete newStudent.password
            return response(res, httpStatus.CREATED, apiStatus.SUCCESS, "CREATED", newStudent)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    // this student or manager
    getById: async (req, res) => {
        try {
            const student = await Student.findOne({ id: req.params.id })
            if (!student) response(res, httpStatus.OK, apiStatus.INVALID_PARAM, `Cant find student with id: ${req.params.id}`)
            delete student.password
            response(res, httpStatus.OK, apiStatus.SUCCESS, "Success", student)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    // only manager
    getAll: async (req, res) => {
        try {
            const page = req.query.page || 1
            const perpage = req.query.perpage || 10
            let students = await Student.find({
                where: {
                    fullname: {
                        'contains': req.query.fullname || ""
                    },
                    email: req.query.email,
                    birthday: {
                        'contains': req.query.birthday || ""
                    },
                    sex: req.query.sex,
                    province: req.query.province,
                    district: req.query.district,
                    town: req.query.town,
                    isdeleted: false,
                    classid: req.query.classid
                },
                limit: perpage * page,
                skip: (page - 1) * perpage,
            })
            students.map(item => delete item.password && delete item.isdeleted)
            response(res, httpStatus.OK, apiStatus.SUCCESS, "SUCCESS", students)
        }
        catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    delete: async (req, res) => {
        try {
            const studentDeleted = await Student.update({
                id: req.params.id
            }).set({
                isdeleted: true,
            })
            response(res, httpStatus.OK, apiStatus.SUCCESS, "SUCCESS", studentDeleted)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    update: async (req, res) => {
        try {
            const studentUpdated = await Student.updateOne({
                id: req.params.id
            }).set({
                fullname: req.body.fullname,
                birthday: req.body.birthday,
                sex: req.body.sex,
                province: req.body.province,
                district: req.body.district,
                town: req.body.town,
            })
            if (!studentUpdated) return response(res, httpStatus.BAD_GATEWAY, apiStatus.INVALID_PARAM, `Cant find student with id: ${req.params.id}`, studentUpdated)
            delete studentUpdated.password
            response(res, httpStatus.OK, apiStatus.SUCCESS, "SUCCESS", studentUpdated)
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
    },
    uploadAvatar: async (req, res) => {
        try {
            const student = await Student.findOne({ id: req.params.id, isdeleted: false })
            if (!student) return response(res, httpStatus.OK, apiStatus.INVALID_PARAM, `Cant find student with id: ${req.params.id}`)
            // upload avatar to s3
            req.file('avatar').upload({
                maxBytes: 10 * 1024 * 1024, //max size: 10MB
                adapter: require('skipper-s3'),
                key: keys.AWS_S3_ACCESS_KEY,
                secret: keys.AWS_S3_SECRET_KEY,
                bucket: keys.AWS_S3_BUCKET_NAME
            }, (err, fileUploaded) => {
                if (err) {
                    return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, err.message, {})
                }
                const avatarUrl = "https://studentmediabucket.s3.amazonaws.com/" + fileUploaded[0].fd
                // update avatarUrl of student
                Student.update({ id: req.params.id }).set({
                    avatarUrl: avatarUrl
                })
                return response(res, httpStatus.ACCEPTED, apiStatus.SUCCESS, "Uploaded", {
                    fileUploaded: fileUploaded,
                    url: avatarUrl
                })
            })
        } catch (error) {
            return response(res, httpStatus.INTERNAL_SERVER_ERROR, apiStatus.OTHER_ERROR, error.message, {})
        }
        // push object to s3 bucket

    },

}