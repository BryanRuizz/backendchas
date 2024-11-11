const { gql } = require('apollo-server');

const ownerSchema = gql`
  type Owner {
    number: String
    fullName: String
    email: String
    roles: [Role]
  }

  type Role {
    description: String
    type: String
  }

  type Query {
    ownerProfile(email: String!, ownerNumber: String!): Owner
    allOwners: [Owner]  # Nueva consulta para obtener todos los owners
  }

  type Mutation {
    generateAccessToken(email: String!, ownerNumber: String!): String
  }
`;

module.exports = ownerSchema;
