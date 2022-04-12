require('dotenv').config();
const dbSetup = require('./db/db-setup');
const express = require('express');
const cors = require('cors');
const User = require('./db/models/user');

dbSetup();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res, next) => {
    try {
        const users = await User.query();
        res.json(users);
    } catch(err) {
        console.error(err);
        res.status(500);
    }
})

app.listen(process.env.PORT || 3001, () => console.log('Server is up on', process.env.PORT));