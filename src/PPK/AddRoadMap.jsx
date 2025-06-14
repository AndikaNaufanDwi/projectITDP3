import { useState, useEffect } from 'react';
import { fetchPerusahaan } from '../services/FetchPerusahaan';
import { fetchFasilitasByCIF } from '../services/FasilitasCIF';

export default function NewRoadmapModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    perusahaan: '',
    nominal: '',
    tanggalAwal: '',
    roadmap: [
      { kegiatan: '', detail: '', tanggal: '' }
    ]
  });

  const handleRoadmapChange = (index, field, value) => {
    const updated = [...form.roadmap];
    updated[index][field] = value;
    setForm({ ...form, roadmap: updated });
  };

  const addRoadmapRow = () => {
    setForm({
      ...form,
      roadmap: [...form.roadmap, { kegiatan: '', detail: '', tanggal: '' }]
    });
  };

  const removeRoadmapRow = (index) => {
    if (form.roadmap.length === 1) return;
    const updated = [...form.roadmap];
    updated.splice(index, 1);
    setForm({ ...form, roadmap: updated });
  };

  const [companies, setCompanies] = useState([]);
  const [selectedCif, setSelectedCif] = useState('');

  const [dealRefList, setDealRefList] = useState([]);
  const [selectedDealRef, setSelectedDealRef] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchPerusahaan(setCompanies, token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (selectedCif) {
      fetchFasilitasByCIF(selectedCif, setDealRefList, token);
    } else {
      setDealRefList([]);
    }
  }, [selectedCif]);

  const handleSubmit = () => {
    console.log('Form submitted:', form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-xl overflow-hidden shadow-md flex flex-col">
        {/* Header */}
        <div className="bg-teal-500 text-white px-6 py-4 flex justify-between items-center">
          <span className="text-lg font-bold">New Roadmap</span>
          <button
            onClick={onClose}
            className="text-white text-2xl leading-none hover:text-red-200"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[65vh]">
          {step === 1 ? (
            <>
              <div>
                <label className="block font-semibold mb-1">Pilih CIF</label>
                <select
                  value={selectedCif}
                  onChange={(e) => setSelectedCif(e.target.value)}
                  className="w-full border px-4 py-2 rounded"
                  required
                >
                  <option value="" disabled>CIF</option>
                  {companies.map((company, i) => (
                    <option key={i} value={company.cif}>
                      {company.cif} - {company.nama_perusahaan}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCif && (
                <div>
                  <label className="block font-semibold mb-1">Deal Ref</label>
                  <select
                    value={selectedDealRef}
                    onChange={(e) => setSelectedDealRef(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                  >
                    <option value="">-- Pilih Deal Ref --</option>
                    {dealRefList.map((deal, idx) => (
                      <option key={idx} value={deal.deal_ref}>
                        {deal.deal_ref}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="text-right">
                <button
                  onClick={() => setStep(2)}
                  className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="overflow-y-auto max-h-[60vh] pr-2">
                {form.roadmap.map((item, i) => (
                  <div key={i} className="space-y-2 border rounded-lg p-4 mb-4 relative bg-gray-50 shadow-sm">
                    {/* ❌ Delete Button */}
                    {form.roadmap.length > 1 && (
                      <button
                        onClick={() => removeRoadmapRow(i)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs"
                      >
                        Hapus ✖
                      </button>
                    )}
                    <div>
                      <label className="block font-semibold mb-1">Kegiatan</label>
                      <input
                        type="text"
                        value={item.kegiatan}
                        onChange={(e) => handleRoadmapChange(i, 'kegiatan', e.target.value)}
                        className="w-full border px-4 py-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Detail Kegiatan</label>
                      <input
                        type="text"
                        value={item.detail}
                        onChange={(e) => handleRoadmapChange(i, 'detail', e.target.value)}
                        className="w-full border px-4 py-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Tanggal</label>
                      <input
                        type="date"
                        value={item.tanggal}
                        onChange={(e) => handleRoadmapChange(i, 'tanggal', e.target.value)}
                        className="w-full border px-4 py-2 rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addRoadmapRow}
                className="border px-4 py-1 rounded text-sm"
              >
                Tambah Kegiatan
              </button>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
