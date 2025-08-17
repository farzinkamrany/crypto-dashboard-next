import { useEffect, useMemo, useState } from 'react';
import { fetchCoins, Coin } from '@/lib/api';
import { useUIStore } from '@/lib/store';
import CoinTable from '@/components/CoinTable';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const { vsCurrency, search, setVsCurrency, setSearch } = useUIStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchCoins(vsCurrency);
        if (mounted) setCoins(data);
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [vsCurrency]);

  const filtered = useMemo(() => {
    if (!search) return coins;
    const s = search.toLowerCase();
    return coins.filter(c => c.name.toLowerCase().includes(s) || c.symbol.toLowerCase().includes(s));
  }, [coins, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold">Market Overview</h1>
        <div className="flex items-center gap-2">
          <select
            value={vsCurrency}
            onChange={(e) => setVsCurrency(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-sm"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="irr">IRR</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <a
          href="https://vercel.com/new"
          target="_blank"
          rel="noreferrer"
          className="text-sm underline"
        >
          Deploy
        </a>
      </div>

      {loading ? (
        <div className="card animate-pulse h-40" />
      ) : (
        <CoinTable coins={filtered} />
      )}
    </div>
  );
}
