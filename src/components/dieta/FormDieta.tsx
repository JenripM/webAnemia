import React, { useState, useEffect } from 'react';
import CountInput from './InputNumber';
import { Select } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const { Option } = Select;

interface FormData {
  [key: string]: number;
}

const variablesDiet = [
  'Verduras',
  'Carnes rojas',
  'Aves',
  'Huevos',
  'Pescado',
  'Leche',
  'Menestra',
  'Bebidas Azucaradas',
  'Embutidos',
  'Frituras',
  'Azucar',
  'Frutas',
  'Desayuno',
  'Almuerzo',
  'Cena',
];

const url = 'https://apianemia.onrender.com';

const FormDieta = () => {
  const initialValues: FormData = variablesDiet.reduce((acc, variable) => {
    acc[variable] = 4;
    return acc;
  }, {} as FormData);

  const [pacientes, setPacientes] = useState<{ id: number; nombre: string }[]>([]);
  const [values, setValues] = useState<FormData>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPaciente, setSelectedPaciente] = useState<number | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPacientes = async () => {
      setLoading(true);
      try {
        if (session && session.idApoderado) {
          const response = await axios.get(`${url}/pacientes/apoderado/${session.idApoderado}`);
          console.log(response.data);
          setPacientes(response.data);
        }
      } catch (error) {
        console.error('Error fetching pacientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, [session]);

  const handleChange = (value: number | null, variable: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [variable]: value ?? 0,
    }));
  };

  const handlePacienteChange = (value: number | null) => {
    setSelectedPaciente(value ?? null);
  };

  const handleSubmit = () => {
    const formData = {
      pacienteId: selectedPaciente,
      ...values,
    };
    console.log(JSON.stringify(formData));
    // Enviar los valores a la ruta de tu backend
    // fetch('/tu-ruta-backend', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response: Response) => response.json())
    //   .then((data: any) => console.log(data))
    //   .catch((error: Error) => console.error(error));
  };

  return (
    <div className="bg-white">
      <h1 className="font-medium font-sans text-xl px-4 pt-4">
        Ingresa datos de la frecuencia de consumo de la dieta alimenticia
      </h1>
      <p className="px-4">
        En este formulario, podrás ingresar la frecuencia con la que consumes diferentes tipos de alimentos y bebidas. Esta información nos ayudará a entender mejor tus hábitos alimenticios y a ofrecerte recomendaciones más personalizadas para mejorar tu dieta. Por favor, completa todos los campos con la mayor precisión posible.
      </p>
      <div>
        <Select
          style={{ marginLeft: '12px' }}
          placeholder="Selecciona un paciente"
          loading={loading}
          onChange={handlePacienteChange}
          value={selectedPaciente ?? undefined} // Asegura que el valor esté controlado
        >
          {pacientes.map(paciente => (
            <Option key={paciente.id} value={paciente.id}>
              {paciente.nombre}
            </Option>
          ))}
        </Select>
      </div>
      <div className="grid xl:grid-cols-4 sm:grid-cols-3 mt-4 p-3">
        {variablesDiet.map((variable, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <h4 className="mt-2 font-sans text-sm font-semibold">
              Frecuencia de {variable}:
            </h4>
            <CountInput
              variable={variable}
              value={values[variable] || 0}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center m-3">
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleSubmit}
        >
          Consultar
        </button>
      </div>
    </div>
  );
};

export default FormDieta;
