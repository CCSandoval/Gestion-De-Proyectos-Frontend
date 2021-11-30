import { gql } from "@apollo/client";

export const REGISTRO = gql`
  mutation registro(
    $correo: String!
    $nombres: String!
    $apellidos: String!
    $rol: Enum_UserRol!
    $password: String!
    $identificacion: String!
  ) {
    registro(
      correo: $correo
      nombres: $nombres
      apellidos: $apellidos
      rol: $rol
      password: $password
      identificacion: $identificacion
    ) {
      token
      error
    }
  }
`;

export const LOGIN = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
      error
    }
  }
`;

export const REFRESCAR_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;
