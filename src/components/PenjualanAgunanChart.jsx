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
import { useState, useEffect } from 'react';

export default function PenjualanAgunanChart() {
  const hardcodedData = {
    "Januari": [
      { tanggal: '01', nominal: 5 },
      { tanggal: '05', nominal: 7 },
      { tanggal: '10', nominal: 9 },
      { tanggal: '15', nominal: 12 },
      { tanggal: '20', nominal: 14 },
      { tanggal: '25', nominal: 16 },
      { tanggal: '30', nominal: 18 },
    ],
    "Februari": [
      { tanggal: '01', nominal: 6 },
      { tanggal: '05', nominal: 8 },
      { tanggal: '10', nominal: 10 },
      { tanggal: '15', nominal: 13 },
      { tanggal: '20', nominal: 15 },
      { tanggal: '25', nominal: 17 },
    ],
    "Maret": [
      { tanggal: '01', nominal: 7 },
      { tanggal: '05', nominal: 9 },
      { tanggal: '10', nominal: 11 },
      { tanggal: '15', nominal: 14 },
      { tanggal: '20', nominal: 16 },
      { tanggal: '25', nominal: 18 },
      { tanggal: '30', nominal: 20 },
    ],
    "April": [
        { tanggal: '01', nominal: 8 },
        { tanggal: '05', nominal: 10 },
        { tanggal: '10', nominal: 12 },
        { tanggal: '15', nominal: 15 },
        { tanggal: '20', nominal: 17 },
        { tanggal: '25', nominal: 19 },
        { tanggal: '30', nominal: 21 },
    ],
    "Mei": [
        { tanggal: '01', nominal: 9 },
        { tanggal: '05', nominal: 11 },
        { tanggal: '10', nominal: 13 },
        { tanggal: '15', nominal: 16 },
        { tanggal: '20', nominal: 18 },
        { tanggal: '25', nominal: 20 },
        { tanggal: '30', nominal: 22 },
    ],
    "Juni": [
        { tanggal: '01', nominal: 10 },
        { tanggal: '05', nominal: 12 },
        { tanggal: '10', nominal: 14 },
        { tanggal: '15', nominal: 17 },
        { tanggal: '20', nominal: 19 },
        { tanggal: '25', nominal: 21 },
        { tanggal: '30', nominal: 23 },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState("Januari"); 
  const [chartData, setChartData] = useState([]); 
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const dataForMonth = hardcodedData[selectedMonth] || [];

    setChartData(dataForMonth);

    const calculatedTotal = dataForMonth.reduce((sum, item) => sum + item.nominal, 0);
    setTotalSales(calculatedTotal);
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Penjualan Agunan</h2>
        <select
          className="border rounded px-3 py-1 text-sm"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Object.keys(hardcodedData).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <p className="text-2xl font-bold mb-4">Rp {totalSales.toLocaleString('id-ID')}.000.000</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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