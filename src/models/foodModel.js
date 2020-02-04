import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: false
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const food = mongoose.model("food", foodSchema);

export default food;
