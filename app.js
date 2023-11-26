const express = require("express");
const cookieParser = require('cookie-parser');
const pool = require('./config/db.js');
const userRouter = require('./routes/User.route.js')
const pollRouter = require('./routes/Poll.route.js');
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await pool.getConnection(); 
    console.log('Connected to the database'); 
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();
app.use('/api/v1',pollRouter);
app.use('/api/v1',userRouter)
app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

module.exports = app;