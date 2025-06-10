import Layout from '../components/Layout';

export default function RecoveryPlanDetailPage() {
  const roadmap = [
    {
      title: 'Kunjungan Lapangan',
      author: 'PPK - Pandi Ratama',
      detail: 'Verifikasi kondisi usaha/asset debitur di lokasi.',
      date: '29 Juli 2025',
    },
    {
      title: 'Peringatan Kedua (Jika Gagal Bayar Ulang)',
      author: 'PPK - Pandi Ratama',
      detail: 'Dikirimkan jika pembayaran kembali mengalami tunggakan.',
      date: '15 Agustus 2025',
    },
    {
      title: 'Pelibatan Tim Legal',
      author: 'PPK - Miti Sarlina',
      detail: 'Melibatkan bagian hukum untuk opsi litigasi jika tidak ada progres.',
      date: '25 Agustus 2025',
    },
    {
      title: 'Proses Eksekusi Agunan',
      author: 'PPK - Miti Sarlina',
      detail: 'Mulai proses hukum untuk eksekusi jaminan debitur.',
      date: '10 September 2025',
    },
    {
      title: 'Penyelesaian Akhir',
      author: '',
      detail: '',
      date: '',
    },
  ];

  const handleAccept = () => {
    console.log('Accept clicked');
  };

  const handleDeny = () => {
    console.log('Deny clicked');
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
      <h2 className="text-xl font-bold mb-6">Roadmap Recovery NPL</h2>
      <div className="space-y-10 relative ml-6 border-l-4 border-yellow-400">
        {roadmap.map((item, index) => (
          <div key={index} className="pl-6 relative">
            <div className="absolute -left-[11px] top-0 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white" />
            <p className="text-lg font-bold text-gray-800 mb-1">{item.title}</p>
            <p className="text-sm text-gray-600">{item.author}</p>
            <p className="text-sm text-gray-500">{item.detail}</p>
            <p className="text-xs text-gray-400">{item.date}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
