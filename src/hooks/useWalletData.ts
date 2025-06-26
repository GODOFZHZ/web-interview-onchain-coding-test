import { useQuery } from "@tanstack/react-query";
import {
  Currency,
  ExchangeRate,
  WalletBalance,
  WalletData,
} from "../types/types";

const fetchCurrencies = async (): Promise<Currency[]> => {
  const res = await fetch("/api/currencies");
  const data = await res.json();
  return data.currencies;
};

const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
  const res = await fetch("/api/exchange-rates");
  const data = await res.json();
  return data.tiers;
};

const fetchWalletBalances = async (): Promise<WalletBalance[]> => {
  const res = await fetch("/api/wallet-balances");
  const data = await res.json();
  return data.wallet;
};

export const useWalletData = () => {
  // { queryKey: ['todos'], queryFn: getTodos }
  const currenciesQuery = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });
  const exchangeRatesQuery = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
  });
  const walletBalancesQuery = useQuery({
    queryKey: ["walletBalances"],
    queryFn: fetchWalletBalances,
  });

  // 处理加载/错误状态
  const isLoading =
    currenciesQuery.isLoading ||
    exchangeRatesQuery.isLoading ||
    walletBalancesQuery.isLoading;

  const error =
    currenciesQuery.error ||
    exchangeRatesQuery.error ||
    walletBalancesQuery.error;

  // 聚合数据
  const aggregatedData: WalletData | undefined =
    currenciesQuery.data && exchangeRatesQuery.data && walletBalancesQuery.data
      ? {
          currencies: currenciesQuery.data,
          exchangeRates: exchangeRatesQuery.data,
          walletBalances: walletBalancesQuery.data,
        }
      : undefined;

  return {
    data: aggregatedData,
    isLoading,
    error,
  };
};
