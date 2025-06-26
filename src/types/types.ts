// 定义货币数据类型
export interface Currency {
  coin_id: string;
  name: string;
  symbol: string;
  token_decimal: number;
  colorful_image_url: string;
}
// 定义汇率类型
export interface ExchangeRate {
  from_currency: string;
  to_currency: string;
  rates: { rate: string }[];
}
// 定义钱包余额类型
export interface WalletBalance {
  currency: string;
  amount: number;
}
// 聚合数据结果
export interface WalletData {
  currencies: Currency[];
  exchangeRates: ExchangeRate[];
  walletBalances: WalletBalance[];
}