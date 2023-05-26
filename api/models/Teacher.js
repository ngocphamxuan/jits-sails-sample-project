module.exports = {
    attributes: {
        email: {
            type: 'string',
            unique: true,
            required: true,
            isEmail: true,
        },
        fullname: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
        },
        yearofbirth: {
            type: 'number',
            defaultsTo: 1970
        },
        role: {
            type: 'string',
            isIn: ["Teacher", "Manager", "Staff"],
            defaultsTo: "Teacher",
        }
    }
}