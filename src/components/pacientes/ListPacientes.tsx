import React, { useState, useEffect, useContext} from 'react';
import { Divider, List, Typography } from 'antd';
import axios from 'axios';
import { PacientesContext } from '@/providers/pacientesContext';
import { useSession } from 'next-auth/react';



const boxStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 23,
    padding: 25,
};

// const url = 'https://apianemia.onrender.com';
const url = 'http://127.0.0.1:8000/'


const App: React.FC = () => {
    
  const context = useContext(PacientesContext);

    // Manejar el caso en que el contexto es undefined
    if (!context) {
        return <div>Loading...</div>; // O cualquier otro mensaje o componente que indique que el contexto está cargando
    }
    const { pacientes } = context;
    const [refreshPacientes, setRefreshPacientes] = useState([])
    const { data: session, status } = useSession();


    useEffect(() => {
        // Función para obtener datos de la API
        const fetchPacientes = async () => {
          try {
            if (session && session.idApoderado) {
              const response = await axios.get(`${url}/pacientes/apoderado/${session.idApoderado}`);
              setRefreshPacientes(response.data)
            }
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