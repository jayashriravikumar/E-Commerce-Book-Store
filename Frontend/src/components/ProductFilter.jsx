import PriceSlider from "./PriceSlider";

const ratingOptions = [5, 4, 3, 2, 1];
const discountOptions = [10, 25, 50];

function ProductFilter({ filters, options, onToggleMulti, onSetSingle, onSetBoolean, onClearAll }) {
  const renderPills = (items = [], field) => (
    <div className="filter-pills">
      {items.map((item) => {
        const active = filters[field]?.includes(item);

        return (
          <button
            key={item}
            type="button"
            className={active ? "filter-pill active" : "filter-pill"}
            onClick={() => onToggleMulti(field, item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="product-filter">
      <div className="filter-header">
        <div>
          <p className="filter-kicker">Refine Results</p>
          <h2>Product Filters</h2>
        </div>

        <button type="button" className="filter-reset" onClick={onClearAll}>
          Reset
        </button>
      </div>

      <div className="filter-search-box">
        <label>
          Search
          <input
            type="text"
            value={filters.keyword}
            placeholder="Search books"
            onChange={(event) => onSetSingle("keyword", event.target.value)}
          />
        </label>
      </div>

      <section className="filter-section">
        <div className="filter-section-header">
          <h3>Category</h3>
        </div>
        {renderPills(options.categories, "category")}
      </section>

      <section className="filter-section">
        <div className="filter-section-header">
          <h3>Brand</h3>
        </div>
        {renderPills(options.brands, "brand")}
      </section>

      <section className="filter-section">
        <PriceSlider
          min={options.priceRange.min}
          max={options.priceRange.max}
          value={{ minPrice: filters.minPrice, maxPrice: filters.maxPrice }}
          onChange={({ minPrice, maxPrice }) => {
            onSetSingle("minPrice", String(minPrice));
            onSetSingle("maxPrice", String(maxPrice));
          }}
        />
      </section>

      <section className="filter-section">
        <div className="filter-section-header">
          <h3>Rating</h3>
        </div>
        <div className="filter-pills">
          {ratingOptions.map((rating) => (
            <button
              key={rating}
              type="button"
              className={Number(filters.rating) === rating ? "filter-pill active" : "filter-pill"}
              onClick={() => onSetSingle("rating", String(rating))}
            >
              {rating}★ & up
            </button>
          ))}
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-section-header">
          <h3>Availability</h3>
        </div>
        <div className="filter-pills">
          {[
            { label: "In Stock", value: "in-stock" },
            { label: "Out of Stock", value: "out-of-stock" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              className={filters.availability === option.value ? "filter-pill active" : "filter-pill"}
              onClick={() => onSetSingle("availability", option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-section-header">
          <h3>Discount</h3>
        </div>
        <div className="filter-pills">
          {discountOptions.map((discount) => (
            <button
              key={discount}
              type="button"
              className={Number(filters.discount) === discount ? "filter-pill active" : "filter-pill"}
              onClick={() => onSetSingle("discount", String(discount))}
            >
              {discount}%+
            </button>
          ))}
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-section-header">
          <h3>Color</h3>
        </div>
        {renderPills(options.colors, "color")}
      </section>

      <section className="filter-section">
        <div className="filter-section-header">
          <h3>Size</h3>
        </div>
        {renderPills(options.sizes, "size")}
      </section>

      <section className="filter-section filter-switches">
        <label className="filter-switch">
          <input
            type="checkbox"
            checked={Boolean(filters.newArrivals)}
            onChange={(event) => onSetBoolean("newArrivals", event.target.checked)}
          />
          <span>New Arrivals</span>
        </label>

        <label className="filter-switch">
          <input
            type="checkbox"
            checked={Boolean(filters.bestSeller)}
            onChange={(event) => onSetBoolean("bestSeller", event.target.checked)}
          />
          <span>Best Seller</span>
        </label>
      </section>
    </div>
  );
}

export default ProductFilter;
