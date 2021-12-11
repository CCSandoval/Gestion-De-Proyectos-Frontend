import { gql } from "@apollo/client";

export const CREAR_AVANCE = gql`
  mutation CrearAvance(
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      fecha
    }
  }
`;
