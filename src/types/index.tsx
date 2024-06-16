export interface IPayment {
  cardinal_address: string;
  cardinal_pubkey: string;
  ordinal_address: string;
  ordinal_pubkey: string;
  wallet: string;
  privkey: string;
  inscription_address: string;
  txid: string;
  inscription_fee: number;
  inscription_id: string;
  network: "testnet" | "mainnet";
  status: string;
  fee_rate: number;
}



export interface IBalanceData {
  balance: number;
  mempool_balance: number;
  dummyUtxos: number;
}
export interface IFeeInfo {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
  lastChecked: Date;
}

