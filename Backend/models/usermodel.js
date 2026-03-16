import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength:[25,"Invalid name .Please enter a name fewer than 25 characters"],
      minLength:[3,"Name should contain more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  { timestamps: true },
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcryptjs.hash(this.password, 10);
});
export default mongoose.model("User", UserSchema);
