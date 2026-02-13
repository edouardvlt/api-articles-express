const { buildAPIResponse } = require('./helpers');

const httpApiResponse = (res, code, message, data) => {
    const responseJson = buildAPIResponse(code, message, data);
    res.json(responseJson);
};

module.exports = { httpApiResponse };
