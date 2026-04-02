# n8n-nodes-ethena-protocol

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with Ethena Protocol, enabling automation workflows across 5 core resources: USDe token operations, sUSDe staking functionality, governance participation, analytics data retrieval, and market data access for the synthetic dollar protocol ecosystem.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![DeFi](https://img.shields.io/badge/DeFi-Protocol-green)
![Ethereum](https://img.shields.io/badge/Ethereum-Compatible-purple)
![Stablecoin](https://img.shields.io/badge/Synthetic-Dollar-orange)

## Features

- **USDe Token Management** - Mint, redeem, transfer, and monitor USDe synthetic dollar positions
- **sUSDe Staking Operations** - Stake USDe tokens, claim rewards, and manage staked positions
- **Governance Integration** - Create proposals, cast votes, and track governance participation
- **Analytics Dashboard** - Access protocol metrics, TVL data, and performance analytics
- **Market Data Feeds** - Real-time pricing, volume, and liquidity data for USDe markets
- **Risk Monitoring** - Track collateral ratios, hedging positions, and protocol health metrics
- **Automated Rebalancing** - Set up triggers for position management and risk mitigation
- **Multi-Network Support** - Compatible with Ethereum mainnet and supported Layer 2 solutions

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-ethena-protocol`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-ethena-protocol
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-ethena-protocol.git
cd n8n-nodes-ethena-protocol
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-ethena-protocol
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Ethena Protocol API key for authenticated requests | Yes |
| Environment | Protocol environment (mainnet/testnet) | Yes |
| Wallet Address | Ethereum wallet address for transaction operations | No |
| RPC Endpoint | Custom RPC endpoint URL (optional, uses default if not provided) | No |

## Resources & Operations

### 1. USDe

| Operation | Description |
|-----------|-------------|
| Mint | Create new USDe tokens by depositing collateral |
| Redeem | Burn USDe tokens to withdraw underlying collateral |
| Transfer | Send USDe tokens to another address |
| Balance | Get USDe balance for a specific address |
| Allowance | Check spending allowance for a spender address |
| Approve | Set spending allowance for a spender address |

### 2. sUSDe

| Operation | Description |
|-----------|-------------|
| Stake | Stake USDe tokens to earn sUSDe staking rewards |
| Unstake | Unstake sUSDe tokens back to USDe |
| Claim Rewards | Claim accumulated staking rewards |
| Staking Balance | Get staked sUSDe balance for an address |
| Rewards Balance | Check pending reward amounts |
| Staking Info | Get staking pool information and APY rates |

### 3. Governance

| Operation | Description |
|-----------|-------------|
| Create Proposal | Submit a new governance proposal |
| Vote | Cast vote on an active proposal |
| Get Proposal | Retrieve details of a specific proposal |
| List Proposals | Get list of all governance proposals |
| Voting Power | Check voting power for an address |
| Delegation | Delegate voting power to another address |

### 4. Analytics

| Operation | Description |
|-----------|-------------|
| Protocol Metrics | Get overall protocol statistics and metrics |
| TVL Data | Retrieve total value locked information |
| Volume Data | Get trading volume and transaction data |
| User Statistics | Get user-specific analytics and positions |
| Historical Data | Fetch historical protocol performance data |
| Risk Metrics | Get protocol risk indicators and health scores |

### 5. Market

| Operation | Description |
|-----------|-------------|
| Price Data | Get current USDe and sUSDe market prices |
| Market Data | Retrieve market cap, volume, and liquidity data |
| Order Book | Get order book data from supported exchanges |
| Trading Pairs | List all available trading pairs for USDe |
| Price History | Get historical price data and charts |
| Market Statistics | Get 24h trading statistics and market metrics |

## Usage Examples

```javascript
// Monitor USDe balance and trigger rebalancing
const balanceCheck = {
  "nodes": [
    {
      "parameters": {
        "resource": "USDe",
        "operation": "Balance",
        "address": "0x742d35Cc6475C6b9b9D6b03d8e0E8B1A6cF5d3bF"
      },
      "type": "n8n-nodes-ethena-protocol.ethenaProtocol"
    }
  ]
};
```

```javascript
// Stake USDe tokens for rewards
const stakeTokens = {
  "nodes": [
    {
      "parameters": {
        "resource": "sUSDe",
        "operation": "Stake",
        "amount": "1000",
        "duration": "30"
      },
      "type": "n8n-nodes-ethena-protocol.ethenaProtocol"
    }
  ]
};
```

```javascript
// Create governance proposal
const createProposal = {
  "nodes": [
    {
      "parameters": {
        "resource": "Governance",
        "operation": "Create Proposal",
        "title": "Increase staking rewards",
        "description": "Proposal to increase sUSDe staking APY to 8%",
        "votingPeriod": "7"
      },
      "type": "n8n-nodes-ethena-protocol.ethenaProtocol"
    }
  ]
};
```

```javascript
// Get real-time market data
const marketData = {
  "nodes": [
    {
      "parameters": {
        "resource": "Market",
        "operation": "Price Data",
        "symbols": ["USDe", "sUSDe"],
        "includeChange": true
      },
      "type": "n8n-nodes-ethena-protocol.ethenaProtocol"
    }
  ]
};
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key is correct and has proper permissions |
| Insufficient Balance | Not enough tokens for the requested operation | Check token balance before executing transactions |
| Network Timeout | Request timed out connecting to Ethena Protocol | Retry request or check network connectivity |
| Invalid Address | Ethereum address format is incorrect | Validate address format and checksum |
| Gas Limit Exceeded | Transaction requires more gas than available | Increase gas limit or optimize transaction |
| Proposal Not Found | Governance proposal ID does not exist | Verify proposal ID and check if proposal is active |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-ethena-protocol/issues)
- **Ethena Documentation**: [Ethena Labs Docs](https://docs.ethena.fi)
- **Protocol Website**: [Ethena Protocol](https://ethena.fi)