import { AuthenticationError } from "apollo-server-express";

export default {
  Query: {
    food: async (_, { id }, { models: { foodModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }

      const food = await foodModel.findById({ _id: id }).exec();
      return food;
    },
    foods: async (_, args, { models: { foodModel } }, info) => {
      //   if (!me) {
      //     throw new AuthenticationError("You are not authenticated");
      //   }
      const foods = await foodModel.find().exec();
      console.log("in foods");
      return foods;
    }
  },
  Mutation: {
    createFood: async (
      _,
      { title, description, price, amount, img },
      { models: { foodModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const food = await foodModel.create({
        title,
        description,
        price,
        amount,
        img,
        chef: me.id
      });
      return food;
    }
  },
  Food: {
    chef: async ({ chef }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: chef }).exec();
      return user;
    }
  }
  // User: {
  //   foods: async ({ food }, args, { models: { foodModel } }, info) => {
  //     const foodItem = await foodModel.findById({ _id: food.id }).exec();
  //     return foodItem;
  //   }
  // }
};
