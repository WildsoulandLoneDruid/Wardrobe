const notFound = (res, req, next) => {
    const error = new Error(`What are you looking for - ${req.orginalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (error, res, req, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: proccess.env.NODE_ENV === 'production' ? 'Hi' : error.stack,
    });
};

module.exports = {
    notFound,
    errorHandler
};