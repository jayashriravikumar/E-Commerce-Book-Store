import BookCard from "./BookCard";

function SkeletonCard() {
  return (
    <div className="book-card skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-line skeleton-line-title" />
      <div className="skeleton-line" />
      <div className="skeleton-line skeleton-line-price" />
      <div className="skeleton-button" />
    </div>
  );
}

function ProductGrid({ products = [], loading = false, error = "", pagination, onPageChange }) {
  if (error) {
    return <h2 className="empty-state error-state">{error}</h2>;
  }

  if (!loading && products.length === 0) {
    return <h2 className="empty-state">No Products Found</h2>;
  }

  return (
    <div className="product-grid-shell">
      <div className="books-grid product-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          : products.map((product) => <BookCard key={product._id} book={product} />)}
      </div>

      {!loading && pagination?.totalPages > 1 && (
        <div className="pagination-bar">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, pagination.currentPage - 1))}
            disabled={pagination.currentPage <= 1}
          >
            Previous
          </button>

          <div className="pagination-pages">
            {Array.from({ length: pagination.totalPages }).map((_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  type="button"
                  key={pageNumber}
                  className={pagination.currentPage === pageNumber ? "active" : ""}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
            disabled={pagination.currentPage >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
