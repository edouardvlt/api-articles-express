const { logger } = require('./logger');

const buildAPIResponse = (code, message, data) => {
    logger.info(`Réponse : ${code} - ${message}`);

    return {
        code: code,
        message: message,
        data: data
    };
};

module.exports = { buildAPIResponse };
