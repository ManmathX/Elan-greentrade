const Joi = require('joi');

const validateSupplier = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        country: Joi.string().allow('').optional(),
        contact_person: Joi.string().allow('').optional(),
        phone: Joi.string().allow('').optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    next();
};

module.exports = { validateSupplier };
