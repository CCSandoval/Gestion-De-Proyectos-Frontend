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

export const EDITAR_AVANCE = gql`
  mutation EditarAvance($id: String!, $descripcion: String) {
    editarAvance(_id: $id, descripcion: $descripcion) {
      _id
      descripcion
    }
  }
`;
