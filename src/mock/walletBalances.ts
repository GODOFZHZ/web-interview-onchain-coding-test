export default [
  {
    url: "/api/wallet-balances",
    method: "get",
    response: () => ({
      ok: true,
      warning: "",
      wallet: [
        {
          currency: "USDT",
          amount: 1245,
        },
        {
          currency: "BTC",
          amount: 1.4,
        },
        {
          currency: "ETH",
          amount: 20.3,
        },
        {
          currency: "CRO",
          amount: 259.1,
        },
        {
          currency: "DAI",
          amount: 854,
        },
      ],
    }),
  },
];
