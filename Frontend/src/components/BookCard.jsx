export default function BookCard({ book, addToCart }) {
  return (
    <div className="border p-4 rounded shadow">
     <img
  src={book.image}
  alt={book.title}
  className="w-full h-60 object-cover rounded"
  onError={(e) => {
    e.target.src = "https://dummyimage.com/200x300/cccccc/000000&text=No+Cover";
  }}
/>

      <h2 className="font-bold mt-2">{book.title}</h2>

      <p className="text-gray-500 text-sm">{book.category}</p>

      {/* ✅ DESCRIPTION */}
      <p className="text-sm mt-1">{book.description}</p>

      {/* ✅ PRICE */}
      <p className="font-semibold mt-2">₹{book.price}</p>

      <button
        onClick={() => addToCart(book)}
        className="bg-black text-white px-3 py-1 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}