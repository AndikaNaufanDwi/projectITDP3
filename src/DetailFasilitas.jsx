import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchFasilitasDetail } from './services/DetailFasilitas';
import { updateAgunan } from "./services/UpdateAgunan";
import EditAgunanModal from "./components/EditAgunanModal";
import { fetchHistory } from "./services/GetHistory";
import { fetchRoadmap } from "./services/GetRoadmap";
import { tambahHistory } from "./services/TambahHistory";
import { deleteHistory } from './services/HapusHistory';
import { toast, Bounce } from "react-toastify";
import { downloadDocxFile } from "./services/AutoRekap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { OrbitProgress } from "react-loading-indicators";

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
    const [eventStatus, setEventStatus] = useState("");


    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [eventImage, setEventImage] = useState(null);

    const [editMode, setEditMode] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const closeModal = () => {
        setShowModal(false);
        setEventName("");
        setEventDesc("");
        setEventDate("");
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!eventImage && !editMode) {
            toast.error("Mohon pilih gambar terlebih dahulu");
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);
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
                    image: eventImage,
                    status: eventStatus,
                },
            });

            toast.success('Event berhasil ditambahkan!');
            setShowModal(false);
            fetchHistory(dealRef, setHistoryList);

            // Reset
            setEventName("");
            setEventDesc("");
            setEventDate("");
            setEventImage(null);
            setEventStatus("");
            setPreviewUrl("");
            setEditMode(false);
            setEditingEvent(null);
        } catch (err) {
            console.error('Error saat submit event:', err);
            toast.error('Gagal menambahkan event');
        } finally {
            setIsSubmitting(false);
        }
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await downloadDocxFile(fasilitas.deal_ref);
        } catch (err) {
            alert("Gagal mendownload file.");
        } finally {
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        if (dealRef) {
            fetchFasilitasDetail(dealRef, setFasilitas);
            fetchHistory(dealRef, setHistoryList);
            fetchRoadmap(dealRef, setRoadmapList);
        }
    }, [dealRef]);

    if (!fasilitas) {
        return (
            <Layout title="Detail Fasilitas">
                <div className="p-6 text-gray-600">Memuat data fasilitas...</div>
            </Layout>
        );
    }

    const breadcrumbs = [
        { label: 'Companies', path: '/fasilitas' },
        { label: fasilitas?.nama_perusahaan || 'Detail Perusahaan', path: `/fasilitas/company-detail/${fasilitas?.cif || ''}` },
        { label: fasilitas?.deal_ref || 'Detail Fasilitas', path: `/fasilitas/facility-detail/${fasilitas?.deal_ref || ''}` }
    ];

    return (
        <Layout title="Detail Fasilitas" breadcrumbs={breadcrumbs}>
            <div className="flex min-h-screen bg-gray-50 text-gray-800">
                <div className="flex-1 p-6 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">{fasilitas.nama_perusahaan}</h1>
                            <p className="text-sm text-gray-500">CIF {fasilitas.cif}</p>
                        </div>
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`bg-yellow-400 px-6 py-2 rounded font-bold flex items-center justify-center min-w-[120px] cursor-pointer transition-colors duration-200 ${isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
                        >
                            {isDownloading ? (
                                <OrbitProgress
                                    variant="track-disc"
                                    color="#707670"
                                    size="small"
                                    text=""
                                    textColor=""
                                />
                            ) : (
                                "Auto Rekap"
                            )}
                        </button>
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
                            className="mt-2 text-sm px-4 py-1 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 transition duration-200"
                        >
                            Edit
                        </button>

                    </div>

                    {/* Tabs + History Timeline */}
                    <div className="flex border-b mb-4">
                        <button
                            onClick={() => setActiveTab('roadmap')}
                            className={`px-4 py-2 font-semibold cursor-pointer ${activeTab === 'roadmap'
                                ? 'text-blue-900 border-b-2 border-blue-900'
                                : 'text-gray-600 border-b-2 border-transparent'
                                }`}
                        >
                            Roadmap
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-4 py-2 font-semibold cursor-pointer ${activeTab === 'history'
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
                                        <div key={idx} className="relative rounded p-3 bg-gray-50 border border-transparent hover:border hover:border-yellow-500 transition duration-200">
                                            <div className="absolute -left-[10.5px] top-0 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white" />
                                            <p className="text-base font-bold text-yellow-700">{item.jenis_kegiatan}</p>
                                            <p className="text-gray-600">{item.ao_input}</p>
                                            <p className="text-gray-700">{item.keterangan}</p>
                                            <p className="text-xs text-gray-400">{formatDate(item.tanggal)}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <button
                                onClick={() => {
                                    setShowModal(true);
                                    setEventName("");
                                    setEventDesc("");
                                    setEventDate("");
                                    setEventImage(null);
                                    setPreviewUrl("");
                                }}
                                className="mb-4 bg-blue-900 text-white px-4 py-2 rounded text-sm cursor-pointer hover:bg-blue-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

                                            {item.image && (
                                                <div className="mt-3">
                                                    <p className="text-xs text-gray-500 mb-1">Dokumentasi:</p>
                                                    <img
                                                        src={item.image}
                                                        alt="Dokumentasi"
                                                        className="w-40 md:w-56 h-auto object-contain border rounded shadow"
                                                    />
                                                </div>
                                            )}

                                            {/* Tombol Update & Hapus */}
                                            <div className="absolute top-2 right-3 flex space-x-2">
                                                <FaEdit
                                                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setEditingEvent(item);
                                                        setShowModal(true);
                                                        setEventName(item.jenis_kegiatan);
                                                        setEventDesc(item.keterangan_kegiatan);
                                                        setEventDate(formatDateForInput(item.tanggal));
                                                        setPreviewUrl(item.image);
                                                        setEventImage(null);
                                                    }}
                                                />
                                                <FaTrash
                                                    className="cursor-pointer text-red-500 hover:text-red-700"
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
                                                />
                                            </div>

                                        </div>
                                    ))}
                            </div>

                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-white/10 backdrop-blur-md">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-teal-500 text-white px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-bold">Tambah History</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-white text-2xl leading-none hover:text-red-200"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Content */}
                        <form className="p-6 space-y-4 max-h-96 overflow-y-auto" onSubmit={handleEventSubmit}>
                            <div>
                                <label className="block text-sm font-medium">Nama Event</label>
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={e => setEventName(e.target.value)}
                                    required
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
                                    required
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
                                    required
                                    className="border w-full px-3 py-2 rounded mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    value={eventStatus}
                                    onChange={e => setEventStatus(e.target.value)}
                                    required
                                    className="border w-full px-3 py-2 rounded mt-1"
                                >
                                    <option value="">Pilih status</option>
                                    <option value="Berhasil">Berhasil</option>
                                    <option value="Gagal">Gagal</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Gambar</label>

                                <div className="flex items-center space-x-4">
                                    <label className="cursor-pointer inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition">
                                        Pilih Gambar
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setEventImage(e.target.files[0])}
                                            className="hidden"
                                        />
                                    </label>

                                    {eventImage && (
                                        <span className="text-sm text-gray-700">{eventImage.name}</span>
                                    )}
                                </div>

                                {(eventImage || previewUrl) && (
                                    <div className="mt-3">
                                        <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                        <img
                                            src={eventImage ? URL.createObjectURL(eventImage) : previewUrl}
                                            alt="Preview"
                                            className="w-full max-h-64 object-contain border rounded"
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-teal-500 text-white px-4 py-2 rounded w-full mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Mengirim...' : (editMode ? 'Update' : 'Submit')}
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

const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toISOString().split("T")[0];
};