import React, { useState, useEffect, useContext} from 'react';
import { Divider, List, Typography } from 'antd';
import axios from 'axios';
import { PacientesContext } from '@/providers/pacientesContext';


type Paciente = {
    id: number,
    codigo_cnv: string,
    dni: string,
    nombre: string,
    sexo: string,
    fecha_nacimiento: string,
    distrito: number
};

const boxStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 23,
    padding: 25,
};

const url = 'https://apianemia.onrender.com'


const App: React.FC = () => {
    const { pacientes, agregarPaciente} = useContext(PacientesContext);
    const [refreshPacientes, setRefreshPacientes] = useState([])
    
    useEffect(() => {
        // Función para obtener datos de la API
        const fetchPacientes = async () => {
          try {
            const response = await axios.get(`${url}/pacientes/apoderado/1`);
            setRefreshPacientes(response.data)
            //agregarPaciente(response.data);
          } catch (error) {
            console.error('Error fetching provincias:', error);
          }
        };
    
        fetchPacientes();
    }, [pacientes]);

    return(
    <>
        <div style={{padding: '25px'}}>
            <Divider orientation="left">Listado de pacientes:</Divider>
            <List
            size="small"
            bordered
            dataSource={refreshPacientes}
            renderItem={(item) => <List.Item>{item.nombre}</List.Item>}
            />
        </div>
    </>);
};

export default App;