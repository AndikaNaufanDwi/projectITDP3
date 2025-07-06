import Layout from './components/Layout';
import StaffSalesChart from './components/StaffSalesChart';
import PenjualanAgunanChart from './components/PenjualanAgunanChart';
import { useState, useEffect, useMemo } from "react";
import { fetchHistoryTable } from './services/Manager/HistoryTable';
import { fetchAgunanSummaryPerAO } from './services/PenjualanAgunan';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';

const TABLE_HEADERS = ["Nama Staff", "Deal Ref", "Tanggal", "Status", "Keterangan"];
const ITEMS_PER_PAGE = 5;

const initialStaffData = [
  { name: 'Dannya', sold: 4, notSold: 1, totalValue: 50000000 },
  { name: 'Satria', sold: 2, notSold: 3, totalValue: 20000000 },
  { name: 'William', sold: 5, notSold: 0, totalValue: 75000000 },
];

const chartData = [
  { tanggal: '20', nominal: 100 },
  { tanggal: '21', nominal: 170 },
  { tanggal: '22', nominal: 230 },
  { tanggal: '23', nominal: 270 },
  { tanggal: '24', nominal: 290 },
  { tanggal: '25', nominal: 310 },
  { tanggal: '26', nominal: 350 },
  { tanggal: '27', nominal: 380 },
  { tanggal: '28', nominal: 420 },
  { tanggal: '29', nominal: 480 },
  { tanggal: '30', nominal: 510 },
];

const totalPenjualan = 1000000000;

export default function DashboardPage() {
  const [historyTableList, setHistoryTableList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingHistoryTable, setIsLoadingHistoryTable] = useState(true);

  const [staffSalesData, setStaffSalesData] = useState([]);
  const [isLoadingStaffSales, setIsLoadingStaffSales] = useState(true);

  const [filterType, setFilterType] = useState('Filter By');
  const [searchText, setSearchText] = useState('');

    const parseDateForSorting = (dateString) => {
  if (dateString && dateString.includes('/') && dateString.split('/').length === 3) {
    const parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  return new Date(dateString);
};

  const filteredData = useMemo(() => {
    if (!searchText.trim() || filterType === 'Filter By') {
      return historyTableList;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    return historyTableList.filter(item => {
      let valueToSearch = '';
      if (filterType === 'Nama Staff') {
        valueToSearch = item.ao_input;
      } else if (filterType === 'Deal Ref') {
        valueToSearch = item.deal_ref;
      } else if (filterType === 'Status') {
        valueToSearch = item.status;
      }
      return String(valueToSearch).toLowerCase().includes(lowerCaseSearchText);
    });
  }, [historyTableList, filterType, searchText]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1); 
    }
  }, [filteredData, totalPages, currentPage]);

  const displayedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, ITEMS_PER_PAGE]);

  useEffect(() => {
    setIsLoadingHistoryTable(true);
    fetchHistoryTable((data) => {
          const sortedData = [...data].sort((a, b) => {
      const dateA = parseDateForSorting(a.tanggal); 
      const dateB = parseDateForSorting(b.tanggal);
      return dateB.getTime() - dateA.getTime(); 
    });
      setHistoryTableList(sortedData);
      setIsLoadingHistoryTable(false);
    });
  }, []); 

  useEffect(() => {
    setIsLoadingStaffSales(true);
    const token = localStorage.getItem('token');
    fetchAgunanSummaryPerAO(token)
      .then(data => {
        setStaffSalesData(data);
        setIsLoadingStaffSales(false);
      })
      .catch(error => {
        console.error("Failed to fetch agunan summary per AO:", error);
        setStaffSalesData(initialStaffData); 
        setIsLoadingStaffSales(false);
      });
  }, []);

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
            className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center border transition cursor-pointer
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
      {/* Filter/Search Row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative inline-block">
          <select
            className="appearance-none border pl-3 pr-8 py-2 rounded text-sm text-left w-full"
            value={filterType} 
            onChange={(e) => {
              setFilterType(e.target.value); 
              setSearchText(''); 
              setCurrentPage(1); 
            }}
          >
            <option value="Filter By">Filter By</option>
            <option value="Nama Staff">Nama Staff</option>
            <option value="Deal Ref">Deal Ref</option>
            <option value="Status">Status</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600">
            ▼
          </div>
        </div>
        <input
          type="text"
          placeholder={`Search by ${filterType === 'Filter By' ? 'Filter' : filterType}`}
          className="border rounded px-3 py-2 text-sm w-full sm:w-auto flex-1"
          value={searchText} 
          onChange={(e) => {
            setSearchText(e.target.value); 
            setCurrentPage(1); 
          }}
          disabled={filterType === 'Filter By'} 
        />
      </div>

      {/* Data Table */}
      {isLoadingHistoryTable ? (
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
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
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
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto mb-6">
          <div className="px-6 py-4 text-lg font-semibold">Status Recovery Kredit</div>

          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                {TABLE_HEADERS.map((header, index) => (
                  <th key={index} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Display filtered and paginated data */}
              {displayedData.length > 0 ? (
                displayedData.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-6 py-3">{row.ao_input}</td>
                    <td className="px-6 py-3">{row.deal_ref}</td>
                    <td className="px-6 py-3">{parseDateForSorting(row.tanggal).toLocaleDateString('id-ID')}</td>
                    <td className="px-6 py-3">
                      <span className={`text-white text-xs px-3 py-1 rounded-full inline-block ${row.status === "Berhasil" ? "bg-emerald-500"
                          : row.status === "Pending" ? "bg-yellow-400"
                            : "bg-red-500"
                        }`}>
                        {row.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-3">{row.keterangan_kegiatan}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEADERS.length} className="px-6 py-4 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {filteredData.length > 0 && ( 
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded text-sm font-medium border text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {renderPageNumbers()}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded text-sm font-medium border text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Conditional messages for no data */}
      {!isLoadingHistoryTable && filteredData.length === 0 && searchText.trim() !== '' && (
        <div className="text-center py-4 text-gray-500">
          No results found for "{searchText}" under "{filterType}".
        </div>
      )}
      {!isLoadingHistoryTable && historyTableList.length === 0 && searchText.trim() === '' && (
        <div className="text-center py-4 text-gray-500">
          No history data available.
        </div>
      )}

      {/* Charts */}
      <div className="p-0 mt-6">
        <PenjualanAgunanChart
          data={chartData}
          total={totalPenjualan}
          month="Desember"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {isLoadingStaffSales ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-60">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
            </div>
          ))
        ) : staffSalesData.length > 0 ? (
          staffSalesData.map((staff, index) => (
            <StaffSalesChart
              key={index}
              name={staff.name}
              sold={staff.sold}
              notSold={staff.notSold}
              totalValue={staff.totalValue}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No staff sales data available.</div>
        )}
      </div>
    </Layout>
  );
}