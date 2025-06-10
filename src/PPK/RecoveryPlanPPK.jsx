import Layout from '../components/Layout';
import { useState } from 'react';
import NewRoadmapModal from './AddRoadMap';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function RecoveryPlanStatusPPK() {
  const [showModal, setShowModal] = useState(false);
  const recoveryPlans = [
    {
      staff: 'User1',
      company: 'PT Anadakan Nanda',
      time: '21/12/2025 - 01.30 PM',
      amount: 'Rp 120.000.000',
      status: 'Pending',
    },
    {
      staff: 'User1',
      company: 'PT Sukses Eskimo',
      time: '19/12/2025 - 11.00 AM',
      amount: 'Rp 120.000.000',
      status: 'Pending',
    },
    {
      staff: 'User1',
      company: 'Jaya Selamanya',
      time: '19/12/2025 - 10.00 AM',
      amount: 'Rp 200.000.000',
      status: 'Accepted',
    },
    {
      staff: 'User1',
      company: 'PT Anadakan Nanda',
      time: '21/12/2025 - 01.30 PM',
      amount: 'Rp 125.000.000',
      status: 'Accepted',
    },
  ];

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
    <Layout title="Companies">
      {/* Search Bar */}
      <div className="mb-4 relative w-full sm:w-1/3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search Name"
          className="border rounded pl-10 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <div className="px-6 py-4 text-lg font-semibold">Recovery Plan Kredit</div>
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-3">Nama Staff</th>
              <th className="px-6 py-3">Perusahaan</th>
              <th className="px-6 py-3">Jam Pengajuan</th>
              <th className="px-6 py-3">Nominal Kredit Macet</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recoveryPlans.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="px-6 py-3">{item.staff}</td>
                <td className="px-6 py-3">{item.company}</td>
                <td className="px-6 py-3">{item.time}</td>
                <td className="px-6 py-3">{item.amount}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
