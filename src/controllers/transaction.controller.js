const transactionService = require('../services/transaction.service');

class TransactionController {
    async sendSol(req, res) {
        try {
            const { senderPrivateKey, receiverWalletAddress, solAmount, qcode } = req.body;
            
            if (!senderPrivateKey) {
                throw new Error('Sender private key is required');
            }

            if (!qcode) {
                throw new Error('QCode is required');
            }

            // Verify QCode first
            const response = await fetch('https://rclnhzbgzcvwykbvdlhm.supabase.co/functions/v1/verifyqcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ qcode: qcode })
            });

            const result = await response.json();

            if (!result) {
                throw new Error('QCode verification failed');
            }

            // Proceed with sending SOL only if QCode is confirmed
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