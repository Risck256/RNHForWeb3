import { AccountTransaction, ETHScanApiResponse } from './ethScan.schemas';
import Config from 'react-native-config';

// https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
const getTransactionsFor = async (
  address: string,
): Promise<ETHScanApiResponse<AccountTransaction[]> | undefined> => {
  console.log('getTransactionsFor', address);
  const searchParams = new URLSearchParams({
    module: 'account',
    action: 'txlist',
    address,
    startblock: '0',
    endblock: '99999999',
    page: '1',
    offset: '10',
    sort: 'asc',
    apikey: Config.ETHSCAN_API_KEY!,
  });

  try {
    const response = await fetch(`${Config.ETHSCAN_URL}?${searchParams}`);
    return response.json();
  } catch (error) {
    console.warn('error: ', error);
    return;
  }
};

export const ETHScanAPIs = {
  getTransactionsFor,
};
