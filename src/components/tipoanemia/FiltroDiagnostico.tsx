// FiltroDiagnostico.tsx

import React, { useEffect, useState } from "react";
import { Select, Spin, Card, Table } from "antd";
import axios from "axios";

const url = "http://127.0.0.1:8000";
const { Option } = Select;

const FiltroDiagnostico: React.FC<{ pacienteId: string }> = ({ pacienteId }) => {
  const [nivelesAnemia, setNivelesAnemia] = useState<any[]>([]);
  const [selectedNivel, setSelectedNivel] = useState<number | null>(null);
  const [diagnosticos, setDiagnosticos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNivelesAnemia = async () => {
      try {
        const response = await axios.get(`${url}/niveles-anemia`);
        setNivelesAnemia(response.data);
      } catch (error) {
        console.error("Error fetching niveles de anemia:", error);
      }
    };

    fetchNivelesAnemia();
  }, []);

  useEffect(() => {
    if (pacienteId && selectedNivel !== null) {
      const fetchDiagnosticos = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${url}/diagnosticos/estadisticas/paciente/${pacienteId}`);
          console.log("Diagnosticos fetched:", response.data); // Mensaje de depuración

          // Obtener los datos según el nivel seleccionado
          const { anemia_severa, anemia_moderada, anemia_leve, normal } = response.data;
          let filteredDiagnosticos = [];

          switch (selectedNivel) {
            case 1:
              filteredDiagnosticos = anemia_severa.diagnosticos.data;
              break;
            case 2:
              filteredDiagnosticos = anemia_leve.diagnosticos.data;
              break;
            case 3:
              filteredDiagnosticos = anemia_moderada.diagnosticos.data;
              break;
            case 4:
              filteredDiagnosticos = normal.diagnosticos.data;
              break;
            default:
              filteredDiagnosticos = [];
          }

          setDiagnosticos(filteredDiagnosticos);
        } catch (error) {
          console.error("Error fetching diagnosticos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDiagnosticos();
    }
  }, [pacienteId, selectedNivel]);

  const handleChangeNivel = (value: number) => {
    setSelectedNivel(value);
  };

  const columns = [
    {
      title: "Diagnóstico",
      dataIndex: "dx_anemia",
      key: "dx_anemia",
    },
    {
      title: "Peso (kg)",
      dataIndex: "peso",
      key: "peso",
    },
    {
      title: "Talla (cm)",
      dataIndex: "talla",
      key: "talla",
    },
    {
      title: "Hgb",
      dataIndex: "hemoglobina",
      key: "hemoglobina",
    },
    {
      title: "C",
      dataIndex: "cred",
      key: "cred",
      render: (cred: boolean) => (cred ? "Sí" : "No"),
    },
    {
      title: "S",
      dataIndex: "suplementacion",
      key: "suplementacion",
      render: (suplementacion: boolean) => (suplementacion ? "Sí" : "No"),
    },
  ];

  return (
    <Card title="Filtrar Diagnósticos por Nivel de Anemia" bordered={false}>
      <Select
        style={{ width: "100%", marginBottom: "16px" }}
        placeholder="Seleccionar nivel de anemia"
        onChange={handleChangeNivel}
        allowClear
      >
        {nivelesAnemia.map((nivel) => (
          <Option key={nivel.id} value={nivel.id}>
            {nivel.nivel}
          </Option>
        ))}
      </Select>
      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={diagnosticos}
          rowKey="id"
          pagination={{ pageSize: 4 }} // Configura la paginación para mostrar 4 registros por página
        />
      )}
    </Card>
  );
};

export default FiltroDiagnostico;
