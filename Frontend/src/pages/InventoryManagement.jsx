import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { getProduct } from "../features/products/productSlice";
import InventoryTable from "../components/InventoryTable";
import "./InventoryManagement.css";

const InventoryManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state) => state.product
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getProduct({}));
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    (product?.name || product?.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const updateStock = async (id, newStock) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/inventory/${id}/stock`,
        {
          stock: newStock,
        }
      );

      dispatch(getProduct({}));
    } catch (err) {
      console.error(err);
    }
  };

  const totalProducts = products.length;

  const lowStockProducts = products.filter(
    (p) => p.stock > 0 && p.stock <= 5
  ).length;

  const outOfStockProducts = products.filter(
    (p) => p.stock === 0
  ).length;

  return (
    <div className="inventory-page">

      {/* Header */}
      <div className="inventory-top">

        <div className="inventory-title">
          <h2>📦 Inventory Management</h2>
          <p>
            Monitor your bookstore inventory, update stock, and manage products.
          </p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => navigate("/admin/product/new")}
        >
          + Add Product
        </button>

      </div>

      {/* Search */}
      <div className="inventory-search">
        <input
          type="text"
          placeholder="🔍 Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Summary Cards */}

      <div className="inventory-cards">

        <div className="summary-card blue">
          <span>📚</span>
          <div>
            <h4>Total Products</h4>
            <h2>{totalProducts}</h2>
          </div>
        </div>

        <div className="summary-card yellow">
          <span>⚠️</span>
          <div>
            <h4>Low Stock</h4>
            <h2>{lowStockProducts}</h2>
          </div>
        </div>

        <div className="summary-card red">
          <span>❌</span>
          <div>
            <h4>Out of Stock</h4>
            <h2>{outOfStockProducts}</h2>
          </div>
        </div>

      </div>

      {/* Table */}

      <div className="inventory-table-card">

        {error ? (
          <p>{error}</p>
        ) : (
          <>
            {loading && (
              <div className="loading-text">
                Updating inventory...
              </div>
            )}

            <InventoryTable
              products={filteredProducts}
              updateStock={updateStock}
            />

            <div className="table-footer">
              Showing {filteredProducts.length} products
            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default InventoryManagement;