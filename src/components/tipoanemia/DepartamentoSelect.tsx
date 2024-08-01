// src/components/DepartamentoSelect.tsx
"use client";
import React from "react";

interface Departamento {
    id: string;
    departamento: string;
}

interface DepartamentoSelectProps {
    departamentos: Departamento[];
    selectedDepartamento: string;
    // eslint-disable-next-line unused-imports/no-unused-vars
    onDepartamentoChange: (value: string) => void;
}

const DepartamentoSelect: React.FC<DepartamentoSelectProps> = ({ departamentos, selectedDepartamento, onDepartamentoChange }) => {
    return (
        <div>
            <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">Departamento</label>
            <select
                id="departamento"
                name="departamento"
                value={selectedDepartamento}
                onChange={(e) => onDepartamentoChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
                <option value="">Selecciona un departamento</option>
                {departamentos.map((dep) => (
                    <option key={dep.id} value={dep.id}>{dep.departamento}</option>
                ))}
            </select>
        </div>
    );
};

export default DepartamentoSelect;
