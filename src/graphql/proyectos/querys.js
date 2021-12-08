import { gql } from "@apollo/client";

export const GET_PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        nombres
        apellidos
      }
      objetivos {
        descripcion
        tipo
      }
    }
  }
`;

export const GET_PROYECTOS_LIDER = gql`
  query ProyectoFiltrado($id: String!) {
    proyectosLider(_id: $id) {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        nombres
        apellidos
      }
      objetivos {
        descripcion
        tipo
      }
    }
  }
`;
