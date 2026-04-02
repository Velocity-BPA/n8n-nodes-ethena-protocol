/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-ethenaprotocol/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class EthenaProtocol implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Ethena Protocol',
    name: 'ethenaprotocol',
    icon: 'file:ethenaprotocol.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Ethena Protocol API',
    defaults: {
      name: 'Ethena Protocol',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'ethenaprotocolApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'USDe',
            value: 'uSDe',
          },
          {
            name: 'SUSDe',
            value: 'sUSDe',
          },
          {
            name: 'Governance',
            value: 'governance',
          },
          {
            name: 'Analytics',
            value: 'analytics',
          },
          {
            name: 'Market',
            value: 'market',
          }
        ],
        default: 'uSDe',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['uSDe'] } },
  options: [
    { name: 'Get Balance', value: 'getBalance', description: 'Get USDe balance for specific address', action: 'Get balance' },
    { name: 'Get Total Supply', value: 'getTotalSupply', description: 'Get total USDe supply across all chains', action: 'Get total supply' },
    { name: 'Get Mint History', value: 'getMintHistory', description: 'Get minting history for address', action: 'Get mint history' },
    { name: 'Get Redeem History', value: 'getRedeemHistory', description: 'Get redemption history for address', action: 'Get redeem history' },
    { name: 'Get Collateral Info', value: 'getCollateralInfo', description: 'Get current collateral backing USDe', action: 'Get collateral info' }
  ],
  default: 'getBalance',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['sUSDe'] } },
  options: [
    { name: 'Get Balance', value: 'getBalance', description: 'Get sUSDe balance and staking position', action: 'Get balance' },
    { name: 'Get Current APY', value: 'getCurrentAPY', description: 'Get current sUSDe staking APY', action: 'Get current APY' },
    { name: 'Get Rewards', value: 'getRewards', description: 'Get accumulated rewards for staked position', action: 'Get rewards' },
    { name: 'Get Stake History', value: 'getStakeHistory', description: 'Get staking transaction history', action: 'Get stake history' },
    { name: 'Get Unstake History', value: 'getUnstakeHistory', description: 'Get unstaking transaction history', action: 'Get unstake history' },
    { name: 'Get Total Staked', value: 'getTotalStaked', description: 'Get total amount of USDe staked as sUSDe', action: 'Get total staked' },
  ],
  default: 'getBalance',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { 
		show: { 
			resource: ['governance'] 
		} 
	},
	options: [
		{
			name: 'Get All Proposals',
			value: 'getProposals',
			description: 'Get all governance proposals',
			action: 'Get all governance proposals',
		},
		{
			name: 'Get Proposal',
			value: 'getProposal',
			description: 'Get specific proposal details',
			action: 'Get a specific proposal',
		},
		{
			name: 'Get Voting Power',
			value: 'getVotingPower',
			description: 'Get voting power for address',
			action: 'Get voting power for an address',
		},
		{
			name: 'Get Votes',
			value: 'getVotes',
			description: 'Get voting history for address',
			action: 'Get voting history for an address',
		},
		{
			name: 'Get Delegation',
			value: 'getDelegation',
			description: 'Get delegation status for address',
			action: 'Get delegation status for an address',
		},
		{
			name: 'Get Governance Stats',
			value: 'getGovernanceStats',
			description: 'Get overall governance statistics',
			action: 'Get governance statistics',
		},
	],
	default: 'getProposals',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['analytics'],
		},
	},
	options: [
		{
			name: 'Get TVL',
			value: 'getTVL',
			description: 'Get total value locked in protocol',
			action: 'Get TVL',
		},
		{
			name: 'Get Volume',
			value: 'getVolume',
			description: 'Get trading and minting volume statistics',
			action: 'Get volume',
		},
		{
			name: 'Get Yield Data',
			value: 'getYieldData',
			description: 'Get historical yield performance data',
			action: 'Get yield data',
		},
		{
			name: 'Get Protocol Stats',
			value: 'getProtocolStats',
			description: 'Get comprehensive protocol statistics',
			action: 'Get protocol stats',
		},
		{
			name: 'Get Collateral Composition',
			value: 'getCollateralComposition',
			description: 'Get breakdown of collateral assets',
			action: 'Get collateral composition',
		},
	],
	default: 'getTVL',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['market'],
		},
	},
	options: [
		{
			name: 'Get Price',
			value: 'getPrice',
			description: 'Get current USDe market price and peg status',
			action: 'Get current USDe market price and peg status',
		},
		{
			name: 'Get Spread',
			value: 'getSpread',
			description: 'Get bid-ask spread for USDe trading',
			action: 'Get bid-ask spread for USDe trading',
		},
		{
			name: 'Get Liquidity',
			value: 'getLiquidity',
			description: 'Get liquidity metrics across DEXs',
			action: 'Get liquidity metrics across DEXs',
		},
		{
			name: 'Get Trading Pairs',
			value: 'getTradingPairs',
			description: 'Get all USDe trading pairs and volumes',
			action: 'Get all USDe trading pairs and volumes',
		},
		{
			name: 'Get Arbitrage Opportunities',
			value: 'getArbitrageOpportunities',
			description: 'Get current arbitrage opportunities',
			action: 'Get current arbitrage opportunities',
		},
	],
	default: 'getPrice',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['uSDe'], operation: ['getBalance'] } },
  default: '',
  placeholder: '0x...',
  description: 'The Ethereum wallet address to get USDe balance for',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['uSDe'], operation: ['getMintHistory'] } },
  default: '',
  placeholder: '0x...',
  description: 'The Ethereum wallet address to get minting history for',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: { show: { resource: ['uSDe'], operation: ['getMintHistory'] } },
  default: 100,
  description: 'Number of records to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: { show: { resource: ['uSDe'], operation: ['getMintHistory'] } },
  default: 0,
  description: 'Number of records to skip',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['uSDe'], operation: ['getRedeemHistory'] } },
  default: '',
  placeholder: '0x...',
  description: 'The Ethereum wallet address to get redemption history for',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: { show: { resource: ['uSDe'], operation: ['getRedeemHistory'] } },
  default: 100,
  description: 'Number of records to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: { show: { resource: ['uSDe'], operation: ['getRedeemHistory'] } },
  default: 0,
  description: 'Number of records to skip',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['sUSDe'],
      operation: ['getBalance']
    }
  },
  default: '',
  placeholder: '0x...',
  description: 'Ethereum wallet address to get balance for',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['sUSDe'],
      operation: ['getRewards']
    }
  },
  default: '',
  placeholder: '0x...',
  description: 'Ethereum wallet address to get rewards for',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['sUSDe'],
      operation: ['getStakeHistory']
    }
  },
  default: '',
  placeholder: '0x...',
  description: 'Ethereum wallet address to get stake history for',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: { 
    show: { 
      resource: ['sUSDe'],
      operation: ['getStakeHistory']
    }
  },
  default: 100,
  description: 'Maximum number of records to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: { 
    show: { 
      resource: ['sUSDe'],
      operation: ['getStakeHistory']
    }
  },
  default: 0,
  description: 'Number of records to skip',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['sUSDe'],
      operation: ['getUnstakeHistory']
    }
  },
  default: '',
  placeholder: '0x...',
  description: 'Ethereum wallet address to get unstake history for',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: { 
    show: { 
      resource: ['sUSDe'],
      operation: ['getUnstakeHistory']
    }
  },
  default: 100,
  description: 'Maximum number of records to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: { 
    show: { 
      resource: ['sUSDe'],
      operation: ['getUnstakeHistory']
    }
  },
  default: 0,
  description: 'Number of records to skip',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['getProposals'],
		},
	},
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Active',
			value: 'active',
		},
		{
			name: 'Pending',
			value: 'pending',
		},
		{
			name: 'Closed',
			value: 'closed',
		},
		{
			name: 'Executed',
			value: 'executed',
		},
	],
	default: '',
	description: 'Filter proposals by status',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['getProposals', 'getVotes'],
		},
	},
	default: 100,
	description: 'Maximum number of results to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['getProposals', 'getVotes'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
	typeOptions: {
		minValue: 0,
	},
},
{
	displayName: 'Proposal ID',
	name: 'proposalId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['getProposal'],
		},
	},
	default: '',
	description: 'The ID of the proposal to retrieve',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['getVotingPower', 'getVotes', 'getDelegation'],
		},
	},
	default: '',
	description: 'The Ethereum wallet address to query',
	placeholder: '0x...',
},
{
	displayName: 'Timeframe',
	name: 'timeframe',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['analytics'],
			operation: ['getTVL'],
		},
	},
	options: [
		{
			name: '24 Hours',
			value: '24h',
		},
		{
			name: '7 Days',
			value: '7d',
		},
		{
			name: '30 Days',
			value: '30d',
		},
		{
			name: '90 Days',
			value: '90d',
		},
		{
			name: '1 Year',
			value: '1y',
		},
	],
	default: '7d',
	description: 'Time period for TVL analysis',
},
{
	displayName: 'Timeframe',
	name: 'timeframe',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['analytics'],
			operation: ['getVolume'],
		},
	},
	options: [
		{
			name: '24 Hours',
			value: '24h',
		},
		{
			name: '7 Days',
			value: '7d',
		},
		{
			name: '30 Days',
			value: '30d',
		},
		{
			name: '90 Days',
			value: '90d',
		},
		{
			name: '1 Year',
			value: '1y',
		},
	],
	default: '7d',
	description: 'Time period for volume analysis',
},
{
	displayName: 'Volume Type',
	name: 'type',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['analytics'],
			operation: ['getVolume'],
		},
	},
	options: [
		{
			name: 'Trading',
			value: 'trading',
		},
		{
			name: 'Minting',
			value: 'minting',
		},
		{
			name: 'Both',
			value: 'both',
		},
	],
	default: 'both',
	description: 'Type of volume data to retrieve',
},
{
	displayName: 'Timeframe',
	name: 'timeframe',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['analytics'],
			operation: ['getYieldData'],
		},
	},
	options: [
		{
			name: '24 Hours',
			value: '24h',
		},
		{
			name: '7 Days',
			value: '7d',
		},
		{
			name: '30 Days',
			value: '30d',
		},
		{
			name: '90 Days',
			value: '90d',
		},
		{
			name: '1 Year',
			value: '1y',
		},
	],
	default: '30d',
	description: 'Time period for yield data analysis',
},
{
	displayName: 'DEX',
	name: 'dex',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['market'],
			operation: ['getLiquidity'],
		},
	},
	default: '',
	placeholder: 'uniswap-v3',
	description: 'The DEX to get liquidity metrics for (e.g., uniswap-v3, curve, balancer)',
},
{
	displayName: 'Threshold',
	name: 'threshold',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['market'],
			operation: ['getArbitrageOpportunities'],
		},
	},
	default: 0.1,
	typeOptions: {
		numberPrecision: 3,
		minValue: 0,
	},
	description: 'Minimum percentage threshold for arbitrage opportunities (default: 0.1%)',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'uSDe':
        return [await executeUSDeOperations.call(this, items)];
      case 'sUSDe':
        return [await executeSUSDeOperations.call(this, items)];
      case 'governance':
        return [await executeGovernanceOperations.call(this, items)];
      case 'analytics':
        return [await executeAnalyticsOperations.call(this, items)];
      case 'market':
        return [await executeMarketOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeUSDeOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('ethenaprotocolApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      
      switch (operation) {
        case 'getBalance': {
          const address = this.getNodeParameter('address', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/usde/balance/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getTotalSupply': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/usde/total-supply`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getMintHistory': {
          const address = this.getNodeParameter('address', i) as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/usde/mint-history/${address}`,
            qs: { limit, offset },
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getRedeemHistory': {
          const address = this.getNodeParameter('address', i) as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/usde/redeem-history/${address}`,
            qs: { limit, offset },
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getCollateralInfo': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/usde/collateral`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeSUSDeOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('ethenaprotocolApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      const baseOptions: any = {
        headers: {
          'Authorization': `Bearer ${credentials.apiKey}`,
          'Content-Type': 'application/json',
        },
        json: true,
      };

      switch (operation) {
        case 'getBalance': {
          const address = this.getNodeParameter('address', i) as string;
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/susde/balance/${address}`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getCurrentAPY': {
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/susde/apy`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getRewards': {
          const address = this.getNodeParameter('address', i) as string;
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/susde/rewards/${address}`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getStakeHistory': {
          const address = this.getNodeParameter('address', i) as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          
          const queryParams = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString(),
          });

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/susde/stake-history/${address}?${queryParams.toString()}`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getUnstakeHistory': {
          const address = this.getNodeParameter('address', i) as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          
          const queryParams = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString(),
          });

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/susde/unstake-history/${address}?${queryParams.toString()}`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTotalStaked': {
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/susde/total-staked`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeGovernanceOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('ethenaprotocolApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getProposals': {
					const status = this.getNodeParameter('status', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const params = new URLSearchParams();
					if (status) params.append('status', status);
					if (limit) params.append('limit', limit.toString());
					if (offset) params.append('offset', offset.toString());

					const queryString = params.toString();
					const url = `${credentials.baseUrl}/governance/proposals${queryString ? '?' + queryString : ''}`;

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getProposal': {
					const proposalId = this.getNodeParameter('proposalId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/proposals/${proposalId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getVotingPower': {
					const address = this.getNodeParameter('address', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/voting-power/${address}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getVotes': {
					const address = this.getNodeParameter('address', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const params = new URLSearchParams();
					if (limit) params.append('limit', limit.toString());
					if (offset) params.append('offset', offset.toString());

					const queryString = params.toString();
					const url = `${credentials.baseUrl}/governance/votes/${address}${queryString ? '?' + queryString : ''}`;

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getDelegation': {
					const address = this.getNodeParameter('address', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/delegation/${address}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getGovernanceStats': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/stats`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeAnalyticsOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('ethenaprotocolApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getTVL': {
					const timeframe = this.getNodeParameter('timeframe', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/analytics/tvl`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							timeframe,
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getVolume': {
					const timeframe = this.getNodeParameter('timeframe', i) as string;
					const type = this.getNodeParameter('type', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/analytics/volume`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							timeframe,
							type,
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getYieldData': {
					const timeframe = this.getNodeParameter('timeframe', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/analytics/yield`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							timeframe,
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getProtocolStats': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/analytics/protocol-stats`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getCollateralComposition': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/analytics/collateral-composition`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`,
						{ itemIndex: i },
					);
			}

			returnData.push({
				json: result,
				pairedItem: {
					item: i,
				},
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error: error.message,
					},
					pairedItem: {
						item: i,
					},
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeMarketOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('ethenaprotocolApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getPrice': {
					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${credentials.baseUrl}/market/price`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getSpread': {
					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${credentials.baseUrl}/market/spread`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getLiquidity': {
					const dex = this.getNodeParameter('dex', i) as string;
					const queryParams = new URLSearchParams({ dex });

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${credentials.baseUrl}/market/liquidity?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTradingPairs': {
					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${credentials.baseUrl}/market/trading-pairs`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getArbitrageOpportunities': {
					const threshold = this.getNodeParameter('threshold', i, 0.1) as number;
					const queryParams = new URLSearchParams({ threshold: threshold.toString() });

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${credentials.baseUrl}/market/arbitrage?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`,
						{ itemIndex: i },
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
