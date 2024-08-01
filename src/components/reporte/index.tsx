import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config";
import Chart from "./chart";
import { ReporteEvolucionMensual } from "@/types/Reporte";
import { useEffect, useState } from "react";
import Select from "../ui/select";
import { Meses } from "@/constants/fechas";

interface ContentProps {
  title: string;
}


export default function Reporte(props: ContentProps) {
  const [formattedData, setFormattedData] = useState<any>([]);
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  const fetchDepartamentos = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/diagnosticos/estadisticas/evolucion-mensual?${year ? `ano=${year}` : "" }${month ? `&mes=${month}` : ''}`);
      if(response.ok){
        const data = await response.json();
        return data
      }
      return [];
    } catch (error) {
      console.error("Error fetching departamentos:", error);
    }
  }

  const {data, isLoading, isError} = useQuery<ReporteEvolucionMensual[]>({
    queryKey: ["departamentos", year, month],
    queryFn: fetchDepartamentos,
  })

  useEffect(() => {
    if(data){
      setFormattedData(data.map((entry: ReporteEvolucionMensual) => ({
        date: entry.date,
        moderada: entry.moderada,
        severa: entry.severa,
        leve: entry.leve,
        normal: entry.normal,
        pronostico: entry.pronostico
      })));
    }
  },[data])


  return <div className="flex flex-col flex-wrap sm:flex-row">
    <div className="w-full rounded-2xl bg-white p-4 shadow-lg space-y-4">
        <h1 className="text-3xl font-bold text-black">Evolución de diagnósticos por mes y año en La Libertad</h1>
        <div className="flex flex-col sm:flex-row space-x-4">
        <Select
            /* Reduce to distinc years */ 
            data={
              [
                {
                  id: "2019",
                  label: "2019",
                },
                {
                  id: "2020",
                  label: "2020",
                },
                {
                  label: "2021",
                  id: "2021",
                },
                {
                  label: "2022",
                  id: "2022",
                },
                {
                  id: "2023",
                  label: "2023",
                },
                {
                  id: "2024",
                  label: "2024",
                }
              ]
            }
            id="año"
            selected={year?.toString() ?? ""}
            onChange={(value) => {
              setYear(Number(value));
            }}
            placeholder="Todos"
            label="Año"
          />
          <Select 
            data={Meses.map((mes) => {
              return {
                id: mes.id.toString(),
                label: mes.label,
              }
            })}
            id="mes"
            selected={month?.toString() ?? ""}
            onChange={(value) => {
              setMonth(Number(value));
            }}
            placeholder="Todos"
            label="Mes"
          />
        
        </div>
       <div className="h-[500px] w-full">
       <Chart data={formattedData ?? []} />
       </div>
    </div> 
  </div>;
}

export function constMockData(){
  return [
    {
      date: '2000-01',
      moderada: 4000,
      severa: 2400,
      leve: 2400,
      normal: 2100,
      pronostico: 600
    },
    {
      date: '2000-02',
      moderada: 3000,
      severa: 1398,
      leve: 2210,
      normal: 2100,
      pronostico: 900
    },
    {
      date: '2000-03',
      moderada: 2000,
      severa: 9800,
      leve: 2290,
      normal: 2100,
      pronostico: 1200
    },
    {
      date: '2000-04',
      moderada: 2780,
      severa: 3908,
      leve: 2000,
      normal: 2100,
      pronostico: 400
    },
    {
      date: '2000-05',
      moderada: 1890,
      severa: 4800,
      leve: 2181,
      normal: 2100,
      pronostico: 900
    },
    {
      date: '2000-06',
      moderada: 2390,
      severa: 3800,
      leve: 2500,
      normal: 2100,
      pronostico: 1200
    },
    {
      date: '2000-07',
      moderada: 3490,
      severa: 4300,
      leve: 2100,
      normal: 2100,
      pronostico: 1300
    },
    {
      date: '2000-08',
      moderada: 4000,
      severa: 2400,
      leve: 2400,
      normal: 2100,
      pronostico: 4000
    },
    {
      date: '2000-09',
      moderada: 3000,
      severa: 1398,
      leve: 2210,
      normal: 2100,
      pronostico: 6000
    },
    {
      date: '2000-10',
      moderada: 2000,
      severa: 9800,
      leve: 2290,
      normal: 2100,
      pronostico: 7000
    },
    {
      date: '2000-11',
      moderada: 2780,
      severa: 3908,
      leve: 2000,
      normal: 2100,
      pronostico: 8000
    },
    {
      date: '2000-12',
      moderada: 1890,
      severa: 4800,
      leve: 2181,
      normal: 2100,
      pronostico: 7500
    },
  ];
}