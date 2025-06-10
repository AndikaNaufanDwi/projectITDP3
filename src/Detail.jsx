import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { useEffect, useState } from 'react';
import { fetchFasilitasByCIF } from './services/FasilitasCIF';

export default function DetailPerusahaan() {
    const navigate = useNavigate();
    const { state: company } = useLocation();

    if (!company) return <p>Data tidak ditemukan</p>;

    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        if (company?.cif) {
            fetchFasilitasByCIF(company.cif, setFacilities);
        }
    }, [company]);

    return (
        <Layout title="Detail Perusahaan">
            <div className="flex min-h-screen bg-gray-50 text-gray-800">
                <div className="flex-1 p-6">
                    {/* Company Overview Box */}
                    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-lg font-bold">{company.nama_perusahaan}</p>
                                <p className="text-sm text-gray-500">CIF {company.cif}</p>
                                <p className="mt-2 font-medium">Daftar Fasilitas yang Digunakan:</p>
                            </div>
                            <div className="text-right">
                                <p className="text-red-600 text-lg font-bold">
                                    {company.total_outstanding.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0
                                    })}
                                </p>
                                <p className="text-sm text-gray-600">Presentase NPL terhadap cabang: {company.persentase_npl}</p>
                            </div>
                        </div>
                    </div>

                    {/* Facility Cards */}
                    {facilities.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/fasilitas/facility-detail/${item.deal_ref}`)}
                            className="bg-white shadow-sm rounded-lg w-[98%] mx-auto px-4 py-3 mb-3 flex justify-between text-sm cursor-pointer hover:bg-gray-50"
                        >
                            <div>
                                <p className="font-semibold">{item.jenis_fasilitas}</p>
                                <p className="text-xs text-gray-500">Deal Ref: {item.deal_ref}</p>
                            </div>

                            <div className="flex items-center space-x-4" onClick={(e) => e.stopPropagation()}>
                                <div className="text-right pr-2">
                                    <p className="text-red-600 font-semibold">
                                        Rp {Number(item.jumlah_outstanding).toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-xs text-gray-600">{item.progres_npl}</p>
                                </div>
                                <div className="flex space-x-2 text-gray-500">
                                    <FaEdit className="cursor-pointer hover:text-blue-600" />
                                    <FaTrash className="cursor-pointer hover:text-red-600" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
