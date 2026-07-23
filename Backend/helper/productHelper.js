export const getProductName = (product) =>
  product?.name ?? product?.title ?? "Unknown Product";

export const getProductImage = (product) =>
  product?.image?.[0]?.url ??
  product?.coverImage?.[0]?.url ??
  "";

export const getProductPrice = (product) =>
  product?.price ?? 0;

export const getProductStock = (product) =>
  product?.stock ?? 0;

export const getProductId = (product) =>
  product?._id;