const transactionService = require('../services/transaction.service');

class TransactionController {
    async sendSol(req, res) {
        try {
            const { senderPrivateKey, receiverWalletAddress, solAmount } = req.body;
            
            if (!senderPrivateKey) {
                throw new Error('Sender private key is required');
            }

            const signature = await transactionService.sendSol(
                senderPrivateKey,
                receiverWalletAddress,
                solAmount
            );

            res.json({
                success: true,
                message: 'Transaction confirmed',
                signature: signature
            });
        } catch (error) {
            console.error('Error in sending transaction:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Transaction failed', 
                error: error.message 
            });
        }
    }
}

module.exports = new TransactionController(); 