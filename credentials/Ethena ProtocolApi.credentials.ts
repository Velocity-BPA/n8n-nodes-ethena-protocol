import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EthenaProtocolApi implements ICredentialType {
	name = 'ethenaProtocolApi';
	displayName = 'Ethena Protocol API';
	documentationUrl = 'https://docs.ethena.fi/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API key for Ethena Protocol. Obtain from your Ethena Protocol dashboard.',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.ethena.fi/api/v1',
			description: 'Base URL for the Ethena Protocol API',
		},
	];
}