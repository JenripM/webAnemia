// src/components/DistritoSelect.tsx
"use client";
import React from "react";

interface Distrito {
    id: string;
    name: string;
}

interface DistritoSelectProps {
    distritos: Distrito[];
    selectedDistrito: string;
    onDistritoChange: (value: string) => void;
    disabled: boolean;
}

const DistritoSelect: React.FC<DistritoSelectProps> = ({ distritos, selectedDistrito, onDistritoChange, disabled }) => {
    return (
        <div>
            <label htmlFor="distrito" className="block text-sm font-medium text-gray-700">Distrito</label>
            <select
                id="distrito"
                name="distrito"
                value={selectedDistrito}
                onChange={(e) => onDistritoChange(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                disabled={disabled}
            >
                <option value="">Selecciona un distrito</option>
                {distritos.map((dist) => (
                    <option key={dist.id} value={dist.id}>{dist.name}</option>
                ))}
            </select>
        </div>
    );
};

export default DistritoSelect;
