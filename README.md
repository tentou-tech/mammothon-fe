# Prims Mammothon

## Overview
The **Prims Mammothon** is a decentralized identity verification platform that allows users to authenticate and verify their identity by connecting their **crypto wallet, X (formerly Twitter) account, and GitHub**. The application explores additional publicly available data to ensure the legitimacy of a user's information, providing a trust layer for online interactions.

## Features
- **Multi-Source Identity Verification**: Users can connect their **crypto wallet, X account, and GitHub** to verify their identity.
- **Trust Score System**: Aggregates and evaluates connected accounts to ensure legitimacy.
- **Decentralized Authentication**: Uses **Keplr wallet authentication** to verify ownership on Cosmos chains.
- **Cross-Platform Insights**: Gathers relevant public data from connected accounts to enhance transparency.
- **Privacy-Focused**: Users have control over what information is shared and displayed.

## How It Works
1. **Connect Wallet**: Users authenticate using their **Keplr wallet on Cosmos chains**.
2. **Link Social Accounts**: Users connect their **X account and GitHub**.
3. **Verification Analysis**: The system aggregates data from connected accounts to validate authenticity.
4. **Trust Level Calculation**: A trust score is generated based on verification results.
5. **User Profile Display**: Verified users can share their trust score or verified status with third parties.

## Supported Wallets
- Keplr (for Cosmos chains)

## Technologies Used
- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Blockchain Integration**: CosmJS
- **API Integrations**: X API, GitHub API

## Installation
1. Clone the repository:
   ```sh
   git clone git@github.com:tentou-tech/mammothon-fe.git
   cd mammothon-fe
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Security & Privacy
- Data is retrieved via **public APIs** and is not stored permanently.
- Users retain control over **linked accounts and visibility settings**.
- No private keys or sensitive user data are collected.

## Roadmap
- [ ] Add **ENS & Lens Protocol** integration
- [ ] Implement **Decentralized Identity (DID)** verification
- [ ] Expand **trust score criteria**
- [ ] Develop **browser extension** for identity validation

## Contributing
We welcome contributions! Feel free to submit issues, feature requests, or pull requests.

## License
This project is licensed under the **MIT License**.

