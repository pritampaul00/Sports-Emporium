import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

    // 🔍 Add this log
  console.log("📥 Registering user:", {
    name,
    email,
    password,
    passwordLength: password.length,
  });

  const normalizedEmail = email.toLowerCase(); // ✅ normalize

  const userExists = await User.findOne({ email: normalizedEmail });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 🔒 Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: normalizedEmail, // ✅ use normalized email
    password: hashedPassword,
  });

  if (user) {
    createToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});



// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Normalize email to lowercase
const normalizedEmail = email.toLowerCase(); // ✅ normalize
console.log("Login attempt for:", normalizedEmail, "with password:", password);

const user = await User.findOne({ email: normalizedEmail });

if (user) {
  console.log("User found. Hashed password in DB:", user.password);

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch);

  if (isMatch) {
    const token = createToken(res, user._id);
    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } else {
    console.log("Password did not match.");
  }
} else {
  console.log("No user found with email:", normalizedEmail);
}

res.status(401);
throw new Error("Invalid email or password");
});
  




// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      phone: user.phone,
      role: user.role,
      cardNumber: user.cardNumber,
      addresses: user.addresses,
      cart: user.cart,
      membership: user.membership,
      stravaConnected: !!user.strava?.access_token, // ✅ This line is new
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private


export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = `${req.body.firstName} ${req.body.lastName}` || user.name;
    user.dob = req.body.dob || user.dob;
    user.gender = req.body.gender || user.gender;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        dob: updatedUser.dob,
        gender: updatedUser.gender,
        phone: updatedUser.phone,
        cardNumber: updatedUser.cardNumber, // if exists
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user password
// @route   PUT /api/users/update-password
// @access  Private
export const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { currentPassword, newPassword } = req.body;

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: "Password updated successfully" });
});

// @desc    Add a new address to user
// @route   POST /api/users/addresses
// @access  Private
export const addUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const newAddress = req.body;

  if (newAddress.default === true) {
    user.addresses.forEach((addr) => {
      addr.default = false;
    });
  }

  // Ensure Mongoose assigns a unique _id to the new address
  user.addresses.push({
    ...newAddress,
    _id: new mongoose.Types.ObjectId(), // 🔥 Ensure uniqueness
  });

  await user.save();

  const updatedUser = await User.findById(req.user._id); // Re-fetch fresh user

  res.status(201).json(updatedUser); // Return full updated user with addresses
});


// @desc    Set a specific address as default
// @route   PATCH /api/users/addresses/:id/default
// @access  Private
export const setDefaultAddress = async (req, res) => {
  const user = await User.findById(req.user._id);
  const id = req.params.id;

  if (!user) return res.status(404).json({ message: "User not found" });

  user.addresses.forEach((addr) => {
    addr.default = addr._id.toString() === id;
  });

await user.save();
const updatedUser = await User.findById(req.user._id);
res.status(200).json(updatedUser); 

};

// @desc    Update a user address
// @route   PUT /api/users/addresses/:id
// @access  Private
export const updateUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const id = req.params.id;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const address = user.addresses.id(id);
  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }

  // Update fields
  Object.assign(address, req.body);

  if (req.body.default === true) {
    user.addresses.forEach((addr) => {
      addr.default = addr._id.toString() === id;
    });
  }

  await user.save();

  const updatedUser = await User.findById(req.user._id).select("-password");
  res.status(200).json(updatedUser);
});


// @desc    Delete a user address
// @route   DELETE /api/users/addresses/:id
// @access  Private
export const deleteUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const addressId = req.params.id;

  const addressIndex = user.addresses.findIndex(
    (addr) => addr._id.toString() === addressId
  );

  if (addressIndex === -1) {
    res.status(404);
    throw new Error("Address not found");
  }

  user.addresses.splice(addressIndex, 1);
  await user.save();

  // Re-fetch fresh user with latest data, excluding password
  const updatedUser = await User.findById(req.user._id).select("-password");

  res.status(200).json(updatedUser);
});


// Update- cart
export const updateUserCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { cartItems } = req.body;

  if (!Array.isArray(cartItems)) {
    res.status(400);
    throw new Error("Invalid cart data");
  }

  user.cart = cartItems;
  await user.save();

  // Optionally return updated user without password
  const updatedUser = await User.findById(req.user._id)
    .select("-password")
    .populate("cart.productId");

  res.status(200).json({
    message: "Cart updated successfully",
    cart: updatedUser.cart,
  });
});

//Get-cart
export const getUserCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.productId");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ cart: user.cart });
});




// @desc    Admin - Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

// @desc    Admin - Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// @desc    Admin - Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Admin - Update user role
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
