const { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey, ComputeBudgetProgram, Keypair } = require('@solana/web3.js');
const { connection } = require('../config/solana.config');
const { COMPUTE_UNIT_PRICE } = require('../config/constants');
const bs58 = require('bs58');

class TransactionService {
    async sendSol(senderPrivateKey, receiverWalletAddress, solAmount) {
        // Create sender keypair from private key
        const senderKeypair = Keypair.fromSecretKey(bs58.decode(senderPrivateKey));

        // Check if the receiver wallet address is valid
        if (!PublicKey.isOnCurve(new PublicKey(receiverWalletAddress))) {
            throw new Error('Invalid receiver wallet address');
        }

        // Convert amount to Lamports
        const lamports = solAmount * LAMPORTS_PER_SOL;

        // Create the transaction
        const transaction = new Transaction();

        // Add compute unit instruction
        transaction.add(
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: COMPUTE_UNIT_PRICE
            })
        );

        // Add the transfer instruction
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: senderKeypair.publicKey,
                toPubkey: new PublicKey(receiverWalletAddress),
                lamports: lamports,
            })
        );

        // Get latest blockhash and set transaction parameters
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = senderKeypair.publicKey;

        // Sign and send transaction
        transaction.sign(senderKeypair);
        const signature = await connection.sendRawTransaction(
            transaction.serialize(),
            { maxRetries: 5 }
        );
        
        // Confirm transaction
        await connection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight
        });
        
        return signature;
    }
}

module.exports = new TransactionService(); 