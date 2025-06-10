import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FaEdit } from 'react-icons/fa';

export default function RecoveryPlanStatusPage() {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      staff: 'Dannya',
      company: 'PT Anadakan Nanda',
      time: '21/12/2025 - 01.30 PM',
      amount: 'Rp 120.000.000',
    },
    {
      id: 2,
      staff: 'Satria',
      company: 'PT Sukses Eskimo',
      time: '19/12/2025 - 11.00 AM',
      amount: 'Rp 120.000.000',
    },
    {
      id: 3,
      staff: 'William',
      company: 'Jaya Selamanya',
      time: '19/12/2025 - 10.00 AM',
      amount: 'Rp 200.000.000',
    },
  ];

  return (
    <Layout title="Recovery Plan Status">
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
            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-6 py-3">{row.staff}</td>
                <td className="px-6 py-3">{row.company}</td>
                <td className="px-6 py-3">{row.time}</td>
                <td className="px-6 py-3">{row.amount}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => navigate(`/recovery/${row.id}`)}
                    className="text-yellow-500 hover:text-yellow-600 text-lg"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
