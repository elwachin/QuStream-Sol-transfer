const { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey, ComputeBudgetProgram } = require('@solana/web3.js');
const { connection, adminKeypair } = require('../config/solana.config');
const { COMPUTE_UNIT_PRICE } = require('../config/constants');

class TransactionService {
    async sendSol( receiverWalletAddress, solAmount) {
        // Check if the receiver wallet address is valid
        if (!PublicKey.isOnCurve(new PublicKey(receiverWalletAddress))) {
            throw new Error('Invalid receiver wallet address');
        }
        // Convert amount to Lamports
        const lamports = solAmount * LAMPORTS_PER_SOL;

        // Create the transaction
        const transaction = new Transaction();

        // Add compute unit instruction (added before transfer)
        transaction.add(
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: COMPUTE_UNIT_PRICE
            })
        );

        // Add the transfer instruction
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: adminKeypair.publicKey,
                toPubkey: new PublicKey(receiverWalletAddress),
                lamports: lamports,
            })
        );

        // Get latest blockhash and set transaction parameters
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = adminKeypair.publicKey;

        // Sign and send transaction
        transaction.sign(adminKeypair);
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