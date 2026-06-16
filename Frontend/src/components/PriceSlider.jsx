function PriceSlider({ min = 0, max = 5000, value = {}, onChange }) {
  const minValue = Number(value.minPrice || min);
  const maxValue = Number(value.maxPrice || max);

  const handleChange = (field, nextValue) => {
    const numericValue = Number(nextValue || 0);

    if (field === "minPrice") {
      onChange({
        minPrice: Math.min(numericValue, maxValue),
        maxPrice: maxValue,
      });
      return;
    }

    onChange({
      minPrice: minValue,
      maxPrice: Math.max(numericValue, minValue),
    });
  };

  return (
    <div className="price-slider">
      <div className="filter-section-header">
        <h3>Price Range</h3>
        <span>{minValue} - {maxValue}</span>
      </div>

      <div className="price-slider-fields">
        <label>
          Min
          <input
            type="range"
            min={min}
            max={max}
            value={minValue}
            onChange={(event) => handleChange("minPrice", event.target.value)}
          />
        </label>

        <label>
          Max
          <input
            type="range"
            min={min}
            max={max}
            value={maxValue}
            onChange={(event) => handleChange("maxPrice", event.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default PriceSlider;
