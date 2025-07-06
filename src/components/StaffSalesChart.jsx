import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StaffSalesChart({ name = 'Staff Name', sold = 0, notSold = 0, totalValue = 0 }) {
  const data = {
    labels: ['Sold', 'Not Sold'],
    datasets: [
      {
        label: 'Agunan Status',
        data: [sold, notSold],
        backgroundColor: ['#10B981', '#EF4444'], 
        borderColor: ['#047857', '#B91C1C'], 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12, 
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
    cutout: '60%', 
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow relative">
      {/* Top-left Username */}
      <h3 className="text-lg font-bold text-gray-700 absolute top-2 left-4 z-10">{name}</h3> 

      {/* Doughnut Chart Container */}
      <div className="flex justify-center items-center h-48 sm:h-56 md:h-64 mb-4 py-4"> 
        <Doughnut data={data} options={options} />
      </div>

      {/* Agunan Count */}
      <p className="mt-4 text-sm text-center text-gray-500">
        {sold + notSold} total agunan
      </p>

      {/* Total Rupiah Value */}
      <p className="mt-1 text-base text-center text-gray-600"> 
        Total Terjual: <span className="font-bold text-green-600"> 
          Rp {Number(totalValue).toLocaleString('id-ID', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
        </span>
      </p>
    </div>
  );
}