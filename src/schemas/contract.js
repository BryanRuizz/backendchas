const { gql } = require('apollo-server');

const contractSchema = gql`
  type ContractUsage {
    usageType: String
    totalPoints: Int
  }

  type Query {
    availablePoints(ownerId: Int!): [ContractUsage]  # Define el tipo de retorno de la consulta
  }
`;

module.exports = contractSchema;
