import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchFasilitasDetail } from './services/DetailFasilitas';
import { updateAgunan } from "./services/UpdateAgunan";
import EditAgunanModal from "./components/EditAgunanModal";
import { fetchHistory } from "./services/GetHistory";
import { tambahHistory } from "./services/TambahHistory";
import { deleteHistory } from './services/HapusHistory';
import { toast, Bounce } from "react-toastify";

export default function DetailFasilitas() {
    const [activeTab, setActiveTab] = useState('history');
    const [showModal, setShowModal] = useState(false);
    const { dealRef } = useParams();
    const [fasilitas, setFasilitas] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedAgunan, setEditedAgunan] = useState([]);
    const [historyList, setHistoryList] = useState([]);
    const [roadmapList, setRoadmapList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventDate, setEventDate] = useState("");

    const closeModal = () => {
        setShowModal(false);
        setEventName("");
        setEventDesc("");
        setEventDate("");
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        const token = localStorage.getItem('token');

        try {
            await tambahHistory({
                token,
                data: {
                    deal_ref: fasilitas.deal_ref,
                    jenis_kegiatan: eventName,
                    keterangan_kegiatan: eventDesc,
                    tanggal: eventDate,
                    ao_input: 1,
                },
            });

            toast.success('Event berhasil ditambahkan!');
            setShowModal(false);
            fetchHistory(dealRef, setHistoryList);
        } catch (err) {
            toast.error('Gagal menambahkan event');
        }
    };

    useEffect(() => {
        if (dealRef) {
            fetchFasilitasDetail(dealRef, setFasilitas);
            fetchHistory(dealRef, setHistoryList);
            fetchHistory(dealRef, setHistoryList);
        }
    }, [dealRef]);

    if (!fasilitas) {
        return (
            <Layout title="Detail Fasilitas">
                <div className="p-6 text-gray-600">Memuat data fasilitas...</div>
            </Layout>
        );
    }

    return (
        <Layout title="Detail Fasilitas">
            <div className="flex min-h-screen bg-gray-50 text-gray-800">
                <div className="flex-1 p-6 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">{fasilitas.nama_perusahaan}</h1>
                            <p className="text-sm text-gray-500">CIF {fasilitas.cif}</p>
                        </div>
                        <button className="bg-yellow-400 px-6 py-2 rounded font-bold">Auto Rekap</button>
                    </div>

                    {/* Loan Detail Section */}
                    <div className="grid md:grid-cols-2 gap-6 bg-white rounded-lg p-6 shadow mb-6">
                        <div className="space-y-2 text-sm">
                            <p><span className="font-semibold">Deal Ref:</span> {fasilitas.deal_ref}</p>
                            <p><span className="font-semibold">Jenis Fasilitas:</span> {fasilitas.jenis_fasilitas}</p>
                            <p><span className="font-semibold">Tanggal Mulai Macet:</span> {formatDate(fasilitas.tanggal_mulai_macet)}</p>
                            <p><span className="font-semibold">Key Person Perusahaan:</span> {fasilitas.key_person_perusahaan}</p>
                            <p><span className="font-semibold">Progres NPL:</span> {fasilitas.progres_npl}</p>
                            <p><span className="font-semibold">Restruktur Kredit Terakhir:</span> {formatDate(fasilitas.restruktur_terakhir)}</p>
                        </div>
                        <div className="space-y-3 text-sm">
                            <h2 className="text-md font-semibold">Jumlah Outstanding</h2>
                            <p className="text-xl text-blue-600 font-bold">{formatRupiah(fasilitas.jumlah_outstanding)}</p>
                            <div className="flex items-center space-x-3">
                                <div className="w-14 h-14 bg-gray-200 rounded-full" />
                                <div>
                                    <p className="text-xs">AO PPK in Charge</p>
                                    <p className="text-sm font-semibold">{fasilitas.ao_ppk}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-14 h-14 bg-gray-200 rounded-full" />
                                <div>
                                    <p className="text-xs">AO Komersial in Charge</p>
                                    <p className="text-sm font-semibold">{fasilitas.ao_komersial}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Agunan Table */}
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="font-semibold mb-2">Daftar Agunan</h2>
                        <table className="w-full border text-sm">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="border px-2 py-1">Jenis Agunan</th>
                                    <th className="border px-2 py-1">Reappraisal Terakhir</th>
                                    <th className="border px-2 py-1">Tanggal Reappraisal</th>
                                    <th className="border px-2 py-1">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fasilitas.agunan.map((item, idx) => (
                                    <tr key={idx} className="text-center">
                                        <td className="border px-2 py-1">{item.jenis_agunan}</td>
                                        <td className="border px-2 py-1">{formatRupiah(item.reappraisal_terakhir)}</td>
                                        <td className="border px-2 py-1">{formatDate(item.tanggal_reappraisal)}</td>
                                        <td className="border px-2 py-1">{item.status_agunan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={() => {
                                setEditedAgunan([...fasilitas.agunan]);
                                setIsEditOpen(true);
                            }}
                            className="mt-2 text-sm px-4 py-1 bg-gray-300 rounded"
                        >
                            Edit
                        </button>

                    </div>

                    {/* Tabs + History Timeline */}
                    <div className="flex border-b mb-4">
                        <button
                            onClick={() => setActiveTab('roadmap')}
                            className={`px-4 py-2 font-semibold ${activeTab === 'roadmap'
                                ? 'text-blue-900 border-b-2 border-blue-900'
                                : 'text-gray-600 border-b-2 border-transparent'
                                }`}
                        >
                            Roadmap
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-4 py-2 font-semibold ${activeTab === 'history'
                                ? 'text-blue-900 border-b-2 border-blue-900'
                                : 'text-gray-600 border-b-2 border-transparent'
                                }`}
                        >
                            History
                        </button>
                    </div>
                    {activeTab === 'roadmap' && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Roadmap Recovery NPL</h2>

                            <div className="space-y-2 relative ml-7 border-l-4 border-yellow-400 text-sm">
                                {roadmapList
                                .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                                .map((item, idx) => (
                                    <div key={idx} className="relative rounded p-3 bg-gray-50 border border-transparent hover:border hover:border-yelloe-500 transition duration-200">
                                        <div className="absolute -left-[10.5px] top-0 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white" />
                                        <p className="text-base font-bold text-yellow-700">{item.jenis_kegiatan}</p>
                                        <p className="text-gray-600">PPK - {item.ao_input}</p>
                                        <p className="text-gray-700">{item.keterangan_kegiatan}</p>
                                        <p className="text-xs text-gray-400">{formatDate(item.tanggal)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="mb-4 bg-blue-900 text-white px-4 py-2 rounded text-sm"
                            >
                                Tambah Event
                            </button>
                            <h2 className="text-lg font-semibold mb-4">History Progress NPL</h2>

                            <div className="space-y-2 relative ml-7 border-l-4 border-blue-400 text-sm">
                                {historyList
                                .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                                .map((item, idx) => (
                                    <div key={idx} className="relative rounded p-3 bg-gray-50 border border-transparent hover:border hover:border-blue-500 transition duration-200">
                                        <div className="absolute -left-[10.5px] top-0 w-4 h-4 bg-blue-400 rounded-full border-2 border-white" />
                                        <p className="text-base font-bold text-blue-700">{item.jenis_kegiatan}</p>
                                        <p className="text-gray-600">PPK - {item.ao_input}</p>
                                        <p className="text-gray-700">{item.keterangan_kegiatan}</p>
                                        <p className="text-xs text-gray-400">{formatDate(item.tanggal)}</p>

                                        {/* Tombol Hapus */}
                                        <button
                                                onClick={async () => {
                                                    const confirmDelete = confirm("Yakin ingin menghapus event ini?");
                                                    if (!confirmDelete) return;
                                                    try {
                                                        const token = localStorage.getItem("token");
                                                        await deleteHistory(item.event_history_id, token);
                                                        toast.success("Event berhasil dihapus");
                                                        fetchHistory(fasilitas.deal_ref, setHistoryList);
                                                    } catch (err) {
                                                        toast.error("Gagal menghapus event");
                                                    }
                                                }}
                                                className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-sm font-bold"
                                            >
                                                ✕
                                            </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-white/10 backdrop-blur-md">
                    <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        {/* Modal Content */}
                        <h2 className="text-lg font-bold text-teal-600 mb-4">Event Baru ({activeTab === 'roadmap' ? 'Roadmap' : 'History'})</h2>
                        <form className="space-y-4" onSubmit={handleEventSubmit}>
                            <div>
                                <label className="block text-sm font-medium">Nama Event</label>
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={e => setEventName(e.target.value)}
                                    className="border w-full px-3 py-2 rounded mt-1"
                                    placeholder="-"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Rincian</label>
                                <input
                                    type="text"
                                    value={eventDesc}
                                    onChange={e => setEventDesc(e.target.value)}
                                    className="border w-full px-3 py-2 rounded mt-1"
                                    placeholder="-"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Tanggal</label>
                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={e => setEventDate(e.target.value)}
                                    className="border w-full px-3 py-2 rounded mt-1"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-teal-500 text-white px-4 py-2 rounded w-full mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Mengirim...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isEditOpen && (
                <EditAgunanModal
                    agunanList={editedAgunan}
                    onClose={() => setIsEditOpen(false)}
                    onSave={async (updatedList) => {
                        try {
                            const token = localStorage.getItem('token');
                            await updateAgunan(fasilitas.deal_ref, updatedList, token);
                            toast.success("Agunan berhasil diperbarui!", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Bounce,
                            });
                            setFasilitas({ ...fasilitas, agunan: updatedList });
                            setIsEditOpen(false);
                        } catch (err) {
                            toast.error("Gagal update agunan!", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Bounce,
                            });
                        }
                    }}
                />
            )}
        </Layout>

    );

}

const formatRupiah = (number) => {
    return Number(number).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });
};

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
};