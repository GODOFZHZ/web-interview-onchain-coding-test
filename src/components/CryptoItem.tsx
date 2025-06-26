import React from "react";
import { Currency, WalletBalance, ExchangeRate } from "../types/types";
import CryptoIcon from "./CryptoIcon";
import { multiply, add, roundDecimal } from "@/utils/calc";
interface CryptoItemProps {
  currency: Currency;
  balance: WalletBalance;
  exchangeRates: ExchangeRate[];
}

const CryptoItem: React.FC<CryptoItemProps> = ({
  currency,
  balance,
  exchangeRates,
}) => {
  // 获取该货币的汇率
  const getExchangeRate = () => {
    const rateObj = exchangeRates.find((rate) =>rate.from_currency === currency.symbol && rate.to_currency === "USD");
    return rateObj && rateObj.rates.length > 0 ? rateObj.rates[0].rate : 0;
  };
  // 计算展示值
  const exchangeRate = getExchangeRate();
  const decimalValue = roundDecimal(balance.amount,{ decimalPlaces: currency.display_decimal } );
  const usdValue =  roundDecimal(multiply(balance.amount, exchangeRate), { decimalPlaces: currency.display_decimal });
  return (
    <div className="crypto-item mb-2 shadow-2xs border-gray-200 border border-solid rounded-xl p-2">
      <div className="crypto-info justify-between">
        <CryptoIcon coinData={currency} />
        <div className="crypto-name-balance justify-between  basis-80">
          <div className="crypto-name items-center text-sm basis-50">{currency.name}</div>
          <div className="crypto-balance basis-50 text-right text-sm">
            {decimalValue} {currency.symbol}
            <div className="crypto-value text-xs">${usdValue} USD</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoItem;
