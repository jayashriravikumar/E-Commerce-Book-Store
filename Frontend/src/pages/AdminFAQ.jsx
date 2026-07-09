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
      const { data } = await axios.get("/api/v1/faqs");
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
      const { data } = await axios.post("/api/v1/faqs", form);

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
      await axios.delete(`/api/v1/faqs/${id}`);
      fetchFAQs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">

      <h2>FAQ Management</h2>

      <form onSubmit={addFAQ}>

        <input
          className="form-control mb-3"
          placeholder="Question"
          name="question"
          value={form.question}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-3"
          placeholder="Answer"
          rows="4"
          name="answer"
          value={form.answer}
          onChange={handleChange}
          required
        />

        <select
          className="form-control mb-3"
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

        <button className="btn btn-primary">
          Add FAQ
        </button>

      </form>

      <hr />

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Question</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {faqs.map((faq) => (
            <tr key={faq._id}>

              <td>{faq.question}</td>

              <td>{faq.category}</td>

              <td>
                <button
                  className="btn btn-danger"
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
  );
};

export default AdminFAQ;