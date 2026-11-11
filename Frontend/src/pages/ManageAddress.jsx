import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect } from "react";

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([]);

 useEffect(() => {
  fetchAddresses();
}, []);

const fetchAddresses = async () => {
  try {
    const { data } = await axios.get("/api/v1/addresses/me");

    if (data.success) {
      setAddresses(data.addresses);
    }
  } catch (error) {
    console.log(error);
  }
};

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    type: "Home",
  });

  // Paste the functions here 👇

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async () => {
  if (
    !form.fullName ||
    !form.phone ||
    !form.address ||
    !form.city ||
    !form.state ||
    !form.pincode
  ) {
    alert("Please fill all fields");
    return;
  }

  const payload = {
    fullName: form.fullName,
    phone: form.phone,
    addressLine1: form.address,
    addressLine2: "",
    city: form.city,
    state: form.state,
    pincode: form.pincode,
    country: form.country,
  };

  try {
    if (editingId) {
      await axios.put(`/api/v1/address/${editingId}`, payload);
    } else {
      await axios.post("/api/v1/address/new", payload);
    }

    fetchAddresses();

    setForm({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      type: "Home",
    });

    setEditingId(null);
    setShowForm(false);

  } catch (error) {
    console.log(error);
  }
};
    const deleteAddress = async (id) => {
  if (!window.confirm("Delete this address?")) return;

  try {
    await axios.delete(`/api/v1/address/${id}`);

    fetchAddresses();

  } catch (error) {
    console.log(error);
  }
};


    

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">

        <div className="max-w-5xl mx-auto px-4">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold">
              📍 Manage Addresses
            </h1>

           <button
  onClick={() => setShowForm(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
>
  + Add Address
</button>

          </div>

          {addresses.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-12 text-center">

              <h2 className="text-2xl font-semibold">
                No Address Found
              </h2>

              <p className="text-gray-500 mt-2">
                Add your first delivery address.
              </p>

            </div>

          ) : (

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {addresses.map((item) => (

    <div
      key={item._id}
      className="bg-white rounded-xl shadow border p-5"
    >

      <div className="flex justify-between items-center mb-3">

        <h2 className="font-bold text-lg">
          {item.fullName}
        </h2>

        <div className="flex gap-2">

  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
    {item.type}
  </span>

  

</div>

      </div>

      <p>{item.addressLine1}</p>

      <p className="mt-1">
        {item.city}, {item.state}
      </p>

      <p>{item.country}</p>

      <p className="font-semibold mt-2">
        {item.pincode}
      </p>

      <p className="text-blue-600 mt-2">
        📞 {item.phone}
      </p>

      <div className="flex gap-3 mt-5">

        <button
  onClick={() => {
    setEditingId(item._id);

setForm({
  fullName: item.fullName,
  phone: item.phone,
  address: item.addressLine1,
  city: item.city,
  state: item.state,
  pincode: item.pincode,
  country: item.country,
  type: "Home",
});

setShowForm(true);
    
  }}
  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
>
  Edit
</button>
        <button
  onClick={() => deleteAddress(item._id)}
  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
>
  Delete
</button>


      </div>

    </div>

  ))}

</div>

          )}

          {/* Add Address Modal */}

{showForm && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

  <div className="bg-white rounded-xl w-full max-w-2xl p-6">

    <h2 className="text-2xl font-bold mb-6">
  {editingId ? "Edit Address" : "Add New Address"}
</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        name="address"
        placeholder="House No / Street"
        value={form.address}
        onChange={handleChange}
        className="border rounded-lg p-3 md:col-span-2"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={form.pincode}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />
      <input
  type="text"
  name="country"
  placeholder="Country"
  value={form.country}
  onChange={handleChange}
  className="border rounded-lg p-3"
/>

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border rounded-lg p-3"
      >
        <option>Home</option>
        <option>Work</option>
      </select>

    </div>

    <div className="flex justify-end gap-3 mt-8">

      <button
        onClick={() => setShowForm(false)}
        className="bg-gray-500 text-white px-5 py-2 rounded-lg"
      >
        Cancel
      </button>

      <button
  onClick={saveAddress}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
>
  {editingId ? "Update Address" : "Save Address"}
</button>

    </div>

  </div>

</div>

)}

        </div>

      </div>

      <Footer />

    </>
  );
};

export default ManageAddress;