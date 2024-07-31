import React from "react";
import CountInput from "./InputNumber";

const variablesDiet = ["Verduras","Carnes rojas","Aves","Huevos","Pescado","Leche","Menestra","Bebidas Azucaradas","Embutidos","Frituras","Azucar", "Frutas","Desayuno","Almuerzo","Cena"];

const FormDieta = () => {
    return (
        <div className="bg-white">
            <h1 className="px-4 pt-4 font-sans text-xl font-medium">Ingresa datos de la frecuencia de consumo de la dieta alimenticia</h1>
            <p className="px-4">
                En este formulario, podrás ingresar la frecuencia con la que consumes diferentes tipos de alimentos y bebidas. Esta información nos ayudará a entender mejor tus hábitos alimenticios y a ofrecerte recomendaciones más personalizadas para mejorar tu dieta. Por favor, completa todos los campos con la mayor precisión posible.
            </p>
            <div className="mt-4 grid p-3 sm:grid-cols-3 xl:grid-cols-4">
                {variablesDiet.map((variable, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                        <h4 className="mt-2 font-sans text-sm font-semibold">Frecuencia de {variable}:</h4>
                        <CountInput />
                    </div>
                ))}
            </div>
            <div className='m-3 flex items-center justify-center'>
                <button type="button" className="mb-2 me-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Consultar</button>
            </div>
        </div>
    );
};

export default FormDieta;
