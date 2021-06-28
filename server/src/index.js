const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');
const credentials = require('./api/credentials');
// const updateDB = require('./api/updateDB');

const app = express();

mongoose.connect("mongodb+srv://Brewmaster123:primalsplit@wardrobedbsd2.gbx59.mongodb.net/WardrobeDBSD2?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (res, req) => {
    res.json({
        message: 'Hello world',
    });
});

app.use('/api/logs', logs);
app.use('/api/credentials', credentials);
// app.use('/api/updateDB', updateDB);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

mongoose.connection.once('open', function() {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
    console.log('Mongoose Connection Error : ' + error);
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});