import React, { useState } from 'react';

const AddAddressForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    label: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    default: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.line1 || !formData.city || !formData.zip) {
      return alert('Please fill in required fields');
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Add New Address</h2>
      <input name="label" value={formData.label} onChange={handleChange} placeholder="Label (e.g., Home, Office)" className="w-full p-2 border rounded" />
      <input name="line1" value={formData.line1} onChange={handleChange} placeholder="Address Line 1" className="w-full p-2 border rounded" required />
      <input name="line2" value={formData.line2} onChange={handleChange} placeholder="Address Line 2" className="w-full p-2 border rounded" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" required />
      <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full p-2 border rounded" />
      <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" className="w-full p-2 border rounded" required />
      <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full p-2 border rounded" />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="default"
          checked={formData.default}
          onChange={handleChange}
        />
        <label htmlFor="default">Set as default address</label>
      </div>

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Address</button>
      </div>
    </form>
  );
};

export default AddAddressForm;
