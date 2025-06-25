import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

export const CompanyCard = ({ company, onClick, onEdit, onDelete }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-sm rounded w-full p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
    >
      <div>
        <p className="font-bold text-black">{company.nama_perusahaan}</p> 
        <p className="text-sm text-gray-700">{company.kantor_wilayah}</p>
        <p className="text-sm text-gray-700">{company.kantor_cabang}</p>
        <p className="text-xs text-gray-400">CIF: {company.cif}</p>
      </div>

      <div
        className="flex space-x-4 text-gray-500"
        onClick={(e) => e.stopPropagation()} 
      >
        <FaEdit className="cursor-pointer hover:text-blue-600" onClick={onEdit} />
        <FaTrash className="cursor-pointer hover:text-red-600" onClick={onDelete} />
      </div>
    </div>
  );
};