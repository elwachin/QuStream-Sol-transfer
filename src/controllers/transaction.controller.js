const transactionService = require('../services/transaction.service');

class TransactionController {
    async sendSol(req, res) {
        try {
            const { receiverWalletAddress, solAmount } = req.body;
            const signature = await transactionService.sendSol(
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