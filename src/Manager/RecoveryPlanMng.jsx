import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FaEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { fetchDraftPlans } from '../services/Manager/GetDraftPlans';
import SkeletonLoader from '../components/SkeletonLoader'; 

const TABLE_HEADERS = ["Nama Staff", "Perusahaan", "Jam Pengajuan", "Nominal Outstanding", "Status", "Aksi"]; 

export default function RecoveryPlanStatusPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [draftPlans, setDraftPlans] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-500 text-white'; 
      case 'Pending':
        return 'bg-yellow-400 text-white';
      case 'Rejected':
        return 'bg-red-500 text-white'; 
      default:
        return 'bg-gray-400 text-white'; 
    }
  };

  const formatToWIBDate = (utcString) => {
    if (!utcString) return '-'; 
    const utcDate = new Date(utcString);

    const wibOffset = 7 * 60 * 60 * 1000; 
    const wibDate = new Date(utcDate.getTime() + wibOffset);

    const day = String(wibDate.getDate()).padStart(2, '0');
    const month = String(wibDate.getMonth() + 1).padStart(2, '0'); 
    const year = wibDate.getFullYear();
    const hours = String(wibDate.getHours()).padStart(2, '0');
    const minutes = String(wibDate.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes} WIB`;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetchDraftPlans(token)
      .then((res) => {
        setDraftPlans(Array.isArray(res) ? res : []);
      })
      .catch((err) => {
        console.error('Failed to fetch draft plans:', err);
        setDraftPlans([]); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="Recovery Plan Status">
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto mb-6">
            <SkeletonLoader type="title" width="1/3" className="px-6 py-4" /> 
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
                        <SkeletonLoader type="text" width="3/4" height="4" className="mb-0" />
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
                {TABLE_HEADERS.map((header, index) => (
                  <th key={index} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {draftPlans.length > 0 ? (
                draftPlans.map((plan, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-3">{plan.created_by?.name || '-'}</td> 
                    <td className="px-6 py-3">{plan.deal_ref || '-'}</td>
                    <td className="px-6 py-3">{formatToWIBDate(plan.created_at)}</td>
                    <td className="px-6 py-3">
                      {plan.jumlah_outstanding
                        ? Number(plan.jumlah_outstanding).toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        })
                        : 'Rp0'}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)} mr-2`}>
                        {plan.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                       <button
                        onClick={() => navigate(`/recovery/${plan.plan_id}`)}
                        className="text-blue-600 hover:text-blue-800 text-lg" 
                        title="Edit Recovery Plan"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEADERS.length} className="px-6 py-4 text-center text-gray-500">
                    No recovery plans available.
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