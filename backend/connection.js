const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.34o8a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, ()=>{
  console.log('Connected to db');
});
