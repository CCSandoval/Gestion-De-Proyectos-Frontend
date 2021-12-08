import { gql } from "@apollo/client";

export const CREAR_INSCRIPCION = gql`
  mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
    crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
      _id
    }
  }
`;
