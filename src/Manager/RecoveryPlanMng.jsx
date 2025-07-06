import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FaEdit } from 'react-icons/fa';
import { useState, useEffect, useMemo } from 'react';
import { fetchDraftPlans } from '../services/Manager/GetDraftPlans';
import SkeletonLoader from '../components/SkeletonLoader';

const TABLE_HEADERS = ["Nama Staff", "Perusahaan", "Jam Pengajuan", "Nominal Outstanding", "Status", "Aksi"];
const ITEMS_PER_PAGE = 15;

export default function RecoveryPlanStatusPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [draftPlans, setDraftPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
        const rawData = Array.isArray(res) ? res : [];

        const sortedData = [...rawData].sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });

        setDraftPlans(sortedData);
      })
      .catch((err) => {
        console.error('Failed to fetch draft plans:', err);
        setDraftPlans([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  const filteredPlans = draftPlans; 

  const totalPages = Math.ceil(filteredPlans.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filteredPlans, totalPages, currentPage]);

  const displayedPlans = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredPlans.slice(startIndex, endIndex);
  }, [filteredPlans, currentPage, ITEMS_PER_PAGE]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfMaxButtons + 1) {
        for (let i = 1; i <= maxPageButtons - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - halfMaxButtons) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - (maxPageButtons - 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - halfMaxButtons + 1; i <= currentPage + halfMaxButtons - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((page, index) => {
      if (page === '...') {
        return (
          <div key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-500">
            ...
          </div>
        );
      } else {
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center border transition
                ${currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        );
      }
    });
  };

  return (
    <Layout title="Recovery Plan Status" breadcrumbs={[{ label: 'Recovery Plan Kredit', path: '/recovery' }]}>
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto mb-6">
          {/* Skeleton Loader for table title */}
          <div className="px-6 py-4">
            <SkeletonLoader type="title" width="1/3" className="h-6 w-1/3 rounded" />
          </div>
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                {TABLE_HEADERS.map((header, index) => (
                  <th key={index} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
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
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto mb-6">
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
              {displayedPlans.length > 0 ? (
                displayedPlans.map((plan, index) => (
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

          {/* Pagination Controls */}
          {filteredPlans.length > 0 && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded text-sm font-medium border text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {renderPageNumbers()}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded text-sm font-medium border text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      {!loading && filteredPlans.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No recovery plans available.
        </div>
      )}
    </Layout>
  );
}