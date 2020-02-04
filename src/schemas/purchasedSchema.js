import { gql } from "apollo-server-express";

export default gql`
  scalar Date
  type Purchased {
    id: ID!
    food: Food!
    purchaser: User!
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    purchased: [Purchased!]!
  }

  extend type Mutation {
    purchaseFood(foodId: ID!): Purchased!
    cancelFood(purchasedId: ID!): Food!
  }
`;
