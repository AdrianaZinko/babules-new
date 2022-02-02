const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
 
const uri = process.env.BABULES_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const transactionsRouter = require('./routes/transactions');
const categoriesRouter = require('./routes/categories');

app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});