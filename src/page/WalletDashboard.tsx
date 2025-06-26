import React from "react";
import CryptoItem from "@/components/CryptoItem";
import TotalBalance from "@/components/TotalBalance";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useWalletData } from "@/hooks/useWalletData";

const WalletBalance: React.FC = () => {
  const { data, isLoading, error } = useWalletData();
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error loading data" />;
  if (!data) return <div>No data available</div>;
  return (
    <>
      <div className="wallet-container my-auto">
        <TotalBalance data={data} />
        <div className="crypto-list bg-white w-xs justify-self-center rounded-lg p-3 mt-5">
          {data.walletBalances.map((balance) => {
            const currency = data.currencies.find(
              (c) => c.symbol === balance.currency
            );

            return currency ? (
              <CryptoItem
                key={balance.currency}
                currency={currency}
                balance={balance}
                exchangeRates={data.exchangeRates}
              />
            ) : null;
          })}
        </div>
      </div>
      <div className="justify-self-center mt-5 text-white text-center m-4">
        1. 图片加载处理逻辑：先加载主图-&gt;主图加载失败-&gt;加载副图-&gt;副图加载失败-&gt;渲染代币symbol名称。
      </div>
      <div className="justify-self-center mt-5 text-white text-center m-4">
        2. 金额：使用big.js，进行加法、乘法等运算，防止精度丢失。
      </div>
      <div className="justify-self-center mt-5 text-white text-center m-4">
        3. USD金额/代币金额可以按display_decimal精度展示
      </div>
    </>
  );
};

export default WalletBalance;
