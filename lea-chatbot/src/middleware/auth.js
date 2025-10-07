const apiKey = process.env.API_KEY;

const authMiddleware = (req, res, next) => {
    const key = req.headers['x-api-key'];
    
    if (!key || key !== apiKey) {
        return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
    
    next();
};

module.exports = authMiddleware;