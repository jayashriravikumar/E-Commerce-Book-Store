import BookCard from "../components/BookCard";

const relatedBooks = [
  {
    title: "Signal Processing",
    image: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
  },
  {
    title: "Self's Place",
    image: "https://covers.openlibrary.org/b/id/8235116-L.jpg",
  },
  {
    title: "Historia Secreta",
    image: "https://covers.openlibrary.org/b/id/8244151-L.jpg",
  },
];

export default function BookDetail() {
  return (
    <div className="bg-gray-100 min-h-screen p-10">

      {/* Book main section */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg grid md:grid-cols-2 gap-10">

        {/* Book Image */}
        <img
          src="https://covers.openlibrary.org/b/id/8226191-L.jpg"
          className="rounded-lg"
        />

        {/* Book Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Fantastic Mr Fox
          </h1>

          <p className="text-gray-600 mb-4">
            Author: Roald Dahl
          </p>

          <p className="text-2xl font-bold text-indigo-600 mb-6">
            $19.99
          </p>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Add to Cart
          </button>
        </div>
      </div>


      {/* Product Details */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">

        {/* Short Description */}
        <h2 className="text-xl font-semibold mb-2">
          Short Description
        </h2>
        <p className="text-gray-600 mb-6">
          A clever fox outsmarts three greedy farmers in this classic children's novel.
        </p>

        {/* Description */}
        <h2 className="text-xl font-semibold mb-2">
          Description
        </h2>
        <p className="text-gray-600 mb-6">
          Fantastic Mr Fox tells the story of a brave and intelligent fox who
          constantly steals food from three mean farmers. The farmers try to
          capture him, but Mr Fox uses his wit and teamwork to protect his family
          and friends.
        </p>

        {/* How to Use */}
        <h2 className="text-xl font-semibold mb-2">
          How to Use
        </h2>
        <p className="text-gray-600 mb-6">
          This book is perfect for leisure reading and educational storytelling.
          It can be used for children's reading sessions or classroom literature studies.
        </p>

        {/* Product Dimensions */}
        <h2 className="text-xl font-semibold mb-2">
          Product Dimensions
        </h2>
        <p className="text-gray-600 mb-6">
          8.5 x 5.5 x 0.8 inches | Weight: 300g
        </p>

        {/* Package Contains */}
        <h2 className="text-xl font-semibold mb-2">
          Package Contains
        </h2>
        <p className="text-gray-600 mb-6">
          1 x Paperback Book
        </p>

      </div>


      {/* Related Products */}
      <div className="max-w-6xl mx-auto mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Related Books
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedBooks.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>

      </div>

    </div>
  );
}
