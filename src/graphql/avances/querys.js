import { gql } from "@apollo/client";

export const GET_AVANCES = gql `
query AvancesPorProyecto($id: String!) {
  avancesPorProyecto(_id: $id) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
      nombre
    }
    creadoPor {
      _id
      nombres
    }
  }
}
`