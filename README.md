# Solana Transaction Service

A Node.js service that facilitates SOL token transfers on the Solana blockchain (Devnet).

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Solana wallet with some SOL tokens on Devnet

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

4. Configure your environment variables in `.env`:
```
PORT=5000
ADMIN_PRIVATE_KEY=your_admin_wallet_private_key
```

## Configuration

The service is configured to use Solana's Devnet by default. You can modify the following settings in `src/config/constants.js`:

- `RPC_URL`: Solana network RPC endpoint
- `COMMITMENT`: Transaction confirmation commitment level
- `COMPUTE_UNIT_PRICE`: Priority fee for transactions (in micro-lamports)

## Running the Service

Start the server:
```bash
npm start
```

The service will be available at `http://localhost:5000`

## API Endpoints

### Send SOL

Transfers SOL tokens from the admin wallet to a specified recipient.

**Endpoint:** `POST /api/transactions/send-sol`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "receiverWalletAddress": "recipient_solana_wallet_address",
    "solAmount": 0.1
}
```

**Success Response (200):**
```json
{
    "success": true,
    "message": "Transaction confirmed",
    "signature": "2id3YC2gmo9VH6xiTHzH5wPvfeNLmHdf6b5K4WyGGYh8UA2p78BSzqeKwtVHwMPNASo1F2YqQ8tMB3yTGzyhCqPW"
}
```

**Error Response (500):**
```json
{
    "success": false,
    "message": "Transaction failed",
    "error": "Error message details"
}
```

## Error Handling

The service includes validation for:
- Invalid wallet addresses
- Insufficient funds
- Network errors
- Transaction failures

## Security Considerations

- Keep your admin private key secure and never commit it to version control
- The service uses CORS and is configured to accept requests from all origins
- Consider implementing rate limiting and additional security measures for production use


