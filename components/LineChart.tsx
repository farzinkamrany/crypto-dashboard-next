import {
  LineChart as RCLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

type Point = [number, number]; // [timestamp, price]
export default function LineChart({ data }: { data: Point[] }) {
  const formatted = data.map(([t, p]) => ({ t, p }));
  return (
    <div className="card">
      <div className="font-semibold mb-2">7-day Price</div>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RCLineChart data={formatted} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="t" tickFormatter={(v) => new Date(v).toLocaleDateString()} minTickGap={40} />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip formatter={(v: any) => [`$${Number(v).toFixed(2)}`, 'Price']} labelFormatter={(l) => new Date(l).toLocaleString()} />
            <Line type="monotone" dataKey="p" dot={false} strokeWidth={2} />
          </RCLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
