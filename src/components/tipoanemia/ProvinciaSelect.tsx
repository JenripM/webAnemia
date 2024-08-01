// src/components/ProvinciaSelect.tsx
"use client";
import React from "react";

interface Provincia {
    id: string;
    name: string;
}

interface ProvinciaSelectProps {
    provincias: Provincia[];
    selectedProvincia: string;
    onProvinciaChange: (value: string) => void;
    disabled: boolean;
}

const ProvinciaSelect: React.FC<ProvinciaSelectProps> = ({ provincias, selectedProvincia, onProvinciaChange, disabled }) => {
    return (
        <div>
            <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">Provincia</label>
            <select
                id="provincia"
                name="provincia"
                value={selectedProvincia}
                onChange={(e) => onProvinciaChange(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                disabled={disabled}
            >
                <option value="">Selecciona una provincia</option>
                {provincias.map((prov) => (
                    <option key={prov.id} value={prov.id}>{prov.name}</option>
                ))}
            </select>
        </div>
    );
};

export default ProvinciaSelect;
