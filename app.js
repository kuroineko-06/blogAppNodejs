const express = require('express');
require('./src/db')
require('express-async-errors');
require('dotenv').config();
const postRouter = require('./src/routers/post');
const loginRouter = require('./src/routers/login');
const userRouter = require('./src/routers/user');
const cors = require('cors');

const morgan = require('morgan')
const app = express();


app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use('/api/post', postRouter);
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter); 
app.use((err, req, res, next) => {
    res.status(500).json({error: err.message});
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Port is listening on " + PORT);
});