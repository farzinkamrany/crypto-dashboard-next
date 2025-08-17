import axios from 'axios';

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
};

export const COINGECKO = 'https://api.coingecko.com/api/v3';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function fetchCoins(vsCurrency: string = 'usd'): Promise<Coin[]> {
  if (useMock) {
    const mock = await import('../public/mock/coins.json');
    return mock.default as Coin[];
  }
  const { data } = await axios.get(`${COINGECKO}/coins/markets`, {
    params: {
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: 50,
      page: 1,
      sparkline: true,
      price_change_percentage: '24h'
    }
  });
  return data;
}

export async function fetchMarketChart(coinId: string, days = 7, vsCurrency = 'usd') {
  if (useMock) {
    const mock = await import('../public/mock/market_chart.json');
    return mock.default;
  }
  const { data } = await axios.get(`${COINGECKO}/coins/${coinId}/market_chart`, {
    params: { vs_currency: vsCurrency, days }
  });
  return data;
}

export async function fetchCoinMeta(coinId: string) {
  if (useMock) {
    return {
      id: coinId, name: coinId, symbol: coinId.slice(0,3).toUpperCase(), hashing_algorithm: null,
      description: { en: 'Mock coin for demo.' },
      links: { homepage: ['https://example.com'] },
      image: { small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579' }
    };
  }
  const { data } = await axios.get(`${COINGECKO}/coins/${coinId}`);
  return data;
}
