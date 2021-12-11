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
export const GET_PROYECTO = gql`
  query Proyecto($id: String!) {
    Proyecto(_id: $id) {
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
      usuarios {
        nombres
        apellidos
      }
      inscripciones {
        _id
        estado
        estudiante {
          nombres
          apellidos
        }
        fechaInscripcion
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

export const GET_PROYECTOS_ESTUDIANTE = gql`
  query ProyectosPorUsuario($id: String!) {
    proyectosPorUsuario(_id: $id) {
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
