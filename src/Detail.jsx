import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import { useEffect, useState } from 'react';
import { fetchFasilitasByCIF } from './services/FasilitasCIF';
import { HoverEffect } from './components/ui/HoverEffect';
import { fetchPerusahaan } from './services/FetchPerusahaan';
import { FacilityCard } from './components/FacilitiesCard';

export default function DetailPerusahaan() {
    const navigate = useNavigate();
    const { state: companyFromState } = useLocation();
    const { cif: cifFromParams } = useParams();

    const [company, setCompany] = useState(companyFromState);
    const [facilities, setFacilities] = useState([]);
    const [loadingFacilities, setLoadingFacilities] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!company && cifFromParams) {
            const fetchCompanyData = async () => {
                const temp = [];
                await fetchPerusahaan((result) => {
                    temp.push(...result);
                });

                const match = temp.find((c) => c.cif === cifFromParams);
                if (match) {
                    setCompany(match);
                } else {
                    console.warn("Company not found with CIF:", cifFromParams);
                }
            };
            fetchCompanyData();
        }
    }, [company, cifFromParams]);


    useEffect(() => {
        if (company?.cif) {
            setLoadingFacilities(true);
            fetchFasilitasByCIF(company.cif, setFacilities)
                .catch(err => {
                    console.error("Failed to fetch facilities:", err);
                    setError("Gagal memuat daftar fasilitas.");
                })
                .finally(() => setLoadingFacilities(false));
        }
    }, [company]);

    const handleFacilityClick = (facility) => {
        navigate(`/fasilitas/facility-detail/${facility.deal_ref}`);
    };

    const hoverEffectFacilityItems = facilities.map((item) => ({
        link: `/fasilitas/facility-detail/${item.deal_ref}`,
        content: (
            <FacilityCard
                item={item}
                onClick={() => handleFacilityClick(item)}
                onEdit={(e) => { e.stopPropagation(); /* handle edit */ }}
                onDelete={(e) => { e.stopPropagation(); /* handle delete */ }}
            />
        ),
    }));

    const breadcrumbs = [
        { label: 'Companies', path: '/fasilitas' },
        { label: company?.nama_perusahaan || 'Detail Perusahaan', path: `/fasilitas/company-detail/${company?.cif || ''}` },
    ];

    if (!company && !loadingFacilities) {
        return (
            <Layout breadcrumbs={[{ label: 'Error', path: '/fasilitas' }]}> {/* Pass breadcrumbs for error state */}
                <div className="text-center py-10 text-gray-600">
                    <p>Company data not found. Please navigate from the company list or check the URL.</p>
                    <button
                        onClick={() => navigate('/fasilitas')}
                        className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
                    >
                        Go to Company List
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <div className="flex min-h-screen bg-gray-50 text-gray-800">
                <div className="flex-1 p-6">
                    {/* Company Overview Box */}
                    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                {company?.nama_perusahaan ? (
                                    <p className="text-lg font-bold">{company.nama_perusahaan}</p>
                                ) : (
                                    <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-1" />
                                )}

                                {company?.cif ? (
                                    <p className="text-sm text-gray-500">CIF {company.cif}</p>
                                ) : (
                                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mb-2" />
                                )}

                                <p className="mt-2 font-medium">Daftar Fasilitas yang Digunakan:</p>
                            </div>

                            <div className="text-right">
                                {company?.total_outstanding ? (
                                    <p className="text-red-600 text-lg font-bold">
                                        {company.total_outstanding.toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                        })}
                                    </p>
                                ) : (
                                    <div className="h-6 bg-gray-200 rounded w-36 animate-pulse mb-2" />
                                )}

                                {company?.persentase_npl ? (
                                    <p className="text-sm text-gray-600">
                                        Presentase NPL terhadap cabang: {company.persentase_npl}
                                    </p>
                                ) : (
                                    <div className="h-4 bg-gray-200 rounded w-56 animate-pulse" />
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Facility Cards */}
                    {loadingFacilities ? (
                        <div className="animate-pulse space-y-4">
                            {/* Skeleton for Company Overview */}
                            <div className="bg-white shadow-sm rounded-lg p-6">
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                        <div className="h-6 bg-gray-200 rounded w-48"></div>
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <div className="h-6 bg-gray-200 rounded w-32"></div>
                                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Skeleton for Facility Cards */}
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-lg p-6 shadow flex justify-between items-center">
                                    <div className="space-y-2">
                                        <div className="h-5 bg-gray-200 rounded w-64"></div>
                                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                                    </div>
                                    <div className="h-6 w-6 bg-gray-200 rounded-full" />
                                </div>
                            ))}
                        </div>
                    ) : facilities.length > 0 ? (
                        <HoverEffect
                            items={hoverEffectFacilityItems}
                            className="space-y-3"
                        />
                    ) : (
                        <p className="text-center text-gray-500 py-4">No facilities found for this company.</p>
                    )}
                </div>
            </div>
        </Layout>
    );

}