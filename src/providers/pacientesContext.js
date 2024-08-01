import { createContext, useState } from 'react';

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);

  const agregarPaciente = (paciente) => {
    setPacientes([...pacientes, paciente]);
  };

  return (
    <PacientesContext.Provider value={{ pacientes, agregarPaciente }}>
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider, PacientesContext };