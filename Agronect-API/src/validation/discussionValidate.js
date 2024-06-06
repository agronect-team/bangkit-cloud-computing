import Joi from "joi";

const discussionValidate = Joi.object({
    content: Joi.string().min(10).required(),
    imgUrl: Joi.string().allow(null),
}).options({ abortEarly: false });

export { discussionValidate };
