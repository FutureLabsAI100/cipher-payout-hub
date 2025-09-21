# Cipher Payout Hub

A decentralized payout management platform built with React, TypeScript, and FHE (Fully Homomorphic Encryption) technology.

## Features

- **Secure Payout Management**: Manage payouts with FHE-encrypted data
- **Multi-Wallet Support**: Connect with various Web3 wallets including Rainbow, MetaMask, and more
- **Real-time Analytics**: Track payout statistics and performance
- **Decentralized Architecture**: Built on blockchain for transparency and security

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3 Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHE for sensitive data protection

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FutureLabsAI100/cipher-payout-hub.git
cd cipher-payout-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following environment variables:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

4. Start the development server:
```bash
npm run dev
```

## Smart Contracts

The project includes FHE-enabled smart contracts for secure payout management:

- **CipherPayoutHub**: Main contract for payout operations
- **FHE Encryption**: All sensitive data is encrypted using FHE
- **Multi-signature Support**: Enhanced security for large payouts

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.