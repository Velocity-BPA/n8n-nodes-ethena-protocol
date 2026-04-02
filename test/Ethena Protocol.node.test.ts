/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { EthenaProtocol } from '../nodes/Ethena Protocol/Ethena Protocol.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('EthenaProtocol Node', () => {
  let node: EthenaProtocol;

  beforeAll(() => {
    node = new EthenaProtocol();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Ethena Protocol');
      expect(node.description.name).toBe('ethenaprotocol');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 5 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(5);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(5);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('USDe Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://app.ethena.fi/api/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  describe('getBalance operation', () => {
    it('should get USDe balance successfully', async () => {
      const mockResponse = { balance: '1000.50', address: '0x123' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('0x123');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUSDeOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://app.ethena.fi/api/v1/usde/balance/0x123',
        headers: { 'Authorization': 'Bearer test-key' },
        json: true,
      });
    });

    it('should handle getBalance error', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('0x123');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeUSDeOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getTotalSupply operation', () => {
    it('should get total supply successfully', async () => {
      const mockResponse = { totalSupply: '1000000000' };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTotalSupply');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUSDeOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getMintHistory operation', () => {
    it('should get mint history successfully', async () => {
      const mockResponse = { history: [] };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getMintHistory')
        .mockReturnValueOnce('0x123')
        .mockReturnValueOnce(50)
        .mockReturnValueOnce(10);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUSDeOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getRedeemHistory operation', () => {
    it('should get redeem history successfully', async () => {
      const mockResponse = { history: [] };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getRedeemHistory')
        .mockReturnValueOnce('0x123')
        .mockReturnValueOnce(50)
        .mockReturnValueOnce(10);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUSDeOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getCollateralInfo operation', () => {
    it('should get collateral info successfully', async () => {
      const mockResponse = { collateral: [] };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getCollateralInfo');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUSDeOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });
});

describe('SUSDe Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://app.ethena.fi/api/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  describe('getBalance operation', () => {
    it('should get sUSDe balance successfully', async () => {
      const mockResponse = { balance: '1000.50', stakedAmount: '950.25' };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('0x123...');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeSUSDeOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });

    it('should handle getBalance error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('0x123...');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const items = [{ json: {} }];
      const result = await executeSUSDeOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getCurrentAPY operation', () => {
    it('should get current APY successfully', async () => {
      const mockResponse = { apy: 8.5, timestamp: '2024-01-01T00:00:00Z' };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getCurrentAPY');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeSUSDeOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getRewards operation', () => {
    it('should get rewards successfully', async () => {
      const mockResponse = { totalRewards: '125.75', claimableRewards: '50.25' };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getRewards')
        .mockReturnValueOnce('0x123...');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeSUSDeOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getStakeHistory operation', () => {
    it('should get stake history successfully', async () => {
      const mockResponse = { transactions: [], total: 0 };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getStakeHistory')
        .mockReturnValueOnce('0x123...')
        .mockReturnValueOnce(50)
        .mockReturnValueOnce(10);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeSUSDeOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getUnstakeHistory operation', () => {
    it('should get unstake history successfully', async () => {
      const mockResponse = { transactions: [], total: 0 };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getUnstakeHistory')
        .mockReturnValueOnce('0x123...')
        .mockReturnValueOnce(25)
        .mockReturnValueOnce(5);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeSUSDeOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getTotalStaked operation', () => {
    it('should get total staked successfully', async () => {
      const mockResponse = { totalStaked: '50000000.00', holders: 15000 };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTotalStaked');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeSUSDeOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });
});

describe('Governance Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://app.ethena.fi/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('getProposals', () => {
		it('should get all proposals successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getProposals')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(100)
				.mockReturnValueOnce(0);

			const mockResponse = {
				proposals: [
					{ id: '1', title: 'Test Proposal', status: 'active' }
				]
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://app.ethena.fi/api/v1/governance/proposals?limit=100&offset=0',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});

		it('should handle errors for getProposals', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getProposals')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(100)
				.mockReturnValueOnce(0);

			mockExecuteFunctions.continueOnFail.mockReturnValue(true);
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('getProposal', () => {
		it('should get specific proposal successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getProposal')
				.mockReturnValueOnce('proposal-123');

			const mockResponse = {
				id: 'proposal-123',
				title: 'Test Proposal',
				description: 'Test Description'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://app.ethena.fi/api/v1/governance/proposals/proposal-123',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});
	});

	describe('getVotingPower', () => {
		it('should get voting power successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getVotingPower')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890');

			const mockResponse = {
				address: '0x1234567890123456789012345678901234567890',
				votingPower: '1000000000000000000',
				delegatedPower: '0'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
		});
	});

	describe('getVotes', () => {
		it('should get voting history successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getVotes')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce(0);

			const mockResponse = {
				votes: [
					{ proposalId: '1', choice: 'for', votingPower: '1000000' }
				]
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
		});
	});

	describe('getDelegation', () => {
		it('should get delegation status successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getDelegation')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890');

			const mockResponse = {
				delegator: '0x1234567890123456789012345678901234567890',
				delegate: '0x0987654321098765432109876543210987654321',
				delegatedPower: '1000000000000000000'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
		});
	});

	describe('getGovernanceStats', () => {
		it('should get governance stats successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getGovernanceStats');

			const mockResponse = {
				totalProposals: 25,
				activeProposals: 3,
				totalVoters: 1500,
				totalVotingPower: '10000000000000000000000'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://app.ethena.fi/api/v1/governance/stats',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});
	});
});

describe('Analytics Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://app.ethena.fi/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('getTVL operation', () => {
		it('should retrieve TVL data successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTVL');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('7d');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				tvl: '1000000',
				change24h: '2.5%',
			});

			const result = await executeAnalyticsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.tvl).toBe('1000000');
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://app.ethena.fi/api/v1/analytics/tvl',
				headers: {
					Authorization: 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				qs: { timeframe: '7d' },
				json: true,
			});
		});

		it('should handle TVL request errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTVL');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('7d');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(
				new Error('API Error'),
			);

			await expect(
				executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]),
			).rejects.toThrow('API Error');
		});
	});

	describe('getVolume operation', () => {
		it('should retrieve volume data successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getVolume');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('24h');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('trading');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				volume: '500000',
				transactions: 1250,
			});

			const result = await executeAnalyticsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.volume).toBe('500000');
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://app.ethena.fi/api/v1/analytics/volume',
				headers: {
					Authorization: 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				qs: { timeframe: '24h', type: 'trading' },
				json: true,
			});
		});
	});

	describe('getYieldData operation', () => {
		it('should retrieve yield data successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getYieldData');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('30d');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				apy: '15.5%',
				yieldHistory: [],
			});

			const result = await executeAnalyticsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.apy).toBe('15.5%');
		});
	});

	describe('getProtocolStats operation', () => {
		it('should retrieve protocol stats successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getProtocolStats');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				totalUsers: 10000,
				totalTransactions: 500000,
			});

			const result = await executeAnalyticsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.totalUsers).toBe(10000);
		});
	});

	describe('getCollateralComposition operation', () => {
		it('should retrieve collateral composition successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getCollateralComposition');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				composition: [
					{ asset: 'ETH', percentage: 60 },
					{ asset: 'BTC', percentage: 40 },
				],
			});

			const result = await executeAnalyticsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.composition).toHaveLength(2);
		});
	});
});

describe('Market Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://app.ethena.fi/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getPrice operation', () => {
		it('should get current USDe price successfully', async () => {
			const mockPriceData = {
				price: 1.001,
				pegStatus: 'stable',
				timestamp: '2024-01-01T12:00:00Z',
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getPrice');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockPriceData);

			const result = await executeMarketOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockPriceData,
				pairedItem: { item: 0 },
			}]);
		});

		it('should handle getPrice errors', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getPrice');

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeMarketOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: { error: 'API Error' },
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getSpread operation', () => {
		it('should get bid-ask spread successfully', async () => {
			const mockSpreadData = {
				bidPrice: 0.999,
				askPrice: 1.001,
				spread: 0.002,
				spreadPercentage: 0.2,
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getSpread');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockSpreadData);

			const result = await executeMarketOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockSpreadData,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getLiquidity operation', () => {
		it('should get liquidity metrics successfully', async () => {
			const mockLiquidityData = {
				dex: 'uniswap-v3',
				totalLiquidity: 10000000,
				liquidityPairs: ['USDe/USDC', 'USDe/USDT'],
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getLiquidity')
				.mockReturnValueOnce('uniswap-v3');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockLiquidityData);

			const result = await executeMarketOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockLiquidityData,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getTradingPairs operation', () => {
		it('should get trading pairs successfully', async () => {
			const mockTradingPairsData = {
				pairs: [
					{ pair: 'USDe/USDC', volume24h: 1000000, price: 1.001 },
					{ pair: 'USDe/USDT', volume24h: 800000, price: 0.999 },
				],
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getTradingPairs');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockTradingPairsData);

			const result = await executeMarketOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockTradingPairsData,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getArbitrageOpportunities operation', () => {
		it('should get arbitrage opportunities successfully', async () => {
			const mockArbitrageData = {
				opportunities: [
					{
						pair: 'USDe/USDC',
						buyExchange: 'uniswap',
						sellExchange: 'curve',
						profitPercentage: 0.15,
					},
				],
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getArbitrageOpportunities')
				.mockReturnValueOnce(0.1);

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockArbitrageData);

			const result = await executeMarketOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockArbitrageData,
				pairedItem: { item: 0 },
			}]);
		});
	});
});
});
