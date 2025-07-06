import Layout from '../components/Layout';
import { useState, useEffect, useMemo } from 'react';
import NewRoadmapModal from './AddRoadMap';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { fetchUserRoadmapPlans } from '../services/FetchRoadmapUser';

export default function RecoveryPlanStatusPPK() {
  const [recoveryPlans, setRecoveryPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('fasilitas');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredPlans = useMemo(() => {
    return recoveryPlans.filter((item) => {
      const value = String(item[filterBy] || '').toLowerCase();
      return value.includes(searchQuery.toLowerCase());
    });
  }, [recoveryPlans, searchQuery, filterBy]);

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filteredPlans, currentPage, totalPages]);

  useEffect(() => {
    setLoading(true); 
    fetchUserRoadmapPlans()
      .then((data) => {
        const sortedData = [...data].sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });

        const formatted = sortedData.map((item) => ({
          staff: item.created_by.name,
          company: item.deal_ref,
          time: new Date(item.created_at).toLocaleDateString('id-ID'),
          amount: Number(item.jumlah_outstanding),
          status: item.status,
        }));
        setRecoveryPlans(formatted);
      })
      .catch((error) => {
        console.error("Error fetching roadmap plans:", error);
      })
      .finally(() => setLoading(false));
  }, []); 

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-400 text-white';
      case 'Pending':
        return 'bg-yellow-400 text-white';
      case 'Rejected':
        return 'bg-red-400 text-white';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <Layout title="Recovery Plan Status" breadcrumbs={[{ label: 'Recovery Plan Kredit', path: '/recovery/ppk' }]}>
      {/* Search Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          {/* <option value="staff">Nama Staff</option> */}
          <option value="company">Nama Fasilitas</option>
          <option value="status">Status</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${filterBy}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-1/3 text-sm"
        />
      </div>


      {/* Table Container */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto animate-pulse">
          <div className="px-6 py-4 text-lg font-semibold bg-gray-100 h-6 w-1/3 rounded mb-4"></div>
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                {["Nama Staff", "Fasilitas", "Tanggal Pengajuan", "Nominal Outstanding", "Status"].map((header, index) => (
                  <th key={index} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: itemsPerPage }).map((_, i) => (
                <tr key={i} className="border-b">
                  {Array.from({ length: 5 }).map((_, j) => (
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
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <div className="px-6 py-4 text-lg font-semibold">Recovery Plan Kredit</div>
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Nama Staff</th>
                <th className="px-6 py-3">Fasilitas</th>
                <th className="px-6 py-3">Tanggal Pengajuan</th>
                <th className="px-6 py-3">Nominal Outstanding</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-6 py-3">{item.staff}</td>
                    <td className="px-6 py-3">{item.company}</td>
                    <td className="px-6 py-3">{item.time}</td>
                    <td className="px-6 py-3">
                      {item.amount
                        ? Number(item.amount).toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        })
                        : '-'}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">Tidak ada data ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
          {filteredPlans.length > 0 && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded text-sm font-medium border text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 cursor-pointer disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center border transition cursor-pointer ${currentPage === i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded text-sm font-medium border text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 cursor-pointer disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add Roadmap Button */}
      <div className="mt-10 text-justify-left">
        <button
          onClick={() => setShowModal(true)}
          className="border px-6 py-3 text-lg font-semibold cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Add Roadmap +
        </button>
        {showModal && <NewRoadmapModal onClose={() => setShowModal(false)} />}
      </div>
    </Layout>
  );
}
