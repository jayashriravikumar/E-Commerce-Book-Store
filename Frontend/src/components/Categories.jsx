const categories = [
  "All",
  "Fiction",
  "Self-Help",
  "Finance"
];

export default function Categories({ setSelectedCategory }) {
  return (
    <div className="flex gap-3 px-10 py-6">
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => setSelectedCategory(cat)}
          className="px-4 py-2 border rounded-full bg-white"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}