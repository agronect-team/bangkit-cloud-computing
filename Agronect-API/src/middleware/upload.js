import multer from "multer";

const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(err.status || 500).json({
            code: err.status || 500,
            status: "UPLOAD ERROR",
            message: err.message,
        });
    }
    next();
};

export default handleMulterError;
