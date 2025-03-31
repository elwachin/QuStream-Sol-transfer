const transactionService = require('../services/transaction.service');

class TransactionController {
    async sendSol(req, res) {
        try {
            const { receiverWalletAddress, solAmount, qcode } = req.body;
            
            if (!qcode) {
                throw new Error('QCode is required');
            }

            // Verify QCode and get sender private key from Supabase
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

            const senderPrivateKey = result;

            // Proceed with sending SOL only if QCode is confirmed and private key received
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