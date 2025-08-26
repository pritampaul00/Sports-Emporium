import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

// @desc    Get all products (with optional category, subcategory, brand filter, and sorting + pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const { category, subcategory, brand, sort } = req.query;

  const filter = {};

  // 🔍 Handle category filter by name → convert to ObjectId
  if (category) {
    const categoryDoc = await Category.findOne({ name: category });
    if (categoryDoc) {
      filter.category = categoryDoc._id;
    } else {
      // No matching category found
      return res.json({ products: [], page, pages: 0 });
    }
  }

  // ✅ Optional subcategory (string match)
  if (subcategory) {
    filter.subcategory = subcategory;
  }

  // ✅ Optional brand (string match)
  if (brand) {
    filter.brand = brand;
  }

  // ✅ Sorting
  let sortBy = { createdAt: -1 }; // Default: newest first
  if (sort === "priceAsc") {
    sortBy = { price: 1 };
  } else if (sort === "priceDesc") {
    sortBy = { price: -1 };
  }

  // Total matching products
  const count = await Product.countDocuments(filter);

  // Fetch products with filters, sorting, and pagination
  const products = await Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sortBy);

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category", "name");

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    subcategory,
    brand,
    countInStock,
    images,
  } = req.body;

  const product = new Product({
    name,
    description,
    price,
    category,
    subcategory: subcategory || "",
    brand,
    countInStock,
    images,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//Post get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.subcategory = req.body.subcategory || product.subcategory;
    product.brand = req.body.brand || product.brand;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.images = req.body.images || product.images;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Search products by name
// @route   GET /api/products/search?q=...
// @access  Public
export const searchProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.q;

  if (!keyword || typeof keyword !== "string" || !keyword.trim()) {
    res.status(400);
    throw new Error("Search query is required");
  }

  const products = await Product.find({
    name: { $regex: keyword.trim(), $options: "i" },
  })
    //.select("name _id")
    .limit(20);

  if (!products.length) {
    res.status(404);
    throw new Error("No products found");
  }

  res.json({ products });
});

// ✅ NEW: Get all available brands and subcategories for a given category
// @route   GET /api/products/filters?category=...
// @access  Public
export const getProductFilters = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = {};

  if (category) {
    const categoryDoc = await Category.findOne({ name: category });
    if (categoryDoc) {
      filter.category = categoryDoc._id;
    } else {
      return res.json({ brands: [], subcategories: [] });
    }
  }

  const products = await Product.find(filter).select("brand subcategory");

  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const subcategories = [...new Set(products.map((p) => p.subcategory).filter(Boolean))];

  res.json({ brands, subcategories });
});


// @desc    Get all unique brands from products
// @route   GET /api/products/brands
// @access  Public
export const getAllBrands = asyncHandler(async (req, res) => {
  const products = await Product.find().select("brand");
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  res.json(brands);
});



