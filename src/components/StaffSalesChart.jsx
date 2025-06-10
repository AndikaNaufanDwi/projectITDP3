import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StaffSalesChart({ name = 'Staff Name', sold = 0, notSold = 0 }) {
  const data = {
    labels: ['Sold', 'Not Sold'],
    datasets: [
      {
        label: 'Agunan Status',
        data: [sold, notSold],
        backgroundColor: ['#10B981', '#EF4444'], // green, red
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-white p-6 rounded-lg shadow">
      <h3 className="text-md font-bold text-center mb-2 text-gray-700">{name}</h3>
      <Doughnut data={data} />
      <p className="mt-4 text-sm text-center text-gray-500">
        {sold + notSold} total agunan
      </p>
    </div>
  );
}
