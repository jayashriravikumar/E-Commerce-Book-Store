export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <h2>{item.title}</h2>
              <p>₹{item.price}</p>
            </div>
          ))}

          <h2 className="mt-4 font-bold">Total: ₹{total}</h2>
        </>
      )}
    </div>
  );
}