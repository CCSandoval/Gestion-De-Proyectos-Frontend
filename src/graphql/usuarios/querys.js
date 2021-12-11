import { gql } from "@apollo/client";

const GET_USUARIOS = gql`
query Usuarios {
    Usuarios {
      _id
      correo
      identificacion
      nombres
      apellidos
      estado
      rol
    }
  }
  `;

const GET_USUARIO = gql`
query Usuario($id: String!) {
    Usuario(_id: $id) {
      _id
      correo
      identificacion
      nombres
      apellidos
      estado
      rol
    }
  }
`;
export {GET_USUARIOS, GET_USUARIO};

