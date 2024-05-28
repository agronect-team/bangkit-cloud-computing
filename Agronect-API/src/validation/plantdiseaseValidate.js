import Joi from "joi";

// rules validasi
const plantValidate = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    desc: Joi.string().min(10).required(),
}).options({ abortEarly: false });

const diseaseValidate = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    desc: Joi.string().min(10).required(),
    solution: Joi.string().min(10).required(),
}).options({ abortEarly: false });

export { plantValidate, diseaseValidate };
