import mongoose from "mongoose";

const purchasedSchema = new mongoose.Schema(
  {
    food: [
      //food
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food"
      }
    ],
    purchaser: [
      //user
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ]
    // purchasedId: [
    //   {
    //     type: Number,
    //     required: true
    //   }
    // ]
  },
  { timestamps: true }
);

const purchased = mongoose.model("purchased", purchasedSchema);

export default purchased;
