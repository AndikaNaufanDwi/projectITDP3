import Layout from '../components/Layout';

export default function DashboardPPK() {
  const progressData = [
    {
      staff: 'User1',
      company: 'PT Anadakan Nanda',
      time: '21/12/2025 - 01.30 PM',
      activity: 'Lelang',
      status: 'Berhasil',
      statusColor: 'bg-emerald-500',
      note: 'Nominal',
    },
    {
      staff: 'User1',
      company: 'PT Sukses Eskimo',
      time: '19/12/2025 - 11.00 AM',
      activity: 'Lelang',
      status: 'Pending',
      statusColor: 'bg-yellow-400',
      note: 'Masalah dengan pembayaran',
    },
    {
      staff: 'User1',
      company: 'Jaya Selamanya',
      time: '19/12/2025 - 10.00 AM',
      activity: 'Lelang',
      status: 'Gagal',
      statusColor: 'bg-red-500',
      note: 'Dihentikan ormas',
    },
    {
      staff: 'User1',
      company: 'PT Anadakan Nanda',
      time: '21/12/2025 - 01.30 PM',
      activity: 'Lelang',
      status: 'Berhasil',
      statusColor: 'bg-emerald-500',
      note: 'Nominal',
    },
  ];

  return (
    <Layout title="Companies">
      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select className="border rounded px-3 py-2 text-sm">
          <option>Filter By</option>
        </select>
        <input
          type="text"
          placeholder="Search by Filter"
          className="border rounded px-4 py-2 w-full sm:w-1/3 text-sm"
        />
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">Nama Staff</button>
        <button className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">Perusahaan</button>
        <button className="px-4 py-1 rounded-full bg-pink-100 text-pink-800 text-sm font-medium">Update Terakhir</button>
        <button className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">Kegiatan</button>
        <button className="px-4 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium">Status</button>
      </div>

      {/* Progress Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <div className="px-6 py-4 text-lg font-semibold">Progres Recovery Kredit</div>
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-3">Nama Staff</th>
              <th className="px-6 py-3">Perusahaan</th>
              <th className="px-6 py-3">Update Terakhir</th>
              <th className="px-6 py-3">Kegiatan</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((row, i) => (
              <tr key={i} className="border-b">
                <td className="px-6 py-3">{row.staff}</td>
                <td className="px-6 py-3">{row.company}</td>
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
    </Layout>
  );
}
