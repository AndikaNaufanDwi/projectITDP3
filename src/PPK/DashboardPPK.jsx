import Layout from '../components/Layout';
import { useEffect, useState, useMemo } from 'react';
import { fetchUserHistory } from '../services/FetchHistoryUser';

const TABLE_HEADERS = ["Nama Staff", "Perusahaan", "Update Terakhir", "Kegiatan", "Status", "Keterangan"];

export default function DashboardPPK() {
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [filterBy, setFilterBy] = useState('deal_ref');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return historyData;

    return historyData.filter((item) => {
      const field = item[filterBy];
      return field && String(field).toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [historyData, filterBy, searchQuery]);


  useEffect(() => {
    setLoading(true); 
    fetchUserHistory((data) => {
      setHistoryData(data);
      setLoading(false); 
    });
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          className="border rounded px-3 py-2 text-sm"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="deal_ref">Deal Ref (Perusahaan)</option> 
          <option value="status">Status</option>
          <option value="ao_input">Nama Staff</option> 
          <option value="jenis_kegiatan">Kegiatan</option> 
        </select>
        <input
          type="text"
          placeholder={`Search by ${
            filterBy === 'deal_ref' ? 'Perusahaan' :
            filterBy === 'status' ? 'Status' :
            filterBy === 'ao_input' ? 'Nama Staff' :
            filterBy === 'jenis_kegiatan' ? 'Kegiatan' : filterBy
          }`} 
          className="border rounded px-4 py-2 w-full sm:w-1/3 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Progress Table */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto mb-6 animate-pulse">
            <div className="px-6 py-4 text-lg font-semibold bg-gray-100 h-6 w-1/3 rounded mb-4"></div> 
            <table className="w-full text-sm text-left table-auto">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  {TABLE_HEADERS.map((header, index) => (
                    <th key={index} className="px-6 py-3">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    {Array.from({ length: TABLE_HEADERS.length }).map((_, j) => (
                      <td key={j} className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto mb-3"> 
          <div className="px-6 py-4 text-lg font-semibold">Progres Recovery Kredit</div>
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                {TABLE_HEADERS.map((header, index) => (
                  <th key={index} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-6 py-3">{row.ao_input}</td>
                    <td className="px-6 py-3">{row.deal_ref}</td> 
                    <td className="px-6 py-3">{new Date(row.tanggal).toLocaleDateString('id-ID')}</td>
                    <td className="px-6 py-3">{row.jenis_kegiatan}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-white text-xs px-3 py-1 rounded-full inline-block ${row.status === "Berhasil"
                          ? "bg-emerald-500"
                          : row.status === "Pending"
                            ? "bg-yellow-400"
                            : "bg-red-500" 
                          }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">{row.keterangan_kegiatan}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEADERS.length} className="px-6 py-4 text-center text-gray-500">
                    {searchQuery ? "No results found for your search." : "No history data available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}