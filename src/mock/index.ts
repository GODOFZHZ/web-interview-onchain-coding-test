import currency from './currency';
import exchangeRates from './exchangeRates';
import walletBalances from './walletBalances';

export default [
  ...currency,
  ...exchangeRates,
  ...walletBalances,
];