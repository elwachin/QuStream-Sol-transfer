const transactionService = require('../services/transaction.service');

class TransactionController {
    async sendSol(req, res) {
        try {
            const { qcode, receiverWalletAddress, solAmount } = req.body;
            
            if (!qcode) {
                throw new Error('QCode is required');
            }

            // Verify QCode and get sender private key from Supabase
            const response = await fetch('https://rclnhzbgzcvwykbvdlhm.supabase.co/functions/v1/verifyqcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbG5oemJnemN2d3lrYnZkbGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NTc3MTcsImV4cCI6MjA1NzEzMzcxN30.z52KTM55COCjTo3Tfso_fkuwRMOTammrbgHE6KJ1AhY`
                },
                body: JSON.stringify({ qcode: qcode })
            });

            const result = await response.json();


            if (!result) {
                throw new Error('QCode verification failed or private key not found');
            }
            // Extract the private key from the response
            const senderPrivateKey = result.private_key;

            //const receiverWalletAddress = '9zdJ128jEbG5MUM8eHPRAVQBZDiYywtNqixV6bdRnHGv';
            //const solAmount = 0.01; // Amount to send in SOL
            
           
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