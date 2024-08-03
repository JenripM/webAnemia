import FormPaciente from "@/components/pacientes/FormPaciente";
import ListPacientes from "@/components/pacientes/ListPacientes";
import { PacientesContext, PacientesProvider } from '@/providers/pacientesContext';
import { useContext } from "react";
import { Alert } from "antd";


const boxStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 23,
    padding: 25,
    backgroundColor: 'white'
};

function Registro(){

    return <>
        <PacientesProvider>
            {/* {showSuccessAlert && (
                <Alert
                message="Patient registered successfully!"
                type="success"
                showIcon
                style={{ marginTop: 20 }}
                />
            )} */}
            <div style={boxStyle} 
            className="grid xs:grid-cols-1 md:grid-cols-2">
                <FormPaciente/>
                <ListPacientes/>
            </div>
        </PacientesProvider>
    </>
}

export default Registro;