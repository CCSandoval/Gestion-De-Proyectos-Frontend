import { gql } from "@apollo/client";

export const CREAR_INSCRIPCION = gql`
  mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
    crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
      _id
    }
  }
`;

export const ACEPTAR_INSCRIPCION = gql`
  mutation AceptarInscripcion($aceptarInscripcionId: String!) {
    aceptarInscripcion(id: $aceptarInscripcionId) {
      _id
    }
  }
`;

export const RECHAZAR_INSCRIPCION = gql`
  mutation RechazarInscripcion($rechazarInscripcionId: String!) {
    rechazarInscripcion(id: $rechazarInscripcionId) {
      _id
    }
  }
`;
