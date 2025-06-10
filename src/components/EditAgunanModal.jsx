import { useState } from 'react';

export default function EditAgunanModal({ agunanList, onClose, onSave }) {
  const [editedAgunan, setEditedAgunan] = useState([...agunanList]);

  const handleChange = (index, field, value) => {
    const updated = [...editedAgunan];
    updated[index][field] = field === 'reappraisal_terakhir' ? parseFloat(value) : value;
    setEditedAgunan(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-xl overflow-hidden">
            {/* Header */}
            <div className="bg-teal-500 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">Edit Daftar Agunan</h2>
                <button
                  onClick={onClose}
                  className="text-white text-2xl leading-none hover:text-red-200"
                >
                  &times;
                </button>
              </div>
        {/* Form Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
{editedAgunan.map((item, idx) => (
          <div key={idx} className="mb-4 border p-4 rounded bg-gray-50 space-y-2">
            <input
              className="w-full border px-2 py-1 rounded"
              placeholder="Jenis Agunan"
              value={item.jenis_agunan}
              onChange={(e) => handleChange(idx, 'jenis_agunan', e.target.value)}
            />
            <input
              type="number"
              className="w-full border px-2 py-1 rounded"
              placeholder="Reappraisal Terakhir"
              value={item.reappraisal_terakhir}
              onChange={(e) => handleChange(idx, 'reappraisal_terakhir', e.target.value)}
            />
            <input
              type="date"
              className="w-full border px-2 py-1 rounded"
              value={item.tanggal_reappraisal}
              onChange={(e) => handleChange(idx, 'tanggal_reappraisal', e.target.value)}
            />
            <select
              className="w-full border px-2 py-1 rounded"
              value={item.status_agunan}
              onChange={(e) => handleChange(idx, 'status_agunan', e.target.value)}
            >
              <option value="Terjual">Terjual</option>
              <option value="Belum Terjual">Belum Terjual</option>
            </select>
          </div>
        ))}
        </div>
        
        <div className="px-5 pb-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Batal</button>
          <button onClick={() => onSave(editedAgunan)} className="bg-blue-700 text-white px-4 py-2 rounded">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
} 
