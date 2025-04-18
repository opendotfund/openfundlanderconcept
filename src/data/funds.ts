// Fund data shared across the application

export type Fund = {
  id: number;
  name: string;
  manager: string;
  aum: string;
  returns: string;
  returnsValue: number;
  focus: string;
  minInvestment: string;
  minInvestmentValue: number;
  year: string;
  yearValue: number;
  description: string;
  performance: string;
  performanceValue: number;
  type: string;
  volatility: string;
  volatilityValue: number;
  investors?: number;
  assetTypes?: string[];
  aumValue?: number;
  managementFee?: string;
  performanceFee?: string;
  lockupPeriod?: string;
  redemptionFrequency?: string;
  redemptionNotice?: string;
  minimumHoldingPeriod?: string;
  fundStrategy?: string;
  riskLevel?: string;
  inceptionDate?: string;
  benchmarkIndex?: string;
  benchmarkPerformance?: string;
  topHoldings?: string[];
  holdingsBreakdown?: Array<{name: string, value: number, color: string}>;
  depositFee?: string;
  withdrawalFee?: string;
  nextWithdrawalWindow?: string;
  timeUntilWithdrawal?: string;
  governanceToken?: string;
  votingRights?: string;
};

export const traditionalFunds: Fund[] = [
  {
    id: 1,
    name: 'Berkshire Hathaway',
    manager: 'Warren Buffett',
    aum: '$700B',
    aumValue: 700000000000,
    returns: '20.1%',
    returnsValue: 20.1,
    focus: 'Value Investing',
    minInvestment: '$400,000',
    minInvestmentValue: 400000,
    year: '1965',
    yearValue: 1965,
    description: 'American multinational conglomerate holding company led by Warren Buffett, known for its long-term value investing approach.',
    performance: '+18.2%',
    performanceValue: 18.2,
    type: 'TradFi Fund',
    volatility: 'Low',
    volatilityValue: 15,
    managementFee: '1%',
    performanceFee: '20%',
    lockupPeriod: '1 year',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '90 days',
    minimumHoldingPeriod: '12 months',
    fundStrategy: 'Long-term value investing across diverse industries with focus on quality businesses with strong competitive advantages.',
    riskLevel: 'Medium',
    inceptionDate: 'May 1, 1965',
    benchmarkIndex: 'S&P 500',
    benchmarkPerformance: '+10.5%',
    topHoldings: ['Apple', 'Bank of America', 'American Express', 'Coca-Cola', 'Chevron'],
    holdingsBreakdown: [
      { name: 'Tech Stocks', value: 35, color: '#2563eb' },
      { name: 'Financial Services', value: 30, color: '#9333ea' },
      { name: 'Consumer Goods', value: 20, color: '#16a34a' },
      { name: 'Energy', value: 10, color: '#d97706' },
      { name: 'Healthcare', value: 5, color: '#dc2626' }
    ]
  },
  {
    id: 2,
    name: 'ARK Innovation ETF',
    manager: 'Cathie Wood',
    aum: '$16.1B',
    aumValue: 16100000000,
    returns: '39.1%',
    returnsValue: 39.1,
    focus: 'Disruptive Innovation',
    minInvestment: '$100',
    minInvestmentValue: 100,
    year: '2014',
    yearValue: 2014,
    description: 'Actively managed ETF that invests in companies relevant to the theme of disruptive innovation.',
    performance: '+15.7%',
    performanceValue: 15.7,
    type: 'TradFi Fund',
    volatility: 'High',
    volatilityValue: 65,
    managementFee: '0.75%',
    performanceFee: '0%',
    lockupPeriod: 'None',
    redemptionFrequency: 'Daily',
    redemptionNotice: '1 day',
    minimumHoldingPeriod: 'None',
    fundStrategy: 'Growth-focused investing in disruptive innovation sectors including genomics, AI, fintech, autonomous tech, and next-gen internet.',
    riskLevel: 'High',
    inceptionDate: 'October 31, 2014',
    benchmarkIndex: 'NASDAQ Composite',
    benchmarkPerformance: '+12.3%',
    topHoldings: ['Tesla', 'Zoom', 'Roku', 'Square', 'Teladoc'],
    holdingsBreakdown: [
      { name: 'Technology', value: 45, color: '#2563eb' },
      { name: 'Healthcare', value: 25, color: '#9333ea' },
      { name: 'Communication Services', value: 15, color: '#16a34a' },
      { name: 'Financial Services', value: 10, color: '#d97706' },
      { name: 'Other', value: 5, color: '#dc2626' }
    ]
  },
  {
    id: 3,
    name: 'Bridgewater Associates',
    manager: 'Ray Dalio (Founder)',
    aum: '$140B',
    aumValue: 140000000000,
    returns: '12%',
    returnsValue: 12,
    focus: 'Global Macro',
    minInvestment: '$10M',
    minInvestmentValue: 10000000,
    year: '1975',
    yearValue: 1975,
    description: 'World\'s largest hedge fund specializing in global macro investing strategies.',
    performance: '+7.8%',
    performanceValue: 7.8,
    type: 'TradFi Fund',
    volatility: 'Medium',
    volatilityValue: 35,
    managementFee: '2%',
    performanceFee: '20%',
    lockupPeriod: '2 years',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '45 days',
    minimumHoldingPeriod: '24 months',
    fundStrategy: 'Global macro strategy with focus on economic trends and cycles, utilizing proprietary research and risk parity approach.',
    riskLevel: 'Medium',
    inceptionDate: 'January 1, 1975',
    benchmarkIndex: 'HFRI Macro Index',
    benchmarkPerformance: '+5.2%',
    topHoldings: ['US Treasuries', 'Gold', 'Euro Bonds', 'Japanese Yen', 'S&P 500 futures'],
    holdingsBreakdown: [
      { name: 'Government Bonds', value: 40, color: '#2563eb' },
      { name: 'Commodities', value: 25, color: '#9333ea' },
      { name: 'Equities', value: 20, color: '#16a34a' },
      { name: 'Currencies', value: 10, color: '#d97706' },
      { name: 'Credit', value: 5, color: '#dc2626' }
    ]
  },
  {
    id: 4,
    name: 'Renaissance Technologies',
    manager: 'Jim Simons (Founder)',
    aum: '$110B',
    aumValue: 110000000000,
    returns: '66%',
    returnsValue: 66,
    focus: 'Quantitative Trading',
    minInvestment: '$25M',
    minInvestmentValue: 25000000,
    year: '1982',
    yearValue: 1982,
    description: 'Highly quantitative hedge fund that relies on mathematical models to identify trading opportunities.',
    performance: '+21.6%',
    performanceValue: 21.6,
    type: 'TradFi Fund',
    volatility: 'Medium-High',
    volatilityValue: 52,
    managementFee: '5%',
    performanceFee: '44%',
    lockupPeriod: '3 years',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '90 days',
    minimumHoldingPeriod: '36 months',
    fundStrategy: 'Quantitative and systematic trading using mathematical and statistical methods across multiple asset classes.',
    riskLevel: 'High',
    inceptionDate: 'March 15, 1982',
    benchmarkIndex: 'S&P 500',
    benchmarkPerformance: '+10.5%',
    topHoldings: ['Proprietary trading algorithms', 'Statistical arbitrage positions', 'Market neutral strategies'],
    holdingsBreakdown: [
      { name: 'Equities', value: 50, color: '#2563eb' },
      { name: 'Futures', value: 25, color: '#9333ea' },
      { name: 'Fixed Income', value: 15, color: '#16a34a' },
      { name: 'Options', value: 10, color: '#d97706' }
    ]
  },
  {
    id: 5,
    name: 'Two Sigma Investments',
    manager: 'John Overdeck & David Siegel',
    aum: '$58B',
    aumValue: 58000000000,
    returns: '29%',
    returnsValue: 29,
    focus: 'Algorithmic Trading',
    minInvestment: '$5M',
    minInvestmentValue: 5000000,
    year: '2001',
    yearValue: 2001,
    description: 'Hedge fund that uses machine learning, distributed computing, and other technologies for trading.',
    performance: '+14.3%',
    performanceValue: 14.3,
    type: 'TradFi Fund',
    volatility: 'Medium',
    volatilityValue: 45,
    managementFee: '3%',
    performanceFee: '30%',
    lockupPeriod: '2 years',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '60 days',
    minimumHoldingPeriod: '24 months',
    fundStrategy: 'Data-driven approach combining machine learning and human expertise to identify patterns across markets.',
    riskLevel: 'Medium-High',
    inceptionDate: 'June 1, 2001',
    benchmarkIndex: 'HFRI Equity Hedge Index',
    benchmarkPerformance: '+9.8%',
    topHoldings: ['Machine learning models', 'Big data analytics platforms', 'High-frequency trading systems'],
    holdingsBreakdown: [
      { name: 'Technology', value: 35, color: '#2563eb' },
      { name: 'Healthcare', value: 25, color: '#9333ea' },
      { name: 'Consumer', value: 20, color: '#16a34a' },
      { name: 'Industrials', value: 15, color: '#d97706' },
      { name: 'Energy', value: 5, color: '#dc2626' }
    ]
  },
  {
    id: 6,
    name: 'Elliott Management',
    manager: 'Paul Singer',
    aum: '$48B',
    aumValue: 48000000000,
    returns: '14%',
    returnsValue: 14,
    focus: 'Activist Investing',
    minInvestment: '$5M',
    minInvestmentValue: 5000000,
    year: '1977',
    yearValue: 1977,
    description: 'Hedge fund known for its activist investment style and focus on distressed securities.',
    performance: '+9.2%',
    performanceValue: 9.2,
    type: 'TradFi Fund',
    volatility: 'Medium-Low',
    volatilityValue: 28,
    managementFee: '2%',
    performanceFee: '20%',
    lockupPeriod: '1 year',
    redemptionFrequency: 'Semi-annually',
    redemptionNotice: '60 days',
    minimumHoldingPeriod: '12 months',
    fundStrategy: 'Activist approach with focus on undervalued securities, distressed debt, and corporate governance improvements.',
    riskLevel: 'Medium',
    inceptionDate: 'February 1, 1977',
    benchmarkIndex: 'HFRI Event-Driven Index',
    benchmarkPerformance: '+7.4%',
    topHoldings: ['Distressed debt', 'Corporate restructurings', 'Activist positions', 'Sovereign debt'],
    holdingsBreakdown: [
      { name: 'Distressed Debt', value: 40, color: '#2563eb' },
      { name: 'Activist Positions', value: 30, color: '#9333ea' },
      { name: 'Arbitrage', value: 20, color: '#16a34a' },
      { name: 'Sovereign Debt', value: 10, color: '#d97706' }
    ]
  }
];

export const cryptoFunds: Fund[] = [
  {
    id: 1,
    name: 'Grayscale Bitcoin Trust',
    manager: 'Grayscale Investments',
    aum: '$30.3B',
    aumValue: 30300000000,
    returns: '154%',
    returnsValue: 154,
    focus: 'Bitcoin',
    minInvestment: '$50,000',
    minInvestmentValue: 50000,
    year: '2013',
    yearValue: 2013,
    description: 'The first publicly quoted Bitcoin investment vehicle offering exposure to Bitcoin.',
    performance: '+65.2%',
    performanceValue: 65.2,
    type: 'Crypto Fund',
    volatility: 'Very High',
    volatilityValue: 85,
    managementFee: '2%',
    performanceFee: '0%',
    lockupPeriod: '6 months',
    redemptionFrequency: 'Daily',
    redemptionNotice: '1 day',
    minimumHoldingPeriod: '6 months',
    fundStrategy: '100% allocation to Bitcoin, with secure cold storage custody solution.',
    riskLevel: 'High',
    inceptionDate: 'September 25, 2013',
    benchmarkIndex: 'Bitcoin Price',
    benchmarkPerformance: '+60.8%',
    topHoldings: ['Bitcoin'],
    holdingsBreakdown: [
      { name: 'Bitcoin', value: 100, color: '#f7931a' }
    ]
  },
  {
    id: 2,
    name: 'Pantera Capital',
    manager: 'Dan Morehead',
    aum: '$4.7B',
    aumValue: 4700000000,
    returns: '86.5%',
    returnsValue: 86.5,
    focus: 'Blockchain & Crypto',
    minInvestment: '$100,000',
    minInvestmentValue: 100000,
    year: '2013',
    yearValue: 2013,
    description: 'One of the first U.S. Bitcoin investment firms and blockchain investment funds.',
    performance: '+42.8%',
    performanceValue: 42.8,
    type: 'Crypto Fund',
    volatility: 'High',
    volatilityValue: 70,
    managementFee: '2.5%',
    performanceFee: '25%',
    lockupPeriod: '1 year',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '45 days',
    minimumHoldingPeriod: '12 months',
    fundStrategy: 'Diversified portfolio of blockchain technologies, cryptocurrencies, and early-stage venture investments.',
    riskLevel: 'High',
    inceptionDate: 'June 11, 2013',
    benchmarkIndex: 'Crypto Market Cap',
    benchmarkPerformance: '+38.5%',
    topHoldings: ['Bitcoin', 'Ethereum', 'Polkadot', 'Filecoin', 'Zero'],
    holdingsBreakdown: [
      { name: 'Bitcoin', value: 40, color: '#f7931a' },
      { name: 'Ethereum', value: 30, color: '#627eea' },
      { name: 'DeFi', value: 15, color: '#8247e5' },
      { name: 'Layer 1', value: 10, color: '#e84142' },
      { name: 'NFTs', value: 5, color: '#13a9fd' }
    ]
  },
  {
    id: 3,
    name: 'Polychain Capital',
    manager: 'Olaf Carlson-Wee',
    aum: '$1B',
    aumValue: 1000000000,
    returns: '94.7%',
    returnsValue: 94.7,
    focus: 'Protocol Tokens',
    minInvestment: '$250,000',
    minInvestmentValue: 250000,
    year: '2016',
    yearValue: 2016,
    description: 'Crypto fund investing in blockchain protocols and early-stage projects.',
    performance: '+38.6%',
    performanceValue: 38.6,
    type: 'Crypto Fund',
    volatility: 'High',
    volatilityValue: 75,
    managementFee: '2.5%',
    performanceFee: '25%',
    lockupPeriod: '1 year',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '60 days',
    minimumHoldingPeriod: '12 months',
    fundStrategy: 'Focus on investing in protocols, not companies, with emphasis on governance tokens and yield-generating assets.',
    riskLevel: 'Very High',
    inceptionDate: 'October 1, 2016',
    benchmarkIndex: 'DeFi Index',
    benchmarkPerformance: '+32.4%',
    topHoldings: ['Ethereum', 'Compound', 'Cosmos', 'Polkadot', 'Dfinity'],
    holdingsBreakdown: [
      { name: 'Layer 1', value: 45, color: '#627eea' },
      { name: 'DeFi', value: 35, color: '#8247e5' },
      { name: 'NFT', value: 10, color: '#13a9fd' },
      { name: 'DAO', value: 10, color: '#e84142' }
    ]
  },
  {
    id: 4,
    name: '3 Arrows Capital',
    manager: 'Su Zhu & Kyle Davies',
    aum: '$2.8B',
    aumValue: 2800000000,
    returns: '112%',
    returnsValue: 112,
    focus: 'Crypto Trading',
    minInvestment: '$500,000',
    minInvestmentValue: 500000,
    year: '2012',
    yearValue: 2012,
    description: 'Trading firm focused on emerging cryptocurrencies and blockchain companies.',
    performance: '+49.7%',
    performanceValue: 49.7,
    type: 'Crypto Fund',
    volatility: 'Very High',
    volatilityValue: 90,
    managementFee: '3%',
    performanceFee: '30%',
    lockupPeriod: '1 year',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '60 days',
    minimumHoldingPeriod: '12 months',
    fundStrategy: 'High conviction trading in liquid crypto markets with focus on emerging Layer 1s and DeFi protocols.',
    riskLevel: 'Very High',
    inceptionDate: 'November 15, 2012',
    benchmarkIndex: 'Crypto 10 Index',
    benchmarkPerformance: '+42.1%',
    topHoldings: ['Bitcoin', 'Ethereum', 'Avalanche', 'Solana', 'Terra'],
    holdingsBreakdown: [
      { name: 'Bitcoin', value: 30, color: '#f7931a' },
      { name: 'Ethereum', value: 30, color: '#627eea' },
      { name: 'Other Layer 1', value: 25, color: '#e84142' },
      { name: 'DeFi', value: 15, color: '#8247e5' }
    ]
  },
  {
    id: 5,
    name: 'a16z Crypto Fund',
    manager: 'Andreessen Horowitz',
    aum: '$3.1B',
    returns: '121.5%',
    minInvestment: '$1,000,000',
    minInvestmentValue: 1000000,
    year: '2018',
    yearValue: 2018,
    description: 'Venture capital fund focused on crypto and Web3 investments from early-stage protocols to later-stage networks.',
    type: 'Crypto Fund',
    focus: 'Web3 & Blockchain',
    riskLevel: 'High',
    performance: '121.5%',
    volatility: '45.2%',
    managementFee: '2.5%',
    performanceFee: '25%',
    lockupPeriod: '5 years',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '90 days',
    nextWithdrawalWindow: 'Q2 2024',
    timeUntilWithdrawal: '45 days',
    assetTypes: ['Crypto', 'Web3', 'Blockchain'],
    benchmarkIndex: 'Crypto VC Index',
    benchmarkPerformance: '+85.2%',
    fundStrategy: 'Focus on early-stage Web3 protocols and infrastructure with strong network effects and developer communities.',
    aumValue: 3100000000,
    returnsValue: 121.5,
    performanceValue: 121.5,
    volatilityValue: 45.2,
    holdingsBreakdown: [
      { name: 'Infrastructure', value: 35, color: '#4f46e5' },
      { name: 'DeFi', value: 25, color: '#8247e5' },
      { name: 'Gaming', value: 20, color: '#e11d48' },
      { name: 'Social', value: 15, color: '#0ea5e9' },
      { name: 'Other', value: 5, color: '#64748b' }
    ],
    topHoldings: [
      'Uniswap',
      'Solana',
      'Aptos',
      'Optimism',
      'Yuga Labs'
    ],
    investors: 125,
    inceptionDate: '2018-06-01'
  }
];

export const openfundFunds: Fund[] = [1, 2, 3, 4, 5].map((fund) => ({
  id: fund,
  name: `Alpha Seekers #${fund}`,
  manager: `0x7a...3fe${fund}`,
  aum: `$${(342000 + fund * 25000).toLocaleString()}`,
  aumValue: 342000 + fund * 25000,
  returns: `${22 + fund * 3}%`,
  returnsValue: 22 + fund * 3,
  focus: fund % 2 === 0 ? 'Layer 1' : 'DeFi',
  minInvestment: '$1,000',
  minInvestmentValue: 1000,
  year: `202${fund}`,
  yearValue: 2020 + fund,
  description: `Decentralized fund specializing in ${fund % 2 === 0 ? 'Layer 1 protocols' : 'DeFi investments'} with a focus on growth and yield opportunities.`,
  performance: `+${12 + fund * 2}%`,
  performanceValue: 12 + fund * 2,
  type: 'Decentralized Fund',
  investors: 75 + fund * 12,
  volatility: fund % 2 === 0 ? 'High' : 'Medium-High',
  volatilityValue: 55 + fund * 5,
  assetTypes: fund % 3 === 0 ? ['Crypto'] : fund % 3 === 1 ? ['Crypto', 'Stock'] : ['Crypto', 'Commodity'],
  managementFee: '2%',
  performanceFee: '20%', 
  depositFee: '0.5%',
  withdrawalFee: '1%',
  lockupPeriod: '30 days',
  nextWithdrawalWindow: `${new Date().getDate() + 10}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
  timeUntilWithdrawal: `${10 - (fund % 10)} days`,
  fundStrategy: `Smart contract-based strategy focusing on ${fund % 2 === 0 ? 'Layer 1 protocols with staking yield' : 'DeFi liquidity mining and yield farming'}`,
  riskLevel: fund % 2 === 0 ? 'High' : 'Medium-High',
  inceptionDate: `February ${10 + fund}, 202${fund}`,
  governanceToken: 'AST',
  votingRights: 'Pro-rata based on investment',
  topHoldings: fund % 2 === 0 ? ['Ethereum', 'Solana', 'Avalanche', 'Cardano', 'Polkadot'] : ['Uniswap', 'Aave', 'Compound', 'MakerDAO', 'Curve'],
  holdingsBreakdown: fund % 2 === 0 
    ? [
        { name: 'Major Coins', value: 45, color: '#3b82f6' },  // blue
        { name: 'Alt Coins', value: 40, color: '#8b5cf6' },    // purple
        { name: 'Meme Coins', value: 15, color: '#f97316' }    // orange
      ]
    : [
        { name: 'Major Coins', value: 30, color: '#3b82f6' },  // blue 
        { name: 'Alt Coins', value: 60, color: '#8b5cf6' },    // purple
        { name: 'Meme Coins', value: 10, color: '#f97316' }    // orange
      ]
}));

// Function to get all funds combined
export const getAllFunds = (): Fund[] => {
  return [...traditionalFunds, ...cryptoFunds, ...openfundFunds];
};
