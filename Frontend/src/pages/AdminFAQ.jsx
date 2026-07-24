import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "Orders",
  });

  const fetchFAQs = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/faqs");
      if (data.success) setFaqs(data.faqs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addFAQ = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/admin/faqs", form);

      if (data.success) {
        alert("FAQ Added");

        setForm({
          question: "",
          answer: "",
          category: "Orders",
        });

        fetchFAQs();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFAQ = async (id) => {
    if (!window.confirm("Delete FAQ?")) return;

    try {
      await axios.delete(`/api/v1/admin/faqs/${id}`);
      fetchFAQs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">

      <h2 className="text-3xl font-bold mb-8">
  FAQ Management
</h2>

      <form
  onSubmit={addFAQ}
  className="bg-white rounded-xl shadow-md p-6 mb-8 space-y-4"
>

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Question"
          name="question"
          value={form.question}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full border rounded-lg p-3"
          placeholder="Answer"
          rows="4"
          name="answer"
          value={form.answer}
          onChange={handleChange}
          required
        />

        <select
          className="w-full border rounded-lg p-3"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option>Orders</option>
          <option>Payment</option>
          <option>Shipping</option>
          <option>Returns</option>
          <option>Support</option>
          <option>Account</option>
        </select>

        <button
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
>
          Add FAQ
        </button>

      </form>

     

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">

<table className="w-full">

        <thead className="bg-gray-100">
          <tr className="text-left">
            <th>Question</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {faqs.map((faq) => (
           <tr
  key={faq._id}
  className="border-b hover:bg-gray-50 transition"
>

              <td>{faq.question}</td>

              <td>{faq.category}</td>

              <td>
                <button
className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => deleteFAQ(faq._id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>
      </div>
      <div className="md:hidden space-y-4">

  {faqs.map((faq) => (

    <div
      key={faq._id}
      className="bg-white rounded-xl shadow-md p-5"
    >

      <h2 className="font-bold text-lg">
        {faq.question}
      </h2>

      <p className="text-gray-600 mt-3">
        {faq.answer}
      </p>

      <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        {faq.category}
      </span>

      <button
        onClick={() => deleteFAQ(faq._id)}
        className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
      >
        Delete
      </button>

    </div>

  ))}

</div>

    </div>
  );
};

export default AdminFAQ;