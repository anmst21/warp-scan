const tokens = [
  {
    symbol: "USDT",
    chainId: 1,
    name: "Tether USD",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
    logoURI:
      "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    rating: 1019,
    eip2612: false,
    providers: [
      "1inch",
      "Arb Whitelist Era",
      "CMC200 ERC20",
      "CMC Stablecoin",
      "CoinGecko",
      "Compound",
      "Curve Token List",
      "Dharma Token List",
      "Furucombo",
      "Kleros Tokens",
      "MyCrypto Token List",
      "Roll Social Money",
      "Uniswap Labs Default",
      "Wrapped Tokens",
      "Zerion",
    ],
    tags: [
      {
        value: "bases",
        provider: "Roll Social Money",
      },
      {
        value: "PEG:USD",
        provider: "1inch",
      },
      {
        value: "stablecoin",
        provider: "Dharma Token List",
      },
      {
        value: "tether",
        provider: "Wrapped Tokens",
      },
      {
        value: "tokens",
        provider: "1inch",
      },
      {
        value: "usdt",
        provider: "Wrapped Tokens",
      },
    ],
  },
  {
    symbol: "WETH",
    chainId: 1,
    name: "Wrapped Ether",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    rating: 1015,
    eip2612: false,
    providers: [
      "1inch",
      "Arb Whitelist Era",
      "CoinGecko",
      "Curve Token List",
      "Furucombo",
      "Kleros Tokens",
      "MyCrypto Token List",
      "Roll Social Money",
      "Uniswap Labs Default",
      "Wrapped Tokens",
      "Zerion",
    ],
    tags: [
      {
        value: "bases",
        provider: "Roll Social Money",
      },
      {
        value: "ether",
        provider: "Wrapped Tokens",
      },
      {
        value: "PEG:ETH",
        provider: "1inch",
      },
      {
        value: "tokens",
        provider: "1inch",
      },
    ],
  },
  {
    symbol: "LEND",
    chainId: 1,
    name: "EthLend",
    address: "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0x80fb784b7ed66730e8b1dbd9820afd29931aab03.png",
    rating: 1014,
    eip2612: false,
    providers: [
      "1inch",
      "CMC200 ERC20",
      "CMC DeFi",
      "CoinGecko",
      "Defiprime",
      "Dharma Token List",
      "Furucombo",
      "Kleros Tokens",
      "MyCrypto Token List",
      "Zerion",
    ],
    tags: [
      {
        value: "defi",
        provider: "Defiprime",
      },
      {
        value: "gov",
        provider: "Dharma Token List",
      },
      {
        value: "tokens",
        provider: "1inch",
      },
      {
        value: "tokens",
        provider: "Zerion",
      },
    ],
  },
  {
    symbol: "cETH",
    chainId: 1,
    name: "Compound ETH",
    address: "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
    decimals: 8,
    logoURI:
      "https://tokens.1inch.io/0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5.png",
    rating: 1013,
    eip2612: false,
    providers: [
      "1inch",
      "CMC DeFi",
      "CoinGecko",
      "Compound",
      "Dharma Token List",
      "Furucombo",
      "Kleros Tokens",
      "MyCrypto Token List",
      "Zerion",
    ],
    tags: [
      {
        value: "compound",
        provider: "Dharma Token List",
      },
      {
        value: "PEG:ETH",
        provider: "1inch",
      },
      {
        value: "savings",
        provider: "1inch",
      },
      {
        value: "yield",
        provider: "Dharma Token List",
      },
    ],
  },
  {
    symbol: "EBOX",
    chainId: 1,
    name: "ethbox Token",
    address: "0x33840024177a7daca3468912363bed8b425015c5",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0x33840024177a7daca3468912363bed8b425015c5.png",
    rating: 1012,
    eip2612: false,
    providers: ["1inch", "CoinGecko", "Coinmarketcap"],
    tags: [
      {
        value: "tokens",
        provider: "1inch",
      },
    ],
  },
  {
    symbol: "aWETH",
    chainId: 1,
    name: "Aave interest bearing WETH",
    address: "0x030ba81f1c18d280636f32af80b9aad02cf0854e",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0x030ba81f1c18d280636f32af80b9aad02cf0854e.png",
    rating: 1011,
    eip2612: true,
    providers: [
      "1inch",
      "CoinGecko",
      "Curve Token List",
      "Furucombo",
      "Kleros Tokens",
      "Trust Wallet Assets",
      "Zerion",
    ],
    tags: [
      {
        value: "aavev2",
        provider: "Zerion",
      },
      {
        value: "PEG:ETH",
        provider: "1inch",
      },
      {
        value: "tokens",
        provider: "1inch",
      },
    ],
  },
  {
    symbol: "stETH",
    chainId: 1,
    name: "stETH",
    address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0xae7ab96520de3a18e5e111b5eaab095312d7fe84.png",
    rating: 1010,
    eip2612: false,
    providers: [
      "1inch",
      "CoinGecko",
      "Curve Token List",
      "Furucombo",
      "Kleros Tokens",
      "Zerion",
    ],
    tags: [
      {
        value: "PEG:ETH",
        provider: "1inch",
      },
      {
        value: "tokens",
        provider: "1inch",
      },
    ],
  },
  {
    symbol: "ANKRETH",
    chainId: 1,
    name: "Ankr Staked ETH",
    address: "0xe95a203b1a91a908f9b9ce46459d101078c2c3cb",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0xe95a203b1a91a908f9b9ce46459d101078c2c3cb.png",
    rating: 1010,
    eip2612: false,
    providers: [
      "1inch",
      "CoinGecko",
      "Curve Token List",
      "Furucombo",
      "Kleros Tokens",
      "Zerion",
    ],
    tags: [
      {
        value: "PEG:ETH",
        provider: "1inch",
      },
      {
        value: "tokens",
        provider: "1inch",
      },
    ],
  },
  {
    symbol: "POOL",
    chainId: 1,
    name: "PoolTogether",
    address: "0x0cec1a9154ff802e7934fc916ed7ca50bde6844e",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0x0cec1a9154ff802e7934fc916ed7ca50bde6844e.png",
    rating: 1010,
    eip2612: true,
    providers: [
      "1inch",
      "CoinGecko",
      "Compound",
      "Kleros Tokens",
      "Trust Wallet Assets",
      "Zerion",
    ],
    tags: [
      {
        value: "tokens",
        provider: "1inch",
      },
    ],
  },
];

export { tokens };
