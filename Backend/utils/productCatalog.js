import seedBooks from "../data/books.js";

const productBrands = {
  "Self Growth": ["Penguin", "HarperCollins"],
  Technology: ["O'Reilly", "Packt"],
  Business: ["Harper Business", "Random House"],
  Fiction: ["Simon & Schuster", "Penguin"],
  General: ["Penguin", "HarperCollins"],
};

const productColors = ["Black", "Blue", "Green", "Gold", "Red", "White"];
const productSizes = ["S", "M", "L", "XL"];

const normalizeText = (value = "") => String(value).trim().toLowerCase();

const toSlugId = (book = {}) =>
  `${book.title || "product"}-${book.author || "author"}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const buildProductCatalog = (books = seedBooks) =>
  books.map((book, index) => {
    const category = book.category || "General";
    const brandGroup = productBrands[category] || productBrands.General;
    const brand = brandGroup[index % brandGroup.length];
    const isNewArrival = index < 3 || index % 4 === 0;
    const isBestSeller = index % 3 === 0;
    const discount = [0, 10, 15, 20, 25, 30][index % 6];
    const ratings = [4, 4.2, 4.4, 4.6, 4.8, 5][index % 6];
    const stock = index % 5 === 0 ? 0 : 20 - index;

    return {
      ...book,
      _id: book._id || toSlugId(book),
      brand,
      colors: [productColors[index % productColors.length], productColors[(index + 2) % productColors.length]],
      sizes: [productSizes[index % productSizes.length], productSizes[(index + 1) % productSizes.length]],
      discount,
      ratings,
      stock: Math.max(stock, 0),
      isNewArrival,
      isBestSeller,
      reviews: Array.isArray(book.reviews) ? book.reviews : [],
      createdAt: book.createdAt || new Date().toISOString(),
    };
  });

const parseList = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(parseList).filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  return ["true", "1", "yes", "on"].includes(normalizeText(value));
};

export const buildProductQuery = (query = {}) => {
  const criteria = {};
  const keyword = String(query.keyword || query.q || "").trim();

  if (keyword) {
    criteria.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { author: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  const categories = parseList(query.category);
  if (categories.length) {
    criteria.category = { $in: categories };
  }

  const brands = parseList(query.brand);
  if (brands.length) {
    criteria.brand = { $in: brands };
  }

  const colors = parseList(query.color);
  if (colors.length) {
    criteria.colors = { $in: colors };
  }

  const sizes = parseList(query.size);
  if (sizes.length) {
    criteria.sizes = { $in: sizes };
  }

  const minPrice = Number(query.minPrice);
  const maxPrice = Number(query.maxPrice);

  if (Number.isFinite(minPrice) || Number.isFinite(maxPrice)) {
    criteria.price = {};

    if (Number.isFinite(minPrice)) {
      criteria.price.$gte = minPrice;
    }

    if (Number.isFinite(maxPrice)) {
      criteria.price.$lte = maxPrice;
    }
  }

  const rating = Number(query.rating);
  if (Number.isFinite(rating) && rating > 0) {
    criteria.ratings = { $gte: rating };
  }

  const minDiscount = Number(query.minDiscount || query.discount);
  if (Number.isFinite(minDiscount) && minDiscount > 0) {
    criteria.discount = { $gte: minDiscount };
  }

  if (query.availability) {
    if (normalizeText(query.availability) === "in-stock") {
      criteria.stock = { $gt: 0 };
    }

    if (normalizeText(query.availability) === "out-of-stock") {
      criteria.stock = 0;
    }
  }

  if (parseBoolean(query.newArrivals)) {
    criteria.isNewArrival = true;
  }

  if (parseBoolean(query.bestSeller)) {
    criteria.isBestSeller = true;
  }

  return criteria;
};
