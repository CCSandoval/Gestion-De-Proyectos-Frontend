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

const EDITAR_USUARIO= gql `

mutation EditarUsuario($id: String!, $nombres: String!, $correo: String!, $identificacion: String!, $password: String!) {
  editarUsuario(_id: $id, nombres: $nombres, correo: $correo, identificacion: $identificacion, password: $password) {
    _id
    correo
    identificacion
    password
  }
}


`;


export{ACEPTAR_USUARIO,RECHAZAR_USUARIO,EDITAR_USUARIO};
