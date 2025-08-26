import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* const addressSchema = new mongoose.Schema({
  label: { type: String, required: true },         // e.g. “Home”, “Work”
  line1:  { type: String, required: true },
  line2:  { type: String },
  city:   { type: String, required: true },
  state:  { type: String, required: true },
  zip:    { type: String, required: true },
  country:{ type: String, required: true },
}, { _id: true });
*/


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: function () {
      return this.provider === "local";
      },
   },

    role: {
      type: String,
      enum: ["admin", "customer","user"],
      default: "customer",
    },
    dob: {
      type: Date,
    },
    gender:{
      type:String,
      enum:["male","female","other"],
      default:"male"
    },
    phone:{
      type:String,
    },
    cardNumber: { 
      type: String,
       default: "1234-5678-ABCD"
    },
    /*address: {
      type:String,
  },*/
  addresses: [
  {
   _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // ensure unique _id
    label: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    default: { 
      type: Boolean, 
      default: false 
    },
  }
],

membership: {
  level: { type: String, default: "Basic" }, // Basic, Plus, Pro
  startDate: { type: Date },
  endDate: { type: Date },
  isActive: { type: Boolean, default: false }
},

strava: {
  access_token: String,
  refresh_token: String,
  expires_at: Number,
  athlete: Object,
},


cart: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }
],
  },
  {
    timestamps: true,
  },
  );

  // 🔐 Hash password before saving (only if modified)
//userSchema.pre("save", async function (next) {
  //if (!this.isModified("password")) return next();
  //const salt = await bcrypt.genSalt(10);
  //this.password = await bcrypt.hash(this.password, salt);
 // next();
//});

// 🔍 Match input password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
