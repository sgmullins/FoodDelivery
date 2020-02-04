import { gql } from "apollo-server-express";

export default gql`
  type Food {
    id: ID!
    title: String!
    description: String!
    price: Float!
    amount: Int!
    img: String
    chef: User!
  }

  extend type Query {
    food(id: ID!): Food!
    foods: [Food!]!
  }

  extend type Mutation {
    createFood(
      title: String!
      description: String!
      price: Float!
      amount: Int!
      img: String
    ): Food!
  }
`;
