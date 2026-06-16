import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import FilterTag from "../components/FilterTag";
import ProductFilter from "../components/ProductFilter";
import ProductGrid from "../components/ProductGrid";
import BookImage from "../components/BookImage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const DEFAULT_LIMIT = 12;

const parseList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const getSearchState = (searchParams) => ({
  keyword: searchParams.get("keyword") || "",
  category: parseList(searchParams.get("category")),
  brand: parseList(searchParams.get("brand")),
  minPrice: searchParams.get("minPrice") || "",
  maxPrice: searchParams.get("maxPrice") || "",
  rating: searchParams.get("rating") || "",
  availability: searchParams.get("availability") || "",
  discount: searchParams.get("discount") || "",
  color: parseList(searchParams.get("color")),
  size: parseList(searchParams.get("size")),
  newArrivals: searchParams.get("newArrivals") === "true",
  bestSeller: searchParams.get("bestSeller") === "true",
  page: Number(searchParams.get("page") || 1),
});

const serializeState = (searchState) => {
  const params = new URLSearchParams();

  if (searchState.keyword) params.set("keyword", searchState.keyword);
  if (searchState.category.length) params.set("category", searchState.category.join(","));
  if (searchState.brand.length) params.set("brand", searchState.brand.join(","));
  if (searchState.minPrice) params.set("minPrice", searchState.minPrice);
  if (searchState.maxPrice) params.set("maxPrice", searchState.maxPrice);
  if (searchState.rating) params.set("rating", searchState.rating);
  if (searchState.availability) params.set("availability", searchState.availability);
  if (searchState.discount) params.set("discount", searchState.discount);
  if (searchState.color.length) params.set("color", searchState.color.join(","));
  if (searchState.size.length) params.set("size", searchState.size.join(","));
  if (searchState.newArrivals) params.set("newArrivals", "true");
  if (searchState.bestSeller) params.set("bestSeller", "true");
  if (searchState.page > 1) params.set("page", String(searchState.page));

  return params;
};

function Books() {
  const { books: catalog = [] } = useContext(CartContext) || {};
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, productCount: 0 });
  const [activeBookIndex, setActiveBookIndex] = useState(0);

  const filters = useMemo(() => getSearchState(searchParams), [searchParams]);
  const catalogOptions = useMemo(() => {
    const uniqueValues = (key) => [...new Set(catalog.flatMap((item) => item?.[key] || []).filter(Boolean))];

    return {
      categories: [...new Set(catalog.map((item) => item?.category).filter(Boolean))],
      brands: [...new Set(catalog.map((item) => item?.brand).filter(Boolean))],
      colors: uniqueValues("colors"),
      sizes: uniqueValues("sizes"),
      priceRange: {
        min: catalog.length ? Math.min(...catalog.map((item) => Number(item.price || 0))) : 0,
        max: catalog.length ? Math.max(...catalog.map((item) => Number(item.price || 0))) : 5000,
      },
    };
  }, [catalog]);

  // Get featured book for hero section
  const filteredBooksForHero = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    return products.slice(0, Math.min(5, products.length));
  }, [products]);

  useEffect(() => {
    if (filteredBooksForHero.length <= 1) {
      return undefined;
    }

    const slider = setInterval(() => {
      setActiveBookIndex((current) => (current + 1) % filteredBooksForHero.length);
    }, 2200);

    return () => clearInterval(slider);
  }, [filteredBooksForHero.length]);

  const normalizedBookIndex = filteredBooksForHero.length
    ? activeBookIndex % filteredBooksForHero.length
    : 0;
  const featuredBook = filteredBooksForHero[normalizedBookIndex] || null;

  const updateSearchParams = (nextState) => {
    setSearchParams(serializeState(nextState));
  };

  const setMultiValue = (field, value) => {
    const currentValues = new Set(filters[field]);

    if (currentValues.has(value)) {
      currentValues.delete(value);
    } else {
      currentValues.add(value);
    }

    updateSearchParams({
      ...filters,
      [field]: Array.from(currentValues),
      page: 1,
    });
  };

  const setSingleValue = (field, value) => {
    updateSearchParams({
      ...filters,
      [field]: value,
      page: 1,
    });
  };

  const setBooleanValue = (field, value) => {
    updateSearchParams({
      ...filters,
      [field]: value,
      page: 1,
    });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const removeFilter = (field, value) => {
    if (Array.isArray(filters[field])) {
      updateSearchParams({
        ...filters,
        [field]: filters[field].filter((item) => item !== value),
        page: 1,
      });
      return;
    }

    if (field === "newArrivals" || field === "bestSeller") {
      setBooleanValue(field, false);
      return;
    }

    updateSearchParams({
      ...filters,
      [field]: "",
      page: 1,
    });
  };

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = serializeState(filters);
        params.set("limit", String(DEFAULT_LIMIT));

        const response = await axios.get(`${API_BASE_URL}/api/products?${params.toString()}`);

        if (!mounted) {
          return;
        }

        setProducts(Array.isArray(response.data?.products) ? response.data.products : []);
        setPagination({
          currentPage: response.data?.currentPage || 1,
          totalPages: response.data?.totalPages || 1,
          productCount: response.data?.productCount || 0,
        });
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setProducts([]);
        setPagination({ currentPage: 1, totalPages: 1, productCount: 0 });
        setError(requestError?.response?.data?.message || "Failed to load products. Please try again.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, [filters.keyword, filters.category, filters.brand, filters.minPrice, filters.maxPrice, filters.rating, filters.availability, filters.discount, filters.color, filters.size, filters.newArrivals, filters.bestSeller, filters.page]);

  const activeTags = useMemo(() => {
    const tags = [];

    filters.category.forEach((value) => tags.push({ label: `Category: ${value}`, field: "category", value }));
    filters.brand.forEach((value) => tags.push({ label: `Brand: ${value}`, field: "brand", value }));
    filters.color.forEach((value) => tags.push({ label: `Color: ${value}`, field: "color", value }));
    filters.size.forEach((value) => tags.push({ label: `Size: ${value}`, field: "size", value }));

    if (filters.keyword) tags.push({ label: `Search: ${filters.keyword}`, field: "keyword" });
    if (filters.minPrice || filters.maxPrice) tags.push({ label: `Price: ${filters.minPrice || 0} - ${filters.maxPrice || catalogOptions.priceRange.max}`, field: "price" });
    if (filters.rating) tags.push({ label: `${filters.rating}★ & up`, field: "rating" });
    if (filters.availability) tags.push({ label: filters.availability === "in-stock" ? "In Stock" : "Out of Stock", field: "availability" });
    if (filters.discount) tags.push({ label: `${filters.discount}%+ Discount`, field: "discount" });
    if (filters.newArrivals) tags.push({ label: "New Arrivals", field: "newArrivals" });
    if (filters.bestSeller) tags.push({ label: "Best Seller", field: "bestSeller" });

    return tags;
  }, [catalogOptions.priceRange.max, filters]);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div>
          <p className="books-eyebrow">Books Collection</p>
          <h1>Filter books with precision</h1>
          <p className="books-hero-copy">
            Combine category, brand, rating, price, stock, color, and promotion filters without refreshing the page.
          </p>
        </div>

        {featuredBook && (
          <div className="books-hero-showcase">
            <BookImage
              book={featuredBook}
              alt={featuredBook.title}
              className="books-hero-image"
            />
            <p className="books-hero-feature-label">Now Showing</p>
            <h3>{featuredBook.title}</h3>
            <p>{featuredBook.author}</p>
          </div>
        )}

        <div className="products-hero-stats">
          <strong>{pagination.productCount}</strong>
          <span>matching products</span>
        </div>
      </section>

      <div className="products-layout">
        <aside className="products-sidebar">
          <ProductFilter
            filters={filters}
            options={catalogOptions}
            onToggleMulti={setMultiValue}
            onSetSingle={setSingleValue}
            onSetBoolean={setBooleanValue}
            onClearAll={clearAllFilters}
          />
        </aside>

        <section className="products-content">
          <div className="active-filters-row">
            {activeTags.length ? activeTags.map((tag) => (
              <FilterTag
                key={`${tag.field}-${tag.value || tag.label}`}
                label={tag.label}
                onRemove={() => removeFilter(tag.field, tag.value)}
              />
            )) : (
              <p className="active-filters-empty">No filters applied yet.</p>
            )}

            {activeTags.length > 0 && (
              <button type="button" className="clear-all-btn" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            )}
          </div>

          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={(nextPage) => updateSearchParams({ ...filters, page: nextPage })}
          />
        </section>
      </div>
    </div>
  );
}

export default Books;
