import getMessage from '../langs/en/messages.js';

const RESPONSE = {};
RESPONSE.success = function (res, messageCode = null, data = null, statusCode = 200) {
    var response = {};
    response.success = true;
    response.message = getMessage(messageCode);

    if (data != null)
        response.data = data;
    return res.status(statusCode).send(response);
};

RESPONSE.error = function (res, messageCode, statusCode = 422, error = null, data = null) {
    var response = {};
    response.success = false;
    response.message = getMessage(messageCode);
    statusCode = statusCode != 422 ? statusCode : messageCode == 9999 ? 500 : statusCode;

    if (data != null)
        response.data = data;

    if (error != null) {
        response["Error Message"] = error.message;
    }
    return res.status(statusCode).send(response);
};

export default RESPONSE;