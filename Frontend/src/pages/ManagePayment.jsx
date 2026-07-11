import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ManagePayment = () => {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    type: "Visa",
  });
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const saveCard = () => {
  if (
    !form.cardName ||
    !form.cardNumber ||
    !form.expiry ||
    !form.cvv
  ) {
    alert("Fill all fields");
    return;
  }

  if (editingId) {
    setCards((prev) =>
      prev.map((card) =>
        card.id === editingId
          ? { ...card, ...form }
          : card
      )
    );
  } else {
    setCards((prev) => [
      ...prev,
      {
        id: Date.now(),
        isDefault: prev.length === 0,
        ...form,
      },
    ]);
  }

  setEditingId(null);

  setForm({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    type: "Visa",
  });

  setShowForm(false);
};
const deleteCard = (id) => {
  if (!window.confirm("Delete this card?")) {
    return;
  }

  setCards((prev) =>
    prev.filter((card) => card.id !== id)
  );
};
const setDefaultCard = (id) => {
  setCards((prev) =>
    prev.map((card) => ({
      ...card,
      isDefault: card.id === id,
    }))
  );
};
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">

        <div className="max-w-5xl mx-auto px-4">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold">
              💳 Payment Methods
            </h1>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Card
            </button>

          </div>

          {cards.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-12 text-center">

              <h2 className="text-2xl font-semibold">
                No Cards Saved
              </h2>

              <p className="text-gray-500 mt-2">
                Add your debit or credit card.
              </p>

            </div>

          ) : (

            <div>
              <div className="grid md:grid-cols-2 gap-6">

  {cards.map((card) => (

    <div
      key={card.id}
      className="bg-white rounded-xl shadow border p-6"
    >

      <div className="flex justify-between">

        <div>

          <h2 className="font-bold text-xl">

            {card.type}

          </h2>

          <p className="text-gray-500">

            **** **** **** {card.cardNumber.slice(-4)}

          </p>

        </div>

        {card.isDefault && (

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

            Default

          </span>

        )}

      </div>

      <div className="mt-5">

        <p>

          <strong>Name:</strong> {card.cardName}

        </p>

        <p>

          <strong>Expiry:</strong> {card.expiry}

        </p>

      </div>

      <div className="flex gap-3 mt-6">

        <button
  onClick={() => {
    setEditingId(card.id);
    setForm({
      cardName: card.cardName,
      cardNumber: card.cardNumber,
      expiry: card.expiry,
      cvv: card.cvv,
      type: card.type,
    });
    setShowForm(true);
  }}
  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
>
  Edit
</button>

        <button
  onClick={() => deleteCard(card.id)}
  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
>
  Delete
</button>
{!card.isDefault && (

<button
  onClick={() => setDefaultCard(card.id)}
  className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
>
  Set as Default
</button>

)}

      </div>

    </div>

  ))}

</div>
            </div>

          )}

        </div>

      </div>
      {showForm && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

<div className="bg-white rounded-xl w-full max-w-xl p-6">

<h2 className="text-2xl font-bold mb-6">

{editingId ? "Edit Card" : "Add Card"}

</h2>

<div className="space-y-4">

<input
name="cardName"
placeholder="Card Holder Name"
value={form.cardName}
onChange={handleChange}
className="w-full border rounded-lg p-3"
/>

<input
name="cardNumber"
placeholder="Card Number"
value={form.cardNumber}
onChange={handleChange}
className="w-full border rounded-lg p-3"
/>

<div className="grid grid-cols-2 gap-4">

<input
name="expiry"
placeholder="MM/YY"
value={form.expiry}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="cvv"
placeholder="CVV"
value={form.cvv}
onChange={handleChange}
className="border rounded-lg p-3"
/>

</div>

<select
name="type"
value={form.type}
onChange={handleChange}
className="w-full border rounded-lg p-3"
>

<option>Visa</option>
<option>MasterCard</option>
<option>RuPay</option>

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
onClick={saveCard}
className="bg-blue-600 text-white px-5 py-2 rounded-lg"
>

Save Card

</button>


</div>


</div>

</div>

)}

      <Footer />
    </>
  );
};

export default ManagePayment;