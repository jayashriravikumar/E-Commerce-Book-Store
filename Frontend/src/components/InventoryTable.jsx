import React from "react";
import "./InventoryTable.css";

const InventoryTable = ({ products = [], updateStock }) => {
  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        text: "Out of Stock",
        className: "status-red",
      };
    }

    if (stock <= 5) {
      return {
        text: "Low Stock",
        className: "status-yellow",
      };
    }

    return {
      text: "In Stock",
      className: "status-green",
    };
  };

  return (
    <div className="inventory-table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Controls</th>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-products">
                No products available.
              </td>
            </tr>
          ) : (
            products.map((product) => {
              const stock = product.stock ?? 0;
              const { text, className } = getStockStatus(stock);

              return (
                <tr key={product._id}>
                  <td>
                    <div className="stock-controls">
                      <button
                        className="stock-btn"
                        onClick={() => updateStock(product._id, stock + 1)}
                      >
                        +
                      </button>

                      <span className="stock-number">{stock}</span>

                      <button
                        className="stock-btn"
                        disabled={stock === 0}
                        onClick={() => updateStock(product._id, stock - 1)}
                      >
                        −
                      </button>
                    </div>
                  </td>

                  <td>{product.title || product.name}</td>

                  <td>₹{product.price}</td>

                  <td>{stock}</td>

                  <td>
                    <span className={`status-badge ${className}`}>
                      {text}
                    </span>
                  </td>

                  <td>{product.category}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;