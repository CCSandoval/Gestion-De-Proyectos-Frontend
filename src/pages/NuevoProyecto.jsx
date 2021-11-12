import React from 'react'

const NuevoProyecto = () => {
    return (
        <div className="block text-center">
        <h2 className="text-5xl py-4">CREAR NUEVO PROYECTO</h2>
        <form>
          <input type="text" className="py-2 px-2 w-60 border border-gray-500" placeholder="Ingrese el nombre del proyecto " />
          <br />
          <input type="text" className="py-2 px-2 w-80 mt-4 border border-gray-500 " placeholder="Ingrese el presupuesto del proyecto"/>
          
          
          <h3 className=" text-3xl mt-5">Objetivos del proyecto</h3>
          <div className=" flex justify-between mt-4 w-2/4 mx-auto">
            
            <div className="border border-gray-400">
              <p className="pt-2 text-xl">Generales</p>
              <label className="border border-gray-500 rounded py-2 pl-2">Ingrese un objetivo  <i className="bi bi-check-circle-fill text-green-500 text-2xl cursor-pointer mx-auto my-4 pl-4 pr-2 inline-block "></i></label>
              <textarea name="comment" className="border border-gray-500 mt-2 pl-8 pb-12">Escribe aqui...</textarea>
            
            </div>

            <div className="border border-gray-400">
              <p className="pt-2 text-xl">Especificos</p>
              <label className="border border-gray-500 rounded py-2 pl-2">Ingrese un objetivo  <i className="bi bi-check-circle-fill text-green-500 text-2xl cursor-pointer mx-auto my-4 pl-4 pr-2 inline-block"></i></label>
              <textarea name="comment" className="border border-gray-500 mt-2 pl-8 pb-12">Escribe aqui...</textarea>

            </div>

          </div>


          <div className="border border-gray-500 rounded w-40 mx-auto my-3 cursor-pointer bg-gray-100">
            <input type="button" value="Crear proyecto" className="cursor-pointer pr-2 bg-none" />
            <i className="fas fa-plus-circle text-green-500 text-2xl cursor-pointer mx-auto mt-1 mb-2"></i>
          </div>
     
          


        </form>
      </div>
    )
}

export default NuevoProyecto
