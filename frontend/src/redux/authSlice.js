import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  user: null,
  loading: false,
  error: null,
  shippingAddress: null,
};

// Async Thunks

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const loginUser = ({ email, password }) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    localStorage.setItem("token", data.token);
    dispatch(setUser({ ...data.user, token: data.token }));
  } catch (err) {
    console.error("Login failed:", err.response?.data?.message || err.message);
    throw err;
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const { data } = await axios.get("/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const cartRes = await axios.get("/api/users/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setUser({ ...data.user, token }));
    dispatch({ type: "cart/setInitialCart", payload: cartRes.data.items });
  } catch (err) {
    console.error("Token invalid or expired", err.message);
    localStorage.removeItem("token");
  }
};

export const updateUserProfile = (formData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.put("/api/users/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(setUser({ ...data.user, token }));
  } catch (err) {
    console.error("Profile update failed:", err.response?.data?.message || err.message);
    throw err;
  }
};

export const changeUserPassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "/api/users/update-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to change password");
    }
  }
);

export const addUserAddress = createAsyncThunk(
  "auth/addAddress",
  async (address, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post("/api/users/addresses", address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data; // Updated user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add address");
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  "auth/updateAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { _id, ...rest } = addressData;

      const { data } = await axios.put(`/api/users/addresses/${_id}`, rest, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data; // Updated user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update address");
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "auth/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`/api/users/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data; // Updated user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete address");
    }
  }
);

export const setDefaultUserAddress = createAsyncThunk(
  "auth/setDefaultAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(`/api/users/addresses/${addressId}/default`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data; // Updated user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to set default address");
    }
  }
);


// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // ADD ADDRESS
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // UPDATE ADDRESS
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // DELETE ADDRESS
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // SET DEFAULT ADDRESS
      .addCase(setDefaultUserAddress.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser, logout, setShippingAddress } = authSlice.actions;
export default authSlice.reducer;
