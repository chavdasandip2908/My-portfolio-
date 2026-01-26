const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 600 }); // Default TTL: 0 (Infinite)

module.exports = myCache;
