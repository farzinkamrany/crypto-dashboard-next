import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchMarketChart, fetchCoinMeta } from '@/lib/api';
import LineChart from '@/components/LineChart';

export default function CoinDetail() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [chart, setChart] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [chartData, metaData] = await Promise.all([
          fetchMarketChart(id, 7, 'usd'),
          fetchCoinMeta(id)
        ]);
        if (mounted) {
          setChart(chartData);
          setMeta(metaData);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (!id) return null;

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="card animate-pulse h-64" />
      ) : (
        <>
          <div className="card flex items-center gap-3">
            {meta?.image?.small && <img src={meta.image.small} alt={meta.name} className="w-8 h-8 rounded-full" />}
            <h1 className="text-xl font-bold">{meta?.name} <span className="uppercase text-sm opacity-70">({meta?.symbol})</span></h1>
          </div>
          <LineChart data={chart?.prices || []} />
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card">
              <div className="font-semibold mb-1">Homepage</div>
              <a className="underline text-sm break-all" href={meta?.links?.homepage?.[0]} target="_blank" rel="noreferrer">
                {meta?.links?.homepage?.[0]}
              </a>
            </div>
            <div className="card">
              <div className="font-semibold mb-1">Hashing Algorithm</div>
              <div className="text-sm">{meta?.hashing_algorithm ?? '—'}</div>
            </div>
            <div className="card">
              <div className="font-semibold mb-1">About</div>
              <div className="text-sm line-clamp-5" dangerouslySetInnerHTML={{ __html: meta?.description?.en || '' }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
