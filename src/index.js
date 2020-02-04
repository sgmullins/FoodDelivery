require("dotenv").config();

import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import connectDB from "./bin/db";
import schemas from "./schemas";
import resolvers from "./resolvers";

import userModel from "./models/userModel";
import foodModel from "./models/foodModel";
import purchasedModel from "./models/purchasedModel";

const app = express();
app.use(cors());

const getUser = async req => {
  const token = req.headers["token"];

  if (token) {
    try {
      return await jwt.verify(token, "cantcrackthis");
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
        models: {
          userModel,
          foodModel,
          purchasedModel
        }
      };
    }
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(4040, () => {
  connectDB();
  console.log(`🚀 Server ready at port 4040`);
});
