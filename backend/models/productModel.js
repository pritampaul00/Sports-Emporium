import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: String, // Optional string, not a reference anymore
      required: false,
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;