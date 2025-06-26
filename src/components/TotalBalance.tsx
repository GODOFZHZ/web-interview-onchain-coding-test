import React from "react";
import { WalletData } from "../types/types";
import { multiply, add, roundDecimal, ROUNDING_MODES } from "@/utils/calc";
interface TotalBalanceProps {
  data: WalletData;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ data }) => {
  // 计算总价值
  const calculateTotalBalance = () => {
    var res = data.walletBalances.reduce((total, balance) => {
      const rateObj = data.exchangeRates.find((rate) => rate.from_currency === balance.currency && rate.to_currency === "USD");
      if (!rateObj || rateObj.rates.length === 0) return total;
      const decimalValue = balance.amount;
      const exchangeRate = rateObj.rates[0].rate;
      total = add(total, multiply(decimalValue, exchangeRate));
      return total;
    }, 0);
    return res;
  };
  var totalValue =  roundDecimal(calculateTotalBalance(),{ decimalPlaces: 2,  roundingMode: ROUNDING_MODES.ROUND_DOWN} );
  return (
    <div className="total-balance text-center mb-5 mt-5">
      <div className="balance-title">
        <span className="text-gray-500 font-bold leading-none">$ </span>
        <span className="text-white text-2xl font-bold leading-none">{totalValue}</span>
        <span className="text-gray-500 font-bold leading-none"> USD</span>
      </div>
    </div>
  );
};

export default TotalBalance;
