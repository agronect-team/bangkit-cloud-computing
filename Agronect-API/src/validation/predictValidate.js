import multer from "multer";

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024, // Maximum file size: 4MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            const error = new multer.MulterError(
                "Invalid file type. Only JPEG and PNG images are allowed."
            );
            error.status = 400;
            cb(error);
        }
    },
});

export default upload;
