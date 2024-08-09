// Componente hijo (FechaSelector.tsx)
import React, { useState } from 'react';
import { DatePicker } from 'antd';

interface FechaSelectorProps {
  onFechaChange: (fechaInicio: Date, fechaFin: Date) => void;
}

const FechaSelector: React.FC<FechaSelectorProps> = ({ onFechaChange }) => {
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);

  const handleFechaInicioChange = (date: Date) => {
    setFechaInicio(date);
    onFechaChange(date, fechaFin!); // Llamar a onFechaChange con la nueva fecha de inicio
  };

  const handleFechaFinChange = (date: Date) => {
    setFechaFin(date);
    onFechaChange(fechaInicio!, date); // Llamar a onFechaChange con la nueva fecha de fin
  };

  return (
    <div>
      <p>Seleccione un rango de fechas:</p>
      <DatePicker
        format="YYYY-MM-DD"
        value={fechaInicio}
        onChange={handleFechaInicioChange}
        placeholder="Fecha de inicio"
      />
      <DatePicker
        format="YYYY-MM-DD"
        value={fechaFin}
        onChange={handleFechaFinChange}
        placeholder="Fecha de fin"
      />
    </div>
  );
};

export default FechaSelector;