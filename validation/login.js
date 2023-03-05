const joi = require("joi")

const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).required(),
        password: joi.string().min(8).max(255).required()
    })

    return schema.validate(data)
}

module.exports = { loginValidation }