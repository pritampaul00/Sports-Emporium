import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDefaultUserAddress, addUserAddress } from '@/redux/authSlice';
import AddAddressForm from './AddAdressForm';
import { selectUserAddresses } from '@/selectors/userSelectors';

const AddressSidebar = ({ isOpen, onClose, onSelect }) => {
  const addresses = useSelector(selectUserAddresses);
  const [selectedId, setSelectedId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    const selected = addresses.find((addr) => addr._id === selectedId);
    if (selected) {
      dispatch(setDefaultUserAddress(selected._id));
      onSelect(selected);
      onClose();
    }
  };

  const handleAddAddress = (newAddr) => {
    const id = Date.now().toString(); // Temporary ID if backend doesn't return one
    const fullAddress = { ...newAddr, _id: id };
    dispatch(addUserAddress(fullAddress));
    dispatch(setDefaultUserAddress(id));
    setSelectedId(id);
    onSelect(fullAddress);
    setShowAddForm(false);
    onClose();
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">Select Delivery Address</h2>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
        {showAddForm ? (
          <AddAddressForm
            onSave={handleAddAddress}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <>
            {addresses.map((addr) => (
              <label key={addr._id} className="block border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="address"
                  checked={selectedId === addr._id}
                  onChange={() => setSelectedId(addr._id)}
                  className="mr-2"
                />
                <span className="font-medium">{addr.label}</span><br />
                <span className="text-sm">{addr.line1}, {addr.city}, {addr.state} - {addr.zip}</span>
              </label>
            ))}
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full text-left text-blue-600 mt-2 underline"
            >
              + Add New Address
            </button>
          </>
        )}
      </div>
      {!showAddForm && (
        <div className="p-4 border-t">
          <button
            onClick={handleConfirm}
            disabled={!selectedId}
            className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
          >
            Confirm Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressSidebar;
