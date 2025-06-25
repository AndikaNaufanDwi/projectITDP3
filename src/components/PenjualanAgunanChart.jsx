import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from 'recharts';

export default function PenjualanAgunanChart({ data, total, month = "Desember" }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Penjualan Agunan</h2>
        <select className="border rounded px-3 py-1 text-sm" value={month} disabled>
          <option>{month}</option>
        </select>
      </div>

      <p className="text-2xl font-bold mb-4">Rp {total.toLocaleString('id-ID')}</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="tanggal" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }}>
            <Label
              value="Tanggal"
              offset={0}
              position="insideBottom"
              style={{ textAnchor: "middle", fill: "#4b5563", fontSize: 12 }}
            />
          </XAxis>

          <YAxis
            tick={{ fontSize: 12 }}
            domain={[0, 'auto']}
            tickFormatter={(v) => `${v}`}
          >
            <Label
              value="Nominal (Juta)"
              angle={-90}
              position="insideLeft"
              style={{
                textAnchor: "middle",
                fill: "#4b5563",
                fontSize: 12,
              }}
              dx={5}
            />
          </YAxis>

          <Tooltip
            formatter={(value) => `Rp ${value.toLocaleString('id-ID')}.000.000`}
          />

          <Line
            type="monotone"
            dataKey="nominal"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
