const { Connection } = require('@solana/web3.js');
require('dotenv').config();
const { RPC_URL, COMMITMENT } = require('./constants');

const connection = new Connection(RPC_URL, COMMITMENT);

module.exports = {
    connection
}; 