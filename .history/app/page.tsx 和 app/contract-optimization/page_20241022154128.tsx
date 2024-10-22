const exampleContracts = [
  { address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", info: "Uniswap V2: Router 2 - 去中心化交易所路由合约" },
  { address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", info: "DAI Stablecoin - 稳定币合约" },
  { address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", info: "USD Coin - USDC稳定币合约" },
  { address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", info: "Tether USD - USDT稳定币合约" },
  { address: "0x514910771AF9Ca656af840dff83E8264EcF986CA", info: "ChainLink Token - 预言机代币合约" },
  { address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", info: "Uniswap - UNI治理代币合约" },
];

// 在渲染部分使用这个数组
{exampleContracts.map((contract, index) => (
  // ... 渲染逻辑
))}