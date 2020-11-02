const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});

const express = require('express');

const Logger = require('./utils/logger');
const logger = new Logger('initalize-app');

require('./configs/unhandled-errors').configure(logger, require('./utils/mail'));

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const APP_PORT = process.env.APP_PORT;
const APP_HOST = process.env.APP_HOST;

app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(require('./middlewares/logger'));
app.use(require('./middlewares/404'));
app.use(require('./middlewares/send-response'));
app.use(require('./middlewares/500'));

app.listen(APP_PORT, APP_HOST, error => {
    if (error) throw error;
    else {
        require('./configs/mongodb').connect(logger);
        require('./configs/sequelize').getSequelize().sync({ force: true })
        logger.info(`Server is up & running on ${NODE_ENV} mode. http://${APP_HOST}:${APP_PORT}`)
    };
});

module.exports = app;