const TYPE_JSON = 'application/json';
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_RESQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOK = function(data, message, metadata) {
    const status = STATUS_CODE_OK;

    message = (message) ? message : 'Successful request.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);

    return this.json({ message, data, metadata, status: status });
};

const jsonBadRequest = function(data, message, metadata) {
    const status = STATUS_CODE_BAD_RESQUEST;

    message = (message) ? message : 'Bad resquest.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);

    return this.json({ message, data, metadata, status: status });
};

const jsonUnauthorized = function(data, message, metadata) {
    const status = STATUS_CODE_UNAUTHORIZED;

    message = (message) ? message : 'Unauthorized.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);

    return this.json({ message, data, metadata, status: status });
};

const jsonNotFound = function(data, message, metadata) {
    const status = STATUS_CODE_NOT_FOUND;

    message = (message) ? message : 'Not found.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);

    return this.json({ message, data, metadata, status: status });
};

const jsonServerError = function(data, message, metadata) {
    const status = STATUS_CODE_SERVER_ERROR;

    message = (message) ? message : 'Server error.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);

    return this.json({ message, data, metadata, status: status });
};

const response = (req, res, next) => {
    // 1.26min
    res.jsonOK = jsonOK;
    res.jsonBadRequest = jsonBadRequest;
    res.jsonUnauthorized = jsonUnauthorized;
    res.jsonNotFound = jsonNotFound;
    res.jsonServerError = jsonServerError;

    next();
}

module.exports = response;