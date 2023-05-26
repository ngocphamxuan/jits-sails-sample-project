module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true,
        },
        max_students: {
            type: 'number',
            defaultsTo: 50
        },
        description: {
            type: 'string',
        },
        isdeleted: {
            type: 'boolean',
            defaultsTo: false
        },
        students: {
            collection: 'student',
            via: 'classid'
        }
    }
}