import { AuthenticationError } from "apollo-server-express";

export default {
  Query: {
    purchased: async (_, args, { models: { purchasedModel }, me }) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const purchased = await purchasedModel.find().exec();
      return purchased;
    }
  },
  Mutation: {
    purchaseFood: async (_, { foodId }, { models: { purchasedModel }, me }) => {
      if (!me) {
        throw new AuthenticationError(
          "You are not authenticated to purcahse food"
        );
      }
      const purchased = await purchasedModel.create({
        food: foodId,
        purchaser: me.id
        // purchasedId: +Math.floor(Math.random() * 10)
      });
      console.log(foodId);
      console.log(me.id);
      return purchased;
      //   return {
      //     ...purchased,
      //     foodId: purchased.foodId,
      //     purchaserId: purchased.purchaserId,
      //     createdAt: purchased.createdAt
      //   };
    },
    cancelFood: async (
      _,
      { purchasedId },
      { models: { purchasedModel, foodModel }, me }
    ) => {
      if (!me) {
        throw new AuthenticationError(
          "You are not authenticated to Cancel food"
        );
      }
      console.log(purchasedId);

      const food = await purchasedModel.findById({ _id: purchasedId });
      const foodInfo = await foodModel.findById({ _id: food.food });

      console.log(foodInfo);
      await purchasedModel.deleteOne({ _id: purchasedId });
      return foodInfo;
    }
  },
  Purchased: {
    purchaser: async ({ purchaser }, args, { models: { userModel } }, info) => {
      console.log(purchaser);
      const user = await userModel.findById({ _id: purchaser }).exec();
      console.log(user);
      return user;
    },
    food: async ({ food }, args, { models: { foodModel }, info }) => {
      console.log(food);
      const item = await foodModel.findById({ _id: food }).exec();
      console.log(item);
      return item;
    }
  }
};
