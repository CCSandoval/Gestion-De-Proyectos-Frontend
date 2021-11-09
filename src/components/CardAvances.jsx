import React from "react";

const CardAvances = ({id, fecha, ob, icono}) => {
  return (
    <div className="flex flex-col p-2 border-2 border-gray-500 m-5 rounded-lg">
      <div className="flex w-full justify-between p-2">
        <span>{`Id del avance: ${id}`}</span>
        <span>{`Fecha ${fecha}`}</span>
      </div>
      <div className="flex w-full justify-around">
        <div className='flex w-3/4 m-1 p-1'>
          <span>Aportes del Avance: </span>
          <p className='w-full'>
            Luctus phasellus tincidunt eleifend porta parturient non tortor
            dictumst, aliquet vestibulum himenaeos pulvinar ullamcorper euismod
            mollis vitae platea, conubia posuere cubilia feugiat habitant
            blandit pretium.
          </p>
        </div>
        <div className='flex flex-col justify-center items-center cursor-pointer'>
            <span className='text-xs'>Añadir Observación</span>
            <i className={`bi bi-${icono} w-1/2 text-5xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default CardAvances;
