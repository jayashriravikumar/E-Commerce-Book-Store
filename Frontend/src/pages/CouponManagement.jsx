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
  <div className="min-h-screen bg-gray-100 py-10">

    <div className="max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Coupon Management
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
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
      className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
    >
      <div>
        <h2 className="text-xl font-bold">
          {coupon.code}
        </h2>

        <p className="text-gray-600">
          Discount: {coupon.discount}%
        </p>

        <p
          className={`font-semibold ${
            coupon.active ? "text-green-600" : "text-red-600"
          }`}
        >
          {coupon.active ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="flex gap-3">

  <button
  onClick={() => {
    setEditingCoupon(coupon);

    setCode(coupon.code);
    setDiscount(coupon.discount);
    setActive(coupon.active);

    setShowModal(true);
  }}
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
    >
    Edit
    </button>

  <button
  onClick={() => {
  setSelectedCoupon(coupon);
  setShowDeleteModal(true);
}}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 w-96">
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
      Discount
    </label>

    <input
      type="number"
      value={discount}
      onChange={(e) => setDiscount(e.target.value)}
      className="w-full border rounded-lg p-2"
      placeholder="20"
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
    <div className="bg-white rounded-xl shadow-xl p-6 w-96">

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

      <div className="flex justify-end gap-3">
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