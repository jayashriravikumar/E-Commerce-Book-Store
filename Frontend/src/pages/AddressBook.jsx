import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [defaultAddressId, setDefaultAddressId] =
  useState(localStorage.getItem("defaultAddressId") || "");
  const [loadingPincode, setLoadingPincode] = useState(false);
const [localities, setLocalities] = useState([]);


  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const fetchAddresses = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/addresses/me"
      );

      const data = await res.json();

      if (data.success) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

const handleChange = async (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

 if (name === "pincode" && value.length === 6) {
  setLoadingPincode(true);

  try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${value}`
      );

      const data = await response.json();

      if (
        data[0]?.Status === "Success" &&
        data[0]?.PostOffice?.length > 0
      ) {
        const postOffice = data[0].PostOffice[0];

        setLocalities(data[0].PostOffice);

        setFormData((prev) => ({
          ...prev,
          pincode: value,
          city: postOffice.District,
          state: postOffice.State,
          country: postOffice.Country,
        }));
        setLoadingPincode(false);
      }
    } catch (error) {
  console.log(error);
  setLoadingPincode(false);
}
  }
};

  const handleSubmit = async () => {

  const alreadyExists = addresses.some(
    (addr) =>
      addr.fullName === formData.fullName &&
      addr.phone === formData.phone &&
      addr.pincode === formData.pincode &&
      addr.addressLine1 === formData.addressLine1 &&
      addr._id !== editingId
  );

  if (alreadyExists) {
    alert("Address already exists");
    return;
  }

  try {
    if (editingId) {
      await axios.put(
        `http://localhost:8000/api/v1/address/${editingId}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:8000/api/v1/address/new",
        formData
      );
    }

    setFormData({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });

setEditingId(null);
setShowForm(false);

fetchAddresses();

window.scrollTo({
  top: 0,
  behavior: "smooth",
});
  } catch (error) {
    console.log(error);
  }
};

  const deleteAddress = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/address/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchAddresses();
      }
    } catch (error) {
      console.log(error);
    }
  };
    const editAddress = (address) => {
    setFormData({
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
    });

    setEditingId(address._id);
    setShowForm(true);
    };
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Address Book
          </h1>

          <button
            onClick={() => {
                setEditingId(null);

                setFormData({
                    fullName: "",
                    phone: "",
                    addressLine1: "",
                    addressLine2: "",
                    city: "",
                    state: "",
                    pincode: "",
                    country: "",
                });

                setShowForm(true);
                }}
            
            className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition hover:bg-blue-700"
            >
            ➕ Add Address
            </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="border rounded-xl p-3"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
                className="border rounded-xl p-3"
              />

              <input
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                type="text"
                placeholder="Address Line 1"
                className="border rounded-xl p-3"
              />

              <input
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                type="text"
                placeholder="Area / Locality"
                className="border rounded-xl p-3"
              />

             <input
                name="city"
                readOnly
                value={formData.city}
                onChange={handleChange}
                type="text"
                placeholder="City"
                className="border rounded-xl p-3 bg-gray-100"
                />
              <input
                name="state"
                readOnly
                value={formData.state}
                 placeholder="State"
                className="border rounded-xl p-3 bg-gray-100"
            

                />

              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                type="text"
                placeholder="Pincode"
                className="border rounded-xl p-3"
              />
              {loadingPincode && (
                <p className="text-blue-600 text-sm mt-1">
                    Fetching address...
                </p>
                )}
              <select
                className="border rounded-xl p-3"
                value={formData.addressLine2}
                onChange={(e) =>
                    setFormData((prev) => ({
                    ...prev,
                    addressLine2: e.target.value,
                    }))
                }
                >
                <option value="">
                    Select Area / Locality
                </option>

                {localities.map((loc) => (
                    <option key={loc.Name} value={loc.Name}>
                    {loc.Name}
                    </option>
                ))}
                </select>
                <input
                name="country"
                readOnly

                />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
              >
                {editingId ? "Update Address" : "Save Address"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="border px-6 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
          
        )}
        
        
        {addresses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              No Addresses Found
            </h2>

            <p className="text-gray-500">
              Add your first delivery address.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {address.fullName}
                  </h2>

                  <p>{address.phone}</p>

                  <p>{address.addressLine1}</p>

                  {address.addressLine2 && (
                    <p>{address.addressLine2}</p>
                  )}

                  <p>
                    {address.city}, {address.state}
                  </p>

                  <p>
                    {address.pincode}, {address.country}
                  </p>
                  {defaultAddressId === address._id && (
                <button
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    Deliver Here
                </button>
                )}
                </div>

          <div className="flex flex-col items-end gap-3">
  <label className="flex items-center gap-2 text-green-700 font-medium">
    <input
      type="radio"
      name="defaultAddress"
      checked={defaultAddressId === address._id}
      onChange={() => {
        setDefaultAddressId(address._id);
        localStorage.setItem(
          "defaultAddressId",
          address._id
        );
      }}
    />
    Default Address
  </label>

  <div className="flex gap-3">
    <button
      onClick={() => editAddress(address)}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg h-fit"
    >
      Edit
    </button>

    <button
      onClick={() => deleteAddress(address._id)}
      className="bg-red-500 text-white px-5 py-2 rounded-lg h-fit"
    >
      Delete
    </button>
  </div>
</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AddressBook;