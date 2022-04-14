require('dotenv').config();
const dbSetup = require('./db/db-setup');
const express = require('express');
const cors = require('cors');

const usersRoute = require('./routes/users');

dbSetup();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', usersRoute);

app.listen(process.env.PORT || 3001, () => console.log('Server is up on', process.env.PORT));