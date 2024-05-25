const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        const errorMessages = {};
        error.details.forEach((detail) => {
            const path = detail.path[0];
            const message = detail.message.replace(/['"]/g, "");
            // cek kondisi jika path sudah tersedia atau tidak
            if (errorMessages[path]) {
                errorMessages[path].push(message);
            } else {
                errorMessages[path] = [message];
            }
        });
        res.status(400).json({
            code: 400,
            status: "BAD REQUEST",
            message: errorMessages,
            data: null,
        });
    } else {
        next();
    }
};

export { validate };
