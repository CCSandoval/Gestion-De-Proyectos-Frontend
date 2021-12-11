import { gql } from "@apollo/client";

const ACEPTAR_USUARIO = gql`
mutation AceptarUsuario($id: String!) {
    aceptarUsuario(_id: $id) {
      estado
    }
  }
`;
const RECHAZAR_USUARIO = gql`
mutation RechazarUsuario($id: String!) {
    rechazarUsuario(_id: $id) {
      estado
    }
  }
`;

export{ACEPTAR_USUARIO,RECHAZAR_USUARIO};
