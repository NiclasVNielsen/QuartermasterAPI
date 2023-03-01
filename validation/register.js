const joi = require("joi")

const registerValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required(),
        email: joi.string().min(5).max(255).required(),
        password: joi.string().min(8).max(255).required()
    })

    return schema.validate(data)
}

module.exports = { registerValidation }