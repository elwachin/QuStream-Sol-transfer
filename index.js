const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./src/routes/transaction.routes');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Enable all CORS requests
app.use(cors());

app.use(bodyParser.json());
app.use('/api/transactions', transactionRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); 