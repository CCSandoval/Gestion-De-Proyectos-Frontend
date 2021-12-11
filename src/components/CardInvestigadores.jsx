import React from "react";

const CardInvestigadores = ({apellidos, nombres}) => {
  return (
      <div className="flex justify-center p-2 m-5 border-2 border-gray-500 w-3/4 rounded-lg text-center">
        {`${nombres} ${apellidos}`}
      </div>
  );
};

export default CardInvestigadores;
