const mongoose = require('mongoose');
mongoose
    .connect('mongodb://127.0.0.1:27017/newsApp')
    .then(() => console.log('Db connected'))
    .catch(err => console.log("Db connection failed: ", err.message || err));
