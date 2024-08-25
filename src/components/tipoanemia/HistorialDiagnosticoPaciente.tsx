import React, { useEffect, useState } from "react";
import { Card, Table, Spin } from "antd";
import axios from "axios";

const url = "http://127.0.0.1:8000";

const HistorialDiagnosticoPaciente: React.FC<{ pacienteId: string }> = ({ pacienteId }) => {
  const [diagnosticos, setDiagnosticos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (pacienteId) {
      const fetchDiagnosticos = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${url}/diagnosticos/estadisticas/paciente/${pacienteId}`);
          console.log("Diagnosticos fetched:", response.data); // Mensaje de depuración

          // Combinar los datos de todas las categorías
          const { anemia_severa, anemia_moderada, anemia_leve, normal } = response.data;
          const combinedDiagnosticos = [
            ...anemia_severa.diagnosticos.data,
            ...anemia_moderada.diagnosticos.data,
            ...anemia_leve.diagnosticos.data,
            ...normal.diagnosticos.data
          ];
          setDiagnosticos(combinedDiagnosticos);
        } catch (error) {
          console.error("Error fetching diagnosticos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDiagnosticos();
    }
  }, [pacienteId]);

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
    <Card title="Historial de Diagnósticos" bordered={false}>
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

export default HistorialDiagnosticoPaciente;
