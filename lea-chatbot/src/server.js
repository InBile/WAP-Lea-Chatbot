const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const { logger } = require('./utils/logger');
const { authenticate } = require('./middleware/auth');
const config = require('./config');

const app = express();
const PORT = config.PORT || 3000;

app.use(bodyParser.json());
app.use(authenticate);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});