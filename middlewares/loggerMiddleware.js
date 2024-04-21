const { logActivity } = require('../utils/logger');

const logMiddleware = async (req, res, next) => {

    try {
        logActivity(`============ Request Start ============`);
        logActivity(`Incoming Request - Method: ${req.method}`);
        logActivity(`Path: ${req.path}`);
        logActivity(`Body: ${JSON.stringify(req.body)}`);
        const originalSend = res.json;
        
        res.json = function (body) {
            logActivity(`Outgoing Response - Status: ${res.statusCode}`);
            logActivity(`Body: ${JSON.stringify(body)}`);
            originalSend.call(this, body);
        };
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    
};

module.exports = logMiddleware;
