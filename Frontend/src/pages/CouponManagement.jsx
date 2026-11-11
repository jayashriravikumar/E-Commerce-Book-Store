import { useEffect, useState } from "react";
import axios from "axios";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
const [minimumOrderAmount, setMinimumOrderAmount] = useState("");
const [usageLimit, setUsageLimit] = useState("");
const [maximumDiscount, setMaximumDiscount] = useState("");
  const [active, setActive] = useState(true);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/coupons");
      setCoupons(data.coupons);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const createCoupon = async () => {
     console.log("Create Coupon button clicked");
  try {
    await axios.post("/api/v1/coupon/create", {
      code,
      discount,
      active,
        expiryDate,
  minimumOrderAmount,
  usageLimit,
  maximumDiscount
    });

    setShowModal(false);

    setCode("");
    setDiscount("");
    setActive(true);

    fetchCoupons();
  } catch (error) {
  console.error("Axios Error:", error);
  console.error("Response:", error.response);
  console.error("Response Data:", error.response?.data);
}
};

  useEffect(() => {
    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading Coupon Management...
      </div>
    );
  }

  const updateCoupon = async () => {
  try {
    await axios.put(`/api/v1/admin/coupon/${editingCoupon._id}`, {
      code,
      discount,
      active,
       expiryDate,
  minimumOrderAmount,
  usageLimit,
  maximumDiscount
    });

    setShowModal(false);

    setEditingCoupon(null);

    setCode("");
    setDiscount("");
    setActive(true);

    fetchCoupons();
  } catch (error) {
    console.error(error);
  }
};

  const deleteCoupon = async () => {
  try {
    await axios.delete(`/api/v1/admin/coupon/${selectedCoupon._id}`);

    setShowDeleteModal(false);
    setSelectedCoupon(null);

    fetchCoupons();
  } catch (error) {
    console.error(error);
  }
};

return (
  <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-3 md:px-6">

    <div className="max-w-6xl mx-auto">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Coupon Management
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="
w-full
md:w-auto
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-3
rounded-lg
transition
font-semibold
"
        >
          + Create Coupon
        </button>
      </div>

      {coupons.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          No coupons available.
        </div>
      ) : (
        <div className="space-y-4">
  {coupons.map((coupon) => (
    <div
      key={coupon._id}
      className="
bg-white
rounded-xl
shadow-md
p-5
flex
flex-col
md:flex-row
justify-between
md:items-center
gap-5
hover:shadow-lg
transition
"
    >
      <div className="w-full">
  <h2 className="text-xl font-bold">
    {coupon.code}
  </h2>

  <p className="text-gray-600">
    <strong>Discount:</strong> {coupon.discount}%
  </p>

  <p className="text-gray-600">
    <strong>Expiry:</strong>{" "}
    {coupon.expiryDate
      ? new Date(coupon.expiryDate).toLocaleDateString()
      : "Not Set"}
  </p>

  <p className="text-gray-600">
    <strong>Minimum Order:</strong> ₹
    {coupon.minimumOrderAmount ?? 0}
  </p>

  <p className="text-gray-600">
    <strong>Usage:</strong>{" "}
    {coupon.usedCount ?? 0} / {coupon.usageLimit ?? "Unlimited"}
  </p>

  <p className="text-gray-600">
    <strong>Maximum Discount:</strong> ₹
    {coupon.maximumDiscount ?? "Unlimited"}
  </p>

  <p
    className={`font-semibold ${
      coupon.active ? "text-green-600" : "text-red-600"
    }`}
  >
    {coupon.active ? "Active" : "Inactive"}
  </p>
</div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

  <button
  onClick={() => {
  setEditingCoupon(coupon);

  setCode(coupon.code);
  setDiscount(coupon.discount);
  setActive(coupon.active);

  setExpiryDate(
    coupon.expiryDate
      ? new Date(coupon.expiryDate).toISOString().split("T")[0]
      : ""
  );

  setMinimumOrderAmount(coupon.minimumOrderAmount || "");
  setUsageLimit(coupon.usageLimit || "");
  setMaximumDiscount(coupon.maximumDiscount || "");

  setShowModal(true);
}}
  className="
w-full
md:w-auto
bg-yellow-500
hover:bg-yellow-600
text-white
px-4
py-3
rounded-lg
font-medium
"
    >
    Edit
    </button>

  <button
  onClick={() => {
  setSelectedCoupon(coupon);
  setShowDeleteModal(true);
}}
  className="
w-full
md:w-auto
bg-red-600
hover:bg-red-700
text-white
px-4
py-3
rounded-lg
font-medium
"
>
  Delete
</button>

</div>
    </div>
  ))}
</div>
      )}

    </div>

    {showModal && (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="
bg-white
rounded-xl
shadow-lg
p-5
w-[95%]
max-w-md
max-h-[90vh]
overflow-y-auto
">
          <h2 className="text-2xl font-bold mb-4">
            {editingCoupon ? "Edit Coupon" : "Create Coupon"}
            </h2>

          <div className="space-y-4">

  <div>
    <label className="block mb-1 font-medium">
      Coupon Code
    </label>

    <input
      type="text"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="w-full border rounded-lg p-2"
      placeholder="SAVE20"
    />
  </div>

  <div>
  <label className="block mb-1 font-medium">
    Discount (%)
  </label>

  <input
    type="number"
    value={discount}
    onChange={(e) => setDiscount(e.target.value)}
    className="w-full border rounded-lg p-2"
    placeholder="20"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Expiry Date
  </label>

  <input
    type="date"
    value={expiryDate}
    onChange={(e) => setExpiryDate(e.target.value)}
    className="w-full border rounded-lg p-2"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Minimum Order Amount (₹)
  </label>

  <input
    type="number"
    value={minimumOrderAmount}
    onChange={(e) => setMinimumOrderAmount(e.target.value)}
    className="w-full border rounded-lg p-2"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Usage Limit
  </label>

  <input
    type="number"
    value={usageLimit}
    onChange={(e) => setUsageLimit(e.target.value)}
    className="w-full border rounded-lg p-2"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Maximum Discount (₹)
  </label>

  <input
    type="number"
    value={maximumDiscount}
    onChange={(e) => setMaximumDiscount(e.target.value)}
    className="w-full border rounded-lg p-2"
  />
</div>



  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={active}
      onChange={(e) => setActive(e.target.checked)}
    />

    <label>Active Coupon</label>
  </div>

</div>

          <div className="flex justify-end gap-3 mt-6">
  <button
    onClick={() => setShowModal(false)}
    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
  >
    Cancel
  </button>

  <button
    onClick={editingCoupon ? updateCoupon : createCoupon}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    {editingCoupon ? "Update Coupon" : "Save Coupon"}
  </button>
</div>
        </div>
      </div>
    )}
    {showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="
bg-white
rounded-xl
shadow-xl
p-5
w-[95%]
max-w-md
">

      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Delete Coupon
      </h2>

      <p className="text-gray-700 mb-2">
        Are you sure you want to delete this coupon?
      </p>

      <div className="bg-gray-100 rounded-lg p-3 mb-6">
        <p className="font-bold">
          {selectedCoupon?.code}
        </p>

        <p className="text-gray-600">
          {selectedCoupon?.discount}% Discount
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedCoupon(null);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={deleteCoupon}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}

  </div>
);
};

export default CouponManagement;