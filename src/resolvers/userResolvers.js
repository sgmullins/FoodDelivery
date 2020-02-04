import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

export default {
  Query: {
    user: async (
      parent,
      { name },
      { models: { userModel, foodModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const user = await userModel.findOne({ name });
      const foods = await foodModel.find({ chef: user.id });
      user.foods = [...foods];
      return user;
    },
    login: async (
      parent,
      { name, password },
      { models: { userModel } },
      info
    ) => {
      const user = await userModel.findOne({ name }).exec();

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, "cantcrackthis", {
        expiresIn: "1d"
      });

      return {
        token
      };
    }
  },
  Mutation: {
    createUser: async (
      parent,
      { name, password, email },
      { models: { userModel } },
      info
    ) => {
      const user = await userModel.create({ name, password, email });
      return user;
    }
  }
  // User: {
  //   foods: async ({ user }, args, { models: { foodModel } }, info) => {
  //     const food = await foodModel.find({ chef: user.id }).exec();
  //     console.log("inuser");

  //     return food;
  //   }
  // },
};
