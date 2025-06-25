import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { useNavigate } from 'react-router-dom';
import { fetchPerusahaan } from './services/FetchPerusahaan';
import { submitPerusahaan } from './services/TambahPerusahaan';
import { HoverEffect } from './components/ui/HoverEffect';
import { CompanyCard } from './components/CompaniesCard';

export default function FasilitasPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cif: '',
    nama_perusahaan: '',
    total_outstanding: '',
    cabang: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

const handleClick = (company) => {
  navigate(`/fasilitas/company-detail/${company.cif}`, {
    state: company,
  });
};

  useEffect(() => {
    fetchPerusahaan(setCompanies).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    const result = await submitPerusahaan(formData);
    if (result.success) {
      fetchPerusahaan(setCompanies);
      setShowModal(false);
    } else {
      alert('Gagal tambah perusahaan');
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const filteredCompanies = companies.filter((company) => {
    const term = searchTerm.toLowerCase();
    return (
      company.nama_perusahaan.toLowerCase().includes(term) ||
      company.kantor_wilayah.toLowerCase().includes(term) ||
      company.kantor_cabang.toLowerCase().includes(term) ||
      company.cif.toLowerCase().includes(term)
    );
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortOrder === 'az') {
      return a.nama_perusahaan.localeCompare(b.nama_perusahaan);
    } else if (sortOrder === 'za') {
      return b.nama_perusahaan.localeCompare(a.nama_perusahaan);
    }
    return 0;
  });

  const hoverEffectItems = sortedCompanies.map((company) => ({
    link: `/fasilitas/company-detail/${company.cif}`,
    content: (
      <CompanyCard
        company={company}
        onClick={() => handleClick(company)}
        onEdit={(e) => handleEdit(company, e)}
        onDelete={(e) => handleDelete(company, e)}
      />
    ),
  }));

  const breadcrumbs = [{ label: 'Companies', path: '/fasilitas' }];

  return (
    <Layout title="Companies" breadcrumbs={[{ label: 'Companies', path: '/fasilitas' }]} >
      <div className="flex flex-wrap justify-between items-center mb-4 px-2">
        <div className="relative inline-block">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-1 py-2 rounded text-sm"
          >
            <option value=""></option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />

      </div>

      <div className="flex justify-end px-4 mb-4">
        {/* <button
          onClick={() => setShowModal(true)}
          className="bg-blue-800 text-white px-4 py-2 rounded text-sm"
        >
          Tambah Perusahaan
        </button> */}
        {/* }
        {showModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-xl overflow-hidden">

              <div className="bg-teal-500 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">Tambah Perusahaan</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white text-2xl leading-none hover:text-red-200"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="CIF"
                    value={formData.cif}
                    onChange={e => setFormData({ ...formData, cif: e.target.value })}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Nama Perusahaan"
                    value={formData.nama_perusahaan}
                    onChange={e => setFormData({ ...formData, nama_perusahaan: e.target.value })}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Total Outstanding"
                    value={formData.total_outstanding}
                    onChange={e => setFormData({ ...formData, total_outstanding: e.target.value })}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Cabang"
                    value={formData.cabang}
                    onChange={e => setFormData({ ...formData, cabang: e.target.value })}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 rounded border hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-800 text-white px-5 py-2 rounded hover:bg-blue-900"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white shadow-sm rounded w-[95%] mx-auto p-4 flex justify-between items-center"
            >
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-48" />
                <div className="h-3 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="h-2 bg-gray-200 rounded w-40" />
              </div>
              <div className="flex space-x-4">
                <div className="h-5 w-5 bg-gray-200 rounded" />
                <div className="h-5 w-5 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-2">
          {sortedCompanies.length > 0 ? (
           <HoverEffect items={hoverEffectItems} className="max-w-7xl mx-auto" />
          ) : (
            <p className="text-center text-gray-500 py-10">No companies found matching your criteria.</p>
          )}
        </div>
      )}
    </Layout>
  );
}
