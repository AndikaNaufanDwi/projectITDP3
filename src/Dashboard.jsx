import Layout from './components/Layout';
import StaffSalesChart from './components/StaffSalesChart';
import PenjualanAgunanChart from './components/PenjualanAgunanChart';
import { useState, useEffect } from "react";
import { fetchHistoryTable } from './services/Manager/HistoryTable';
import { fetchAgunanSummaryPerAO } from './services/PenjualanAgunan';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';

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

const TABLE_HEADERS = ["Nama Staff", "Deal Ref", "Tanggal", "Status", "Keterangan"];

const ITEMS_PER_PAGE = 5;

export default function DashboardPage() {
  const [historyTableList, setHistoryTableList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingHistoryTable, setIsLoadingHistoryTable] = useState(true);

  const [staffSalesData, setStaffSalesData] = useState([]);
  const [isLoadingStaffSales, setIsLoadingStaffSales] = useState(true);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedData = historyTableList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setIsLoadingHistoryTable(true);
    fetchHistoryTable((data) => {
      setHistoryTableList(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
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

    return pageNumbers.map((page, index) => (
      page === '...' ? (
        <IconButton key={`ellipsis-${index}`} variant="text" size="sm" disabled>
          ...
        </IconButton>
      ) : (
        <IconButton
          key={page}
          variant={page === currentPage ? "filled" : "text"} 
          size="sm"
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "bg-blue-600 text-white" : ""} 
        >
          {page}
        </IconButton>
      )
    ));
  };


  return (
    <Layout title="Dashboard">
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
        {displayedData.length > 0 ? (
          displayedData.map((row, i) => (
            <tr key={i} className="border-b">
              <td className="px-6 py-3">{row.ao_input}</td>
              <td className="px-6 py-3">{row.deal_ref}</td>
              <td className="px-6 py-3">{new Date(row.tanggal).toLocaleDateString('id-ID')}</td>
              <td className="px-6 py-3">
                <span className={`text-white text-xs px-3 py-1 rounded-full inline-block ${
                  row.status === "Berhasil" ? "bg-emerald-500"
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

    {historyTableList.length > 0 && (
      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200"> {/* Added border-gray-200 for clarity */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded text-sm font-medium border text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center border transition ${
                currentPage === i + 1
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
          className="px-4 py-2 rounded text-sm font-medium border text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    )}
  </div>
)}

{!isLoadingHistoryTable && historyTableList.length === 0 && (
  <div className="text-center py-4 text-gray-500">
    No history data found.
  </div>
)}

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