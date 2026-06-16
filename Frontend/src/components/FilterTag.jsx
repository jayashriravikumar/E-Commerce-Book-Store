function FilterTag({ label, onRemove }) {
  return (
    <span className="filter-tag">
      <span>{label}</span>
      <button type="button" onClick={onRemove} aria-label={`Remove ${label}`}>
        ×
      </button>
    </span>
  );
}

export default FilterTag;
