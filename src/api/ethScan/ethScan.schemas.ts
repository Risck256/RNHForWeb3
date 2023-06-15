export interface ETHScanApiResponse<T> {
  readonly message: 'OK' | 'KO';
  readonly result: T;
}

export interface AccountTransaction {
  readonly blockHash: string;
  readonly blockNumber: string;
  readonly confirmations: string;
  readonly contractAddress: string;
  readonly cumulativeGasUsed: string;
  readonly from: string;
  readonly functionName: string;
  readonly gas: string;
  readonly gasPrice: string;
  readonly gasUsed: string;
  readonly hash: string;
  readonly input: string;
  readonly isError: string;
  readonly methodId: string;
  readonly nonce: string;
  readonly timeStamp: string;
  readonly to: string;
  readonly transactionIndex: string;
  readonly txreceipt_status: string;
  readonly value: string;
}
