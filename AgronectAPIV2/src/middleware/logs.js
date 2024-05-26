const logRequest = (req, res, next) => {
    console.log("Terjadi request pada", req.path);
    next();
};

export default logRequest;
