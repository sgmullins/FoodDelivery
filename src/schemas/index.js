import userSchema from "./userSchema";
import foodSchema from "./foodSchema";
import purchasedSchema from "./purchasedSchema";
import { gql } from "apollo-server-express";

//linkSchema doc https://www.apollographql.com/docs/apollo-server/features/schema-stitching/
//allows us to 'stitch' together multiple api calls using the query name
//may be outdated now, this is a bit of a hack...
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, foodSchema, purchasedSchema];
