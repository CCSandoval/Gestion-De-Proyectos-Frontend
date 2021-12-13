import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from 'context/userContext';



const NuevoProyecto = () => {

  const {userData} =  useUser();
  const { form, formData, updateFormData } = useFormData(null);

  const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREAR_PROYECTO);

  const [objetivoGeneral , setobjetivoGeneral] = useState("");
  const [objetivoEspecifico , setobjetivoEspecifico] = useState("");
  const [objectivosGenerales , setObjetivosGenerales] = useState([]);
  const [objectivosEspecificos , setObjetivosEspecificos] = useState([]);

  

  const submitForm = (e) => {
    e.preventDefault();

    delete formData.presupuesto;
    if(objectivosEspecificos.length === 0 || objectivosGenerales.length === 0){
      toast.error("Ingrese los objetivos")
    }else{
      crearProyecto({
        variables: { ...formData, presupuesto: presupuesto, lider: userData._id, generales: objectivosGenerales, especificos: objectivosEspecificos },
      })
    }
  };   
  

  const [presupuesto, setPresupuesto] = useState(0);

  useEffect(() => {
    if (mutationData) {
      toast.success('proyecto creado satisfactoriamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error creando el proyecto');
    }
  }, [mutationError]);



    return (
        <div className="block text-center">
        <h2 className="text-5xl py-4">CREAR NUEVO PROYECTO</h2>
        <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}>
          <input type="text" 
          className="py-2 px-2 w-60 border border-gray-500"
          placeholder="Ingrese el nombre del proyecto"
          name="nombre"/>

          <br />
          <input type="number" onChange={(e)=>{setPresupuesto(parseFloat(e.target.value))}} 
          className="py-2 px-2 w-80 mt-4 border border-gray-500 " 
          placeholder="Ingrese el presupuesto del proyecto" 
          name= "presupuesto"/>
          
          
          <h3 className=" text-3xl mt-5">Objetivos del proyecto</h3>
          <div className=" flex justify-between mt-4 w-2/4 mx-auto">
            
            <div className="border border-gray-400 w-full">
              <p className="pt-2 text-xl">Generales</p>
              <div> 

                <input className="border border-gray-500 rounded py-2 pl-2" placeholder = "Ingrese un objetivo"
                onChange = {(e)=>{setobjetivoGeneral(e.target.value)}}></input>
                <i className="bi bi-check-circle-fill text-green-500 text-2xl cursor-pointer mx-auto my-4 pl-4 pr-2 inline-block" 
                onClick = {()=>{setObjetivosGenerales([...objectivosGenerales,objetivoGeneral])}}></i>

              </div>
              <ul name="comment" className="border border-gray-500 mt-2 pl-8 pb-12 m-10"  name="ObjetivosGenerales">
              {objectivosGenerales.map((e)=>{return <li>{e}</li>})} 
              </ul>            
            </div>

            <div className="border border-gray-400 w-full">
              <p className="pt-2 text-xl">Especificos</p>
              <div> 
                <input className="border border-gray-500 rounded py-2 pl-2" placeholder = "Ingrese un objetivo"
                onChange = {(e)=>{setobjetivoEspecifico(e.target.value)}}></input>
                <i className="bi bi-check-circle-fill text-green-500 text-2xl cursor-pointer mx-auto my-4 pl-4 pr-2 inline-block" 
                onClick = {()=>{setObjetivosEspecificos([...objectivosEspecificos,objetivoEspecifico])}}></i>
              </div>
              <ul name="comment" className="border border-gray-500 mt-2 pl-8 pb-12 m-10"  name="ObjetivosEspecificos" >
              {objectivosEspecificos.map((e)=>{return <li>{e}</li>})}
              </ul> 
            </div>
          </div>


          <div className="border border-gray-500 rounded w-40 mx-auto my-3 cursor-pointer bg-gray-100">
              <button className="cursor-pointer bg-none px-2">CREAR PROYECTO<i className="fas fa-plus-circle text-green-500 text-2xl cursor-pointer mt-1 mb-2 ml-1"></i>
          </button></div>
        </form>
      </div>
    )
}

export default NuevoProyecto
