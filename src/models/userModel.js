import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food"
    }
  ]
  // purchases: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "purchased"
  //   }
  // ]
});

userSchema.pre("save", function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const user = mongoose.model("user", userSchema);

export default user;
