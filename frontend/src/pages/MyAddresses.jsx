/*
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@headlessui/react";

export default function MyAddresses() {
  const [addresses, setAddresses] = useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    label: "",
    line1: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const openAddForm = () => {
    setIsEditMode(false);
    setFormData({
      label: "",
      line1: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
    setIsDrawerOpen(true);
  };

  const openEditForm = (address) => {
    setIsEditMode(true);
    setEditId(address.id);
    setFormData({ ...address });
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      const updatedAddresses = addresses.map((addr) =>
        addr.id === editId ? { ...formData, id: editId } : addr
      );
      setAddresses(updatedAddresses);
    } else {
      const newAddress = {
        id: Date.now(),
        ...formData,
      };
      setAddresses([...addresses, newAddress]);
    }

    setFormData({
      label: "",
      line1: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
    setEditId(null);
    setIsEditMode(false);
    setIsDrawerOpen(false);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Your Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        // Add New Address Card 

        <div
          onClick={openAddForm}
          className="border-2 border-dashed border-gray-400 flex flex-col items-center justify-center p-8 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <div className="text-4xl">+</div>
          <div className="text-lg font-semibold mt-2">Add New Address</div>
        </div>

        // Address Cards 

        {addresses.map((addr) => (
          <div key={addr.id} className="border bg-white p-6 rounded relative shadow-sm">
            <p className="font-bold text-sm mb-1">{addr.label}</p>
            <p>{addr.line1}</p>
            {addr.address && <p>{addr.address}</p>}
            <p>
              {addr.city}, {addr.state} - {addr.postalCode}
            </p>
            <p>{addr.country}</p>
            <div className="absolute top-2 right-3 flex space-x-2">
              <button
                className="text-blue-600 underline text-sm"
                onClick={() => openEditForm(addr)}
              >
                Edit
              </button>
              <button
                className="text-red-500 underline text-sm"
                onClick={() => handleDelete(addr.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      // Drawer Sidebar for Add/Edit Address Form 

      <Dialog open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-lg overflow-y-auto">
          <Dialog.Title className="text-lg font-bold mb-4">
            {isEditMode ? "Edit Address" : "Add New Address"}
          </Dialog.Title>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              name="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="Label (e.g. Home)"
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="line1"
              value={formData.line1}
              onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
              placeholder="Address Line 1"
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Address Line 2"
              className="w-full border p-2 rounded"
            />
            <input
              name="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="City"
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="State"
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              placeholder="postalCode Code"
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Country"
              required
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setIsDrawerOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 text-white">
                {isEditMode ? "Update Address" : "Add Address"}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
*/




/*
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress, deleteUserAddress } from "../redux/authSlice";

export default function MyAddresses() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [form, setForm] = useState({
    label: "",
    line1: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUserAddress(form));
    setForm({ label: "", line1: "", address: "", city: "", state: "", postalCode: "", country: "" });
  };

  const handleDelete = (addressId) => {
    dispatch(deleteUserAddress(addressId));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">My Addresses</h2>

      // List addresses 

      {user?.addresses?.map((addr, index) => (
        <div key={index} className="border p-4 mb-3 rounded relative">
          <p><strong>{addr.label}</strong></p>
          <p>{addr.line1}</p>
          {addr.address && <p>{addr.address}</p>}
          <p>{addr.city}, {addr.state} - {addr.postalCode}</p>
          <p>{addr.country}</p>
          <button
            className="text-red-500 absolute top-2 right-2"
            onClick={() => handleDelete(addr._id)}
          >
            Delete
          </button>
        </div>
      ))}

      // Add address form 

      <form onSubmit={handleSubmit} className="space-y-3 mt-6">
        <input name="label" value={form.label} onChange={handleChange} placeholder="Label (e.g. Home)" className="w-full p-2 border rounded" required />
        <input name="line1" value={form.line1} onChange={handleChange} placeholder="Address Line 1" className="w-full p-2 border rounded" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address Line 2" className="w-full p-2 border rounded" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" required />
        <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-full p-2 border rounded" required />
        <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="postalCode Code" className="w-full p-2 border rounded" required />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="w-full p-2 border rounded" required />

        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Add Address
        </button>
      </form>
    </div>
  );
}
*/

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAddress,
  deleteUserAddress,
  fetchCurrentUser,
  setDefaultUserAddress,
  updateUserAddress,
} from "../redux/authSlice";

export default function MyAddresses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const addresses = user?.addresses || [];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [refresh, setRefresh] = useState(false);


  const initialFormState = {
    label: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    default: false,
    _id: null,
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const openAddForm = () => {
    setIsEditMode(false);
    setFormData(initialFormState);
    setIsDrawerOpen(true);
  };

  const openEditForm = (address) => {
    setIsEditMode(true);
    setFormData({ ...address });
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode && formData._id) {
        await dispatch(updateUserAddress(formData)).unwrap();
      } else {
        await dispatch(addUserAddress(formData)).unwrap();
      }

      setFormData(initialFormState);
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Failed to save address:", err);
      alert(err || "Failed to save address");
    }
  };

  const handleDelete = async (addressId) => {
    try {
      await dispatch(deleteUserAddress(addressId)).unwrap();
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  const handleSetDefault = async (addressId) => {
    console.log("Setting default for:", addressId);
    try {
      await dispatch(setDefaultUserAddress(addressId)).unwrap();
      await dispatch(fetchCurrentUser()); // 🔄 force fresh addresses from server
      setRefresh(prev => !prev);
      toast.success("Default address set successfully!");
    } catch (err) {
      console.error("Failed to set default address:", err);
    }
  };

  // Remove duplicates by _id
  const uniqueAddresses = Array.from(
    new Map(addresses.map((a) => [a._id, a])).values()
  );

  console.log(user.addresses)
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Your Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={openAddForm}
          className="border-2 border-dashed border-gray-400 flex flex-col items-center justify-center p-8 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <div className="text-4xl">+</div>
          <div className="text-lg font-semibold mt-2">Add New Address</div>
        </div>

        {uniqueAddresses.map((addr) => (
          <div key={addr._id} className="border bg-white p-6 rounded relative shadow-sm">
            <p className="font-bold text-sm mb-1 flex items-center gap-2">
              {addr.label}
              {addr.default && (
                <span className="text-xs font-medium text-white bg-indigo-500 px-2 py-0.5 rounded">
                  Default Address
                </span>
              )}
            </p>
            <p>{addr.line1}</p>
            {addr.line2 && <p>{addr.line2}</p>}
            <p>
              {addr.city}, {addr.state} - {addr.zip}
            </p>
            <p>{addr.country}</p>

            {!addr.default && (
              <button
                onClick={() => handleSetDefault(addr._id)}
                className="mt-3 text-xs text-indigo-600 underline"
                
              >
                Set as Default
              </button>
            )}

            <div className="absolute top-2 right-3 flex space-x-2">
              <button
                className="text-blue-600 underline text-sm"
                onClick={() => openEditForm(addr)}
              >
                Edit
              </button>
              <button
                className="text-red-500 underline text-sm"
                onClick={() => handleDelete(addr._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-lg overflow-y-auto">
          <Dialog.Title className="text-lg font-bold mb-4">
            {isEditMode ? "Edit Address" : "Add New Address"}
          </Dialog.Title>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {["label", "line1", "line2", "city", "state", "zip", "country"].map(
              (field) => (
                <input
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  placeholder={
                    field.charAt(0).toUpperCase() + field.slice(1).replace(/1/, " 1").replace(/2/, " 2")
                  }
                  required={field !== "line2"}
                  className="w-full border p-2 rounded"
                />
              )
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="default"
                checked={formData.default}
                onChange={(e) =>
                  setFormData({ ...formData, default: e.target.checked })
                }
                className="accent-indigo-600"
              />
              <label htmlFor="default" className="text-sm">
                Mark as Default
              </label>
            </div>

            <div className="flex justify-between mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDrawerOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 text-white">
                {isEditMode ? "Update Address" : "Add Address"}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

