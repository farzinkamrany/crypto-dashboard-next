import { Coin } from '@/lib/api';
import CoinRow from './CoinRow';

type Props = {
  coins: Coin[];
};

export default function CoinTable({ coins }: Props) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-left text-xs uppercase opacity-70">
          <tr>
            <th className="py-2 px-2">#</th>
            <th className="py-2 px-2">Coin</th>
            <th className="py-2 px-2">Price</th>
            <th className="py-2 px-2">24h</th>
            <th className="py-2 px-2 hidden md:table-cell">Market Cap</th>
            <th className="py-2 px-2 hidden md:table-cell">Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((c, i) => <CoinRow key={c.id} coin={c} index={i} />)}
        </tbody>
      </table>
    </div>
  );
}
