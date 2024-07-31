import React from 'react';
import CountInput from './InputNumber';

const variablesDiet = ['Verduras','Carnes rojas','Aves','Huevos','Pescado','Leche','Menestra','Bebidas Azucaradas','Embutidos','Frituras','Azucar', 'Frutas','Desayuno','Almuerzo','Cena'];

const FormDieta = () => {
    return (
        <div className="bg-white">
            <h1 className="font-medium font-sans text-xl px-4 pt-4">Ingresa datos de la frecuencia de consumo de la dieta alimenticia</h1>
            <p className="px-4">
                En este formulario, podrás ingresar la frecuencia con la que consumes diferentes tipos de alimentos y bebidas. Esta información nos ayudará a entender mejor tus hábitos alimenticios y a ofrecerte recomendaciones más personalizadas para mejorar tu dieta. Por favor, completa todos los campos con la mayor precisión posible.
            </p>
            <div className="grid xl:grid-cols-4 sm:grid-cols-3 mt-4 p-3">
                {variablesDiet.map((variable, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                        <h4 className="mt-2 font-sans text-sm font-semibold">Frecuencia de {variable}:</h4>
                        <CountInput />
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-center m-3'>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Consultar</button>
            </div>
        </div>
    );
}

export default FormDieta;
