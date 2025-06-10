import Layout from './components/Layout';
import StaffSalesChart from './components/StaffSalesChart';

const staffData = [
  { name: 'Dannya', sold: 4, notSold: 1 },
  { name: 'Satria', sold: 2, notSold: 3 },
  { name: 'William', sold: 5, notSold: 0 },
];

export default function DashboardPage() {
  return (
    <Layout title="Companies">
      {/* Filter/Search Row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative inline-block">
          <select className="appearance-none border pl-3 pr-8 py-2 rounded text-sm text-left w-full">
            <option>Filter By</option>
            <option>Ceki Ceki</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600">
            ▼
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by Filter"
          className="border rounded px-3 py-2 text-sm w-full sm:w-auto flex-1"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">Nama Staff</button>
        <button className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">Perusahaan</button>
        <button className="px-4 py-1 rounded-full bg-pink-100 text-pink-800 text-sm font-medium">Update Terakhir</button>
        <button className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">Kegiatan</button>
        <button className="px-4 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium">Status</button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto mb-6">
        <div className="px-6 py-4 text-lg font-semibold">Status Recovery Kredit</div>
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-3">Nama Staff</th>
              <th className="px-6 py-3">Perusahaan</th>
              <th className="px-6 py-3">Fasilitas Kredit</th>
              <th className="px-6 py-3">Update Terakhir</th>
              <th className="px-6 py-3">Kegiatan</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Dannya', company: 'PT Anadakan Nanda', facility: 'KMKK', time: '21/12/2025 - 01.30 PM', activity: 'Lelang', status: 'Berhasil', statusColor: 'bg-emerald-500', note: 'Nominal' },
              { name: 'Satria', company: 'PT Sukses Eskimo', facility: 'KMKK', time: '19/12/2025 - 11.00 AM', activity: 'Lelang', status: 'Pending', statusColor: 'bg-yellow-400', note: 'Masalah dengan pembayaran' },
              { name: 'William', company: 'Jaya Selamanya', facility: 'KMKK', time: '19/12/2025 - 10.00 AM', activity: 'Lelang', status: 'Gagal', statusColor: 'bg-red-500', note: 'Dihentikan ormas' },
              { name: 'Dannya', company: 'PT Anadakan Nanda', facility: 'KMKK', time: '21/12/2025 - 01.30 PM', activity: 'Lelang', status: 'Berhasil', statusColor: 'bg-emerald-500', note: 'Nominal' },
            ].map((row, i) => (
              <tr key={i} className="border-b">
                <td className="px-6 py-3">{row.name}</td>
                <td className="px-6 py-3">{row.company}</td>
                <td className="px-6 py-3">{row.facility}</td>
                <td className="px-6 py-3">{row.time}</td>
                <td className="px-6 py-3">{row.activity}</td>
                <td className="px-6 py-3">
                  <span className={`text-white text-xs px-3 py-1 rounded-full inline-block ${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-3">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Section: Penjualan Agunan */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Penjualan Agunan</h2>
          <select className="border rounded px-3 py-1 text-sm">
            <option>Desember</option>
            {/* Add more months if needed */}
          </select>
        </div>
        <p className="text-xl font-bold">Rp 1.000.000.000</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {staffData.map((staff, index) => (
          <StaffSalesChart
            key={index}
            name={staff.name}
            sold={staff.sold}
            notSold={staff.notSold}
          />
        ))}
      </div>

    </Layout>
  );
}
