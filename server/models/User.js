const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },
    scripts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Script" }],
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.isNew && this.password !== this["confirmPassword"]) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  if (this.isNew)
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  else next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserSchema, UserModel };
