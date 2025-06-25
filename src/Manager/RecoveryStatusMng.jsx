import Layout from '../components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchRoadmapEventsById, updateRoadmapStatus } from '../services/Manager/RoadmapServices';

export default function RecoveryPlanDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState([]);
  const [planStatus, setPlanStatus] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchRoadmapEventsById(id).then(setEvents);
  }, [id]);

  const handleAccept = async () => {
    const result = await updateRoadmapStatus(id, 'Accepted');
    if (result.success) setPlanStatus('Accepted');
    navigate("/recovery")
  };

  const handleDeny = async () => {
    const result = await updateRoadmapStatus(id, 'Rejected');
    if (result.success) setPlanStatus('Rejected');
    navigate("/recovery");
  };

  return (
    <Layout title="Companies">
      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button onClick={handleAccept} className="bg-blue-800 text-white px-5 py-2 rounded font-semibold">
          Accept Plan
        </button>
        <button onClick={handleDeny} className="bg-red-600 text-white px-5 py-2 rounded font-semibold">
          Deny Plan
        </button>
      </div>

      {/* Roadmap Timeline */}
      <h2 className="text-xl font-bold mb-2">Status: {planStatus}</h2>
      <h3 className="text-lg font-semibold mb-6">Roadmap Recovery NPL</h3>

      <div className="space-y-10 relative ml-6 border-l-4 border-yellow-400">
        {events.map((item, index) => (
          <div key={index} className="pl-6 relative">
            <div className="absolute -left-[11px] top-0 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white" />
            <p className="text-lg font-bold text-gray-800 mb-1">{item.jenis_kegiatan}</p>
            <p className="text-sm text-gray-600">AO ID: {item.ao_input}</p>
            <p className="text-sm text-gray-500">{item.keterangan_kegiatan}</p>
            <p className="text-xs text-gray-400">{new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}