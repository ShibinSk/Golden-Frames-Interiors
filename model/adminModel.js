const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  password: { type: String, required: true },
  access: { type: Boolean, required: true },
  testimonials: { type: String, required: false },
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;