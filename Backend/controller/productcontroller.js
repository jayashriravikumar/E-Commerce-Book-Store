export const getProducts = (req, res) => {
  res.json([
    { id: 1, title: "Atomic Habits", price: 499 },
    { id: 2, title: "Deep Work", price: 450 },
    { id: 3, title: "Clean Code", price: 550 }
  ]);
};