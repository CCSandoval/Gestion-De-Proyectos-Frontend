import { gql } from "@apollo/client";

export const EDITAR_PROYECTO = gql`
  mutation EditarProyecto(
    $id: String!
    $nombre: String!
    $presupuesto: Float!
  ) {
    editarProyecto(_id: $id, nombre: $nombre, presupuesto: $presupuesto) {
      _id
    }
  }
`;

export const ACTIVAR_PROYECTO = gql`
  mutation ActivarProyecto($id: String!) {
    activarProyecto(_id: $id) {
      _id
    }
  }
`;
export const DESACTIVAR_PROYECTO = gql`
  mutation DesactivarProyecto($id: String!) {
    desactivarProyecto(_id: $id) {
      _id
    }
  }
`;

export const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $lider: String!) 
{
  crearProyecto(nombre: $nombre, presupuesto: $presupuesto, lider: $lider) 
  {
    _id
  }
}
`;