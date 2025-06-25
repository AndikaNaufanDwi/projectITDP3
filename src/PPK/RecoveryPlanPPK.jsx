import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import NewRoadmapModal from './AddRoadMap';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { fetchUserRoadmapPlans } from '../services/FetchRoadmapUser';

export default function RecoveryPlanStatusPPK() {
  const [recoveryPlans, setRecoveryPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('staff');

  useEffect(() => {
    fetchUserRoadmapPlans()
      .then((data) => {
        const formatted = data.map((item) => ({
          staff: item.created_by.name,
          company: item.deal_ref,
          time: new Date(item.created_at).toLocaleDateString('id-ID'),
          amount: Number(item.jumlah_outstanding),
          status: item.status,
        }));
        setRecoveryPlans(formatted);
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

  const filteredPlans = recoveryPlans.filter((item) => {
    const value = {
      staff: item.staff || '',
      company: item.company || '',
      status: item.status || '',
    }[filterBy];

    return value.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <Layout title="Recovery Plan Status">
      {/* Search Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="staff">Nama Staff</option>
          <option value="company">Nama Perusahaan</option>
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
                {["Nama Staff", "Perusahaan", "Jam Pengajuan", "Nominal Outstanding", "Status"].map((header, index) => (
                  <th key={index} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
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
                <th className="px-6 py-3">Perusahaan</th>
                <th className="px-6 py-3">Jam Pengajuan</th>
                <th className="px-6 py-3">Nominal Outstanding</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length > 0 ? (
                filteredPlans.map((item, i) => (
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
        </div>
      )}

      {/* Add Roadmap Button */}
      <div className="mt-10 text-justify-left">
        <button
          onClick={() => setShowModal(true)}
          className="border px-6 py-3 text-lg font-semibold"
        >
          Add Roadmap +
        </button>
        {showModal && <NewRoadmapModal onClose={() => setShowModal(false)} />}
      </div>
    </Layout>
  );
}
