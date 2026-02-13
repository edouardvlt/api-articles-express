const logger = {
    info: (message) => {
        const date = new Date().toISOString().replace('T', ' ').split('.')[0];
        console.log(`[${date}] INFO : ${message}`);
    },
    error: (message) => {
        const date = new Date().toISOString().replace('T', ' ').split('.')[0];
        console.error(`[${date}] ERREUR : ${message}`);
    }
};

module.exports = { logger };
