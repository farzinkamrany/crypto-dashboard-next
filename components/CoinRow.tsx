import Link from 'next/link';
import { Coin } from '@/lib/api';

function formatCurrency(n: number) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export default function CoinRow({ coin, index }: { coin: Coin; index: number }) {
  const change = coin.price_change_percentage_24h ?? 0;
  const changeColor = change >= 0 ? 'text-emerald-600' : 'text-rose-600';
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition">
      <td className="py-3 px-2 text-xs opacity-70">{index + 1}</td>
      <td className="py-3 px-2">
        <Link href={`/coin/${coin.id}`} className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
          <span className="font-medium">{coin.name}</span>
          <span className="uppercase text-xs opacity-70">{coin.symbol}</span>
        </Link>
      </td>
      <td className="py-3 px-2">{formatCurrency(coin.current_price)}</td>
      <td className={`py-3 px-2 ${changeColor}`}>{change.toFixed(2)}%</td>
      <td className="py-3 px-2 hidden md:table-cell">{formatCurrency(coin.market_cap)}</td>
      <td className="py-3 px-2 hidden md:table-cell">{formatCurrency(coin.total_volume)}</td>
    </tr>
  );
}
