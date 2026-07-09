import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FAQManagement = () => {

    const [faqs, setFaqs] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("");

const [showModal, setShowModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);

const [editingFAQ, setEditingFAQ] = useState(null);
const [selectedFAQ, setSelectedFAQ] = useState(null);

const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [faqCategory, setFaqCategory] = useState("Orders");

const fetchFAQs = async () => {
  try {
    setLoading(true);

    const { data } = await axios.get("/api/v1/faqs");

    if (data.success) {
      setFaqs(data.faqs);
    }

  } catch (error) {
    console.log(error);
    toast.error("Failed to load FAQs");
  } finally {
    setLoading(false);
  }
};

const createFAQ = async () => {
  try {

    const { data } = await axios.post("/api/v1/admin/faq", {
      question,
      answer,
      category: faqCategory,
    });

    if (data.success) {

      toast.success("FAQ Added");

      setShowModal(false);

      setQuestion("");
      setAnswer("");
      setFaqCategory("Orders");

      fetchFAQs();

    }

  } catch (error) {

    toast.error("Failed to add FAQ");

  }
};
const updateFAQ = async () => {

  try {

    const { data } = await axios.put(

      `/api/v1/admin/faq/${editingFAQ._id}`,

      {
        question,
        answer,
        category: faqCategory,
      }

    );

    if (data.success) {

      toast.success("FAQ Updated");

      setShowModal(false);

      setEditingFAQ(null);

      setQuestion("");
setAnswer("");
setFaqCategory("Orders");

      fetchFAQs();

    }

  } catch (error) {

    toast.error("Failed to update FAQ");

  }

};
const deleteFAQ = async () => {

  try {

    const { data } = await axios.delete(

      `/api/v1/admin/faq/${selectedFAQ._id}`

    );

    if (data.success) {

      toast.success("FAQ Deleted");

      setShowDeleteModal(false);

      setSelectedFAQ(null);
      setShowDeleteModal(false);

      fetchFAQs();

    }

  } catch (error) {

    toast.error("Delete Failed");

  }

};
useEffect(() => {
  fetchFAQs();
}, []);

const filteredFAQs = faqs.filter((faq) => {

  const matchesSearch =

    faq.question
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    faq.answer
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCategory =

    category === "" ||

    faq.category === category;

  return matchesSearch && matchesCategory;

});

return (

<div className="min-h-screen bg-gray-100 p-6">

{/* Dashboard Cards */}

<div className="max-w-7xl mx-auto">

<h1 className="text-3xl font-bold mb-8">
FAQ Management
</h1>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Total FAQs
    </p>

    <h2 className="text-3xl font-bold text-blue-600 mt-2">
      {faqs.length}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Categories
    </p>

    <h2 className="text-3xl font-bold text-green-600 mt-2">
      {new Set(faqs.map(f=>f.category)).size}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Orders FAQ
    </p>

    <h2 className="text-3xl font-bold text-orange-500 mt-2">
      {faqs.filter(f=>f.category==="Orders").length}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Payment FAQ
    </p>

    <h2 className="text-3xl font-bold text-purple-600 mt-2">
      {faqs.filter(f=>f.category==="Payment").length}
    </h2>
  </div>

</div>
<div className="flex flex-col md:flex-row gap-4 mb-8">

<input
type="text"
placeholder="Search FAQs..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="flex-1 border rounded-xl p-3"
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border rounded-xl p-3 md:w-56"
>

<option value="">All Categories</option>
<option value="Orders">Orders</option>
<option value="Payment">Payment</option>
<option value="Shipping">Shipping</option>
<option value="Returns">Returns</option>
<option value="Coupons">Coupons</option>
<option value="Books">Books</option>

</select>

<button

onClick={()=>{

setEditingFAQ(null);

setQuestion("");

setAnswer("");

setFaqCategory("Orders");

setShowModal(true);

}}

className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

>

+ Add FAQ

</button>

</div>
{loading ? (

<div className="text-center py-20">

<div className="flex justify-center items-center py-20">
    <h2 className="text-2xl font-semibold animate-pulse">
        Loading FAQs...
    </h2>
</div>

</div>

) : filteredFAQs.length===0 ? (

<div className="bg-white rounded-xl shadow p-10 text-center">

<h2 className="text-2xl font-bold">
<div className="text-center py-16">

<h2 className="text-2xl font-bold">
📭 No FAQs Found
</h2>

<p className="text-gray-500 mt-2">
Try another search or add a new FAQ.
</p>

</div>
</h2>

</div>

) : (

<>
{/* Desktop Table */}

<div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">

<table className="min-w-full">

<thead className="bg-gray-100">

<tr>

<th className="text-left p-4">Question</th>

<th className="text-left p-4">Category</th>

<th className="text-center p-4">Actions</th>

</tr>

</thead>

<tbody>

{filteredFAQs.map((faq)=>(

<tr
key={faq._id}
className="border-b hover:bg-blue-50 transition duration-200"
>

<td className="p-4 font-medium">

{faq.question}

</td>

<td className="p-4">

<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

{faq.category}

</span>

</td>

<td className="p-4">

<div className="flex justify-center gap-2">

<button
onClick={()=>{
setEditingFAQ(faq);

setQuestion(faq.question);

setAnswer(faq.answer);

setFaqCategory(faq.category);

setShowModal(true);

}}
className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
>

Edit

</button>

<button
onClick={()=>{
setSelectedFAQ(faq);

setShowDeleteModal(true);

}}
className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
>

Delete

</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* Mobile Cards */}

<div className="md:hidden space-y-4">

{filteredFAQs.map((faq)=>(

<div
key={faq._id}
className="bg-white rounded-xl shadow p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
>

<h2 className="font-bold text-lg">

{faq.question}

</h2>

<p className="text-gray-600 mt-3">

{faq.answer}

</p>

<div className="mt-4">

<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

{faq.category}

</span>

</div>

<div className="flex gap-2 mt-5">

<button
onClick={()=>{
setEditingFAQ(faq);

setQuestion(faq.question);

setAnswer(faq.answer);

setFaqCategory(faq.category);

setShowModal(true);

}}
className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
>

Edit

</button>

<button
onClick={()=>{
setSelectedFAQ(faq);

setShowDeleteModal(true);

}}
className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
>

Delete

</button>

</div>

</div>

))}

</div>
</>
)}

{showModal && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-[95%] md:w-[600px] p-6">

      <h2 className="text-2xl font-bold mb-6">
        {editingFAQ ? "Edit FAQ" : "Add FAQ"}
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block mb-2 font-semibold">
            Question
          </label>

          <input
            type="text"
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Answer
          </label>

          <textarea
            rows="5"
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Category
          </label>

          <select
            value={faqCategory}
            onChange={(e)=>setFaqCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Orders</option>
            <option>Payment</option>
            <option>Shipping</option>
            <option>Returns</option>
            <option>Coupons</option>
            <option>Books</option>
          </select>
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={()=>{
            setShowModal(false);
            setEditingFAQ(null);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={editingFAQ ? updateFAQ : createFAQ}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          {editingFAQ ? "Update FAQ" : "Save FAQ"}
        </button>

      </div>

    </div>

  </div>
)}

{showDeleteModal && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] md:w-[420px]">

      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Delete FAQ
      </h2>

      <p className="mb-4">
        Are you sure you want to delete this FAQ?
      </p>

      <div className="bg-gray-100 rounded-lg p-4 mb-6">

        <h3 className="font-semibold">
          {selectedFAQ?.question}
        </h3>

      </div>

      <div className="flex justify-end gap-3">

        <button
          onClick={()=>{
            setShowDeleteModal(false);
            setSelectedFAQ(null);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={deleteFAQ}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}
</div>
</div>

);

};

export default FAQManagement;