const redis = require('redis');
const { promisify } = require('util');

// Create Redis client
const client = redis.createClient(6379,'127.0.0.1');
client.connect();
// Handle Redis client errors
client.on('error', (err) => {
    console.error('Redis client error:', err);
});

// Promisify Redis methods
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

// Middleware to cache user sessions
const cacheUserSession = async (req, res, next) => {
    try {
        const userId = req.body.id; // Assuming req.body contains user information

        const sessionData = await getAsync(userId);

        if (sessionData) {
            // If session data exists in Redis, set it in req.session
            req.session = JSON.parse(sessionData);
        }

        return next(); // Continue to the next middleware
    } catch (error) {
        console.error('Error in cacheUserSession:', error);
        return next(error);
    }
};

// Middleware to store user session in Redis
const storeUserSession = async (req, res, next) => {
    try {
        const userId = req.body.id;
        const sessionData = JSON.stringify(req.session);

        // Store session data in Redis with expiration time of 1 hour (3600 seconds)
        await setexAsync(userId, 3600, sessionData);

        return next(); // Continue to the next middleware
    } catch (error) {
        console.error('Error in storeUserSession:', error);
        return next(error);
    }
};

module.exports = { cacheUserSession, storeUserSession };