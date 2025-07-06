import Layout from '../components/Layout';
import { useEffect, useState, useMemo } from 'react';
import { fetchUserHistory } from '../services/FetchHistoryUser';

const TABLE_HEADERS = ["Nama Staff", "Fasilitas", "Update Terakhir", "Kegiatan", "Status", "Keterangan"];
const ITEMS_PER_PAGE = 15;

export default function DashboardPPK() {
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [filterBy, setFilterBy] = useState('deal_ref');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const parseDateForSorting = (dateString) => {
  if (dateString && dateString.includes('/') && dateString.split('/').length === 3) {
    const parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  return new Date(dateString);
};

  const filteredPlans = useMemo(() => {
    if (!searchQuery) return historyData;

    return historyData.filter((item) => {
      const field = item[filterBy];
      return field && String(field).toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [historyData, filterBy, searchQuery]);

useEffect(() => {
  setLoading(true);
  fetchUserHistory((data) => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = parseDateForSorting(a.tanggal); 
      const dateB = parseDateForSorting(b.tanggal);
      return dateB.getTime() - dateA.getTime(); 
    });
    setHistoryData(sortedData); 
    setLoading(false);
  });
}, []);

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
    <Layout title="Dashboard">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          className="border rounded px-3 py-2 text-sm"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="deal_ref">Deal Ref</option>
          <option value="status">Status</option>
          <option value="jenis_kegiatan">Kegiatan</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${filterBy === 'deal_ref' ? 'Deal Ref' :
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
              {displayedPlans.length > 0 ? (
                displayedPlans.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-6 py-3">{row.ao_input}</td>
                    <td className="px-6 py-3">{row.deal_ref}</td>
                    <td className="px-6 py-3">{parseDateForSorting(row.tanggal).toLocaleDateString('id-ID')}</td>
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
    </Layout>
  );
}