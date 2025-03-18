const { Connection, Keypair } = require('@solana/web3.js');
require('dotenv').config();
const { RPC_URL, COMMITMENT } = require('./constants');
const bs58 = require('bs58'); // You'll need to install this package

const connection = new Connection(RPC_URL, COMMITMENT);
const adminKeypair = Keypair.fromSecretKey(bs58.decode(process.env.ADMIN_PRIVATE_KEY));

module.exports = {
    connection,
    adminKeypair
}; 