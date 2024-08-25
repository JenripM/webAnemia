import React, { useState, useEffect } from "react";
import { Tabs, List, Select } from "antd";
import axios from "axios";
import HistorialGrafico from "../dieta/DietaChart";
import FrequencyChart from "../dieta/FrecuenciaPromedioChart";
import { useSession } from "next-auth/react";
import FechaSelector from "../dieta/FechaSelector";
import HistorialDiagnosticos from "../tipoanemia/HistorialDiagnosticoPaciente";
import SelectPacienteHistorial from "../tipoanemia/PacienteSelector";
import HistorialPaciente from "../tipoanemia/HistorialDiagnosticoPaciente";
import HistorialDiagnosticoPaciente from "../tipoanemia/HistorialDiagnosticoPaciente";
import PacienteSelector from "../tipoanemia/PacienteSelector";
import FiltroDiagnostico from "../tipoanemia/FiltroDiagnostico";
import DiagnosticoGrafico from "../tipoanemia/DiagnosticoGrafico";

// import ChartFrecuencias from '../dieta/ChartFrecuencia';

const { TabPane } = Tabs;

const { Option } = Select;

interface Paciente {
  id: number;
  codigo_cnv: string;
  dni: string;
  nombre: string;
  sexo: string;
  fecha_nacimiento: string;
  distrito: number;
}

interface Dieta {
  id: number;
  paciente: Paciente;
  frec_verduras: number;
  frec_carnes_rojas: number;
  frec_aves: number;
  frec_huevos: number;
  frec_pescado: number;
  frec_leche: number;
  frec_menestra: number;
  frec_bocados_dulc: number;
  frec_bebidas_az: number;
  frec_embutidos_consv: number;
  frec_fritura: number;
  frec_azucar: number;
  frec_desayuno: number;
  frec_almuerzo: number;
  frec_cena: number;
  frec_fruta: number;
  dx_dieta: number;
  created_at: string;
  updated_at: string;
}

// const url = 'https://apianemia.onrender.com';
const url = "http://127.0.0.1:8000";

const HistorialPredicciones = () => {
  const [pacientes, setPacientes] = useState<{ id: number; nombre: string }[]>(
    []
  );

  const [activeTab, setActiveTab] = useState("1"); // Estado para controlar la pestaña activa
  const [dietaData, setDietaData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const [selectedPaciente, setSelectedPaciente] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false); // Agregado aquí
  const { data: session } = useSession();
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);

  const handleFechaChange = (fechaInicio: Date, fechaFin: Date) => {
    setFechaInicio(fechaInicio);
    setFechaFin(fechaFin);
    // Utilizar las fechas seleccionadas en el abuelo
  };

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        if (session && session.idApoderado) {
          const response = await axios.get(
            `${url}/pacientes/apoderado/${session.idApoderado}`
          );
          setPacientes(response.data);
        }
      } catch (error) {
        console.error("Error fetching pacientes:", error);
      }
    };

    fetchPacientes();
  }, [session]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handlePacienteChange = (value: number | null) => {
    setSelectedPaciente(value ?? null);
    setError(false); // Limpiar el error cuando se selecciona un paciente
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlParams = `idPaciente=${selectedPaciente}`;

        if (fechaInicio) {
          const fechaInicioString = fechaInicio.toISOString().split("T")[0];
          urlParams += `&fechaInicio=${fechaInicioString}`;
        }

        if (fechaFin) {
          const fechaFinString = fechaFin.toISOString().split("T")[0];
          urlParams += `&fechaFin=${fechaFinString}`;
        }

        const response = await axios.get(
          `${url}/dietas/historial/?${urlParams}`
        );
        console.log(`${url}/dietas/historial/?${urlParams}`);
        setDietaData(response.data.dietas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedPaciente) {
      fetchData();
    }
  }, [fechaInicio, fechaFin, selectedPaciente]);

  const [selectedPacienteId, setSelectedPacienteId] = useState<string | null>(
    null
  );

  const handlePacienteChange2 = (id: string) => {
    console.log("Paciente seleccionado:", id); // Mensaje de depuración
    setSelectedPacienteId(id);
  };

  return (
    <div className="bg-white p-4">
      <h1 className="font-medium text-xl mb-4">Historial de Pronósticos</h1>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Prediccion Anemia" key="1">
          {/* Contenido para el tipo de pronóstico 1 */}
          <h1>Historial de Diagnosticos</h1>

          <div>
            <Select
              style={{ width: "100%" }}
              placeholder="Selecciona un paciente"
              loading={loading}
              onChange={handlePacienteChange2}
              value={selectedPacienteId ?? undefined}
              className={!selectedPacienteId && error ? "ant-select-error" : ""}
            >
              {pacientes.map((paciente) => (
                <Option key={paciente.id} value={paciente.id}>
                  {paciente.nombre}
                </Option>
              ))}
            </Select>
            {!selectedPacienteId && error && (
              <div style={{ color: "red", fontSize: "12px" }}>
                Por favor, selecciona un paciente.
              </div>
            )}
            {selectedPacienteId && <FiltroDiagnostico pacienteId={selectedPacienteId} />}
            
            {selectedPacienteId && <DiagnosticoGrafico pacienteId={selectedPacienteId.toString()} />}
          </div>
        </TabPane>
        <TabPane tab="Probabilidad en base a dieta" key="2">
          {/* Contenido para el tipo de pronóstico 2 */}
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <div>
              <h1>Historial de Predicciones</h1>
              <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
                <p className="py-4 font-medium">Elegir paciente</p>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Selecciona un paciente"
                  loading={loading}
                  onChange={handlePacienteChange}
                  value={selectedPaciente ?? undefined}
                  className={
                    !selectedPaciente && error ? "ant-select-error" : ""
                  }
                >
                  {pacientes.map((paciente) => (
                    <Option key={paciente.id} value={paciente.id}>
                      {paciente.nombre}
                    </Option>
                  ))}
                </Select>
                {!selectedPaciente && error && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    Por favor, selecciona un paciente.
                  </div>
                )}
              </div>
              {/* <ChartFrecuencias data={dietaData}/> */}
              {selectedPaciente && (
                <div>
                  {dietaData && dietaData.length > 0 ? (
                    <>
                      {/* <ChartFrecuencias data={dietaData}/> */}
                      <FechaSelector onFechaChange={handleFechaChange} />
                      <HistorialGrafico dietas={dietaData} />
                      <FrequencyChart data={dietaData} />
                    </>
                  ) : (
                    <div>No hay datos disponibles para graficar</div>
                  )}
                </div>
              )}
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HistorialPredicciones;
