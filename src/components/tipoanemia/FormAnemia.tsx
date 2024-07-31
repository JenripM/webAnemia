import React from "react";
import { PROVINCIAS } from "../../../src/constants/Provincias";
import { DISTRITOS } from "../../../src/constants/Distritos";


const FormAnemia = () => {
    return (
        <>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full p-4 sm:w-1/2 xl:w-1/2">
          <div className="rounded-2xl bg-white p-4 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <span className="relative rounded-xl bg-blue-100 p-2">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 2447.6 2452.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipRule="evenodd" fillRule="evenodd">
                      <path
                        d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
                        fill="#36c5f0"
                      />
                      <path
                        d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
                        fill="#2eb67d"
                      />
                      <path
                        d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
                        fill="#ecb22e"
                      />
                      <path
                        d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
                        fill="#e01e5a"
                      />
                    </g>
                  </svg>
                </span>
                <div className="ml-2 flex flex-col">
                  <span className="font-bold text-black">
                    Prediccion Anemia
                  </span>
                  <span className="text-sm text-gray-500">
                    Ingresa los datos de tu paciente y obten una prediccion
                    sobre el nivel de anemia que presenta.
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <button className="rounded-full border border-gray-200 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    className="h-4 w-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                  >
                    <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" />
                  </svg>
                </button>
                <button className="text-gray-200">
                  <svg
                    width="25"
                    height="25"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1088 1248v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mb-6">
              <form action="">
                <div className="w-full">
                  <input
                    type="text"
                    className="block rounded-2xl bg-gray-200 py-1.5 pl-10 pr-4 leading-normal text-black opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-full"
                    placeholder="Nombre del Paciente"
                  />
                </div>
                <br />
                <div className="w-full">
                  <input
                    type="text"
                    className="block rounded-2xl bg-gray-200 py-1.5 pl-10 pr-4 leading-normal text-black opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-full"
                    placeholder="Apellidos del Paciente"
                  />
                </div>
                <br />
                <div className="w-full">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="">Genero: </label>
                    <div className="flex items-center">
                      <input
                        id="masculino"
                        type="radio"
                        name="genero"
                        value="masculino"
                        className="h-4 w-4"
                      />
                      <label htmlFor="masculino" className="ml-2 text-gray-700">
                        Masculino
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="femenino"
                        type="radio"
                        name="genero"
                        value="femenino"
                        className="h-4 w-4"
                      />
                      <label htmlFor="femenino" className="ml-2 text-gray-700">
                        Femenino
                      </label>
                    </div>
                  </div>
                </div>
                <br />

                <div className="w-full">
                  <input
                    type="text"
                    className="block rounded-2xl bg-gray-200 py-1.5 pl-10 pr-4 leading-normal text-black opacity-90  focus:outline-none  focus:ring-2 focus:ring-blue-500 "
                    placeholder="Edad en Meses"
                  />
                </div>

                <br />
                <div className="gap-2 lg:flex">
                  <input
                    type="text"
                    className="block rounded-2xl bg-gray-200 py-1.5 pl-10 pr-4 leading-normal text-black opacity-90  focus:outline-none  focus:ring-2 focus:ring-blue-500 "
                    placeholder="Peso (Kg)"
                  />
                  <br />
                  <input
                    type="text"
                    className="block rounded-2xl bg-gray-200 py-1.5 pl-10 pr-4 leading-normal text-black opacity-90  focus:outline-none  focus:ring-2 focus:ring-blue-500 "
                    placeholder="Talla (cm)"
                  />
                </div>
               
                <br />
                <div className="w-full">
                  <label htmlFor="provincia" className="text-gray-600">
                    Provincia:
                  </label>
                  <select
                    id="provincia"
                    className="block rounded-2xl bg-gray-200 px-4 py-1.5 leading-normal text-black opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-full"
                  >
                    {PROVINCIAS.map((provincia) => (
                      <option key={provincia.value} value={provincia.value}>
                        {provincia.label}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <div className="w-full">
                  <label htmlFor="distrito" className="text-gray-600">
                    Distrito:
                  </label>
                  <select
                    id="distrito"
                    className="block rounded-2xl bg-gray-200 px-4 py-1.5 leading-normal text-black opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-full"
                  >
                    {DISTRITOS.map((distritos) => (
                      <option key={distritos.value} value={distritos.value}>
                        {distritos.label}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-500 p-2 font-bold text-white"
                >
                  Predecir
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full p-4 sm:w-1/2 xl:w-1/2">
          <div className="rounded-2xl bg-white p-4 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Historial de Pacientes</h2>
              <table className="mt-4 min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Nombre
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Apellido
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Fecha de Nacimiento
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Genero
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Provincia
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Distrito
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* AquÃ­ se pueden agregar las filas de la tabla */}
                  {/* Ejemplo de fila */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">
                      
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default FormAnemia;
