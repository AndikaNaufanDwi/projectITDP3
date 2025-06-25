import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const FacilityCard = ({ item, onClick, onEdit, onDelete }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-sm rounded-lg w-full px-4 py-3 flex justify-between text-sm cursor-pointer hover:bg-gray-50"
    >
      <div>
        <p className="font-semibold text-black">{item.jenis_fasilitas}</p> {/* Added text-black for visibility */}
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
          {/* These handlers will come from the parent DetailPerusahaan */}
          <FaEdit className="cursor-pointer hover:text-blue-600" onClick={onEdit} />
          <FaTrash className="cursor-pointer hover:text-red-600" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};