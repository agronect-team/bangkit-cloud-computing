import Joi from "joi";

const discussionValidate = Joi.object({
    content: Joi.string().min(10).required(),
    ImgUrl: Joi.string(),
}).options({ abortEarly: false });

export { discussionValidate };
