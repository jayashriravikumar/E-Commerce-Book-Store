const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Growth",
    price: 499,
    shortDescription: "A practical guide to building good habits and breaking bad ones.",
    description: "Atomic Habits explains how tiny improvements create remarkable long-term results. It gives readers simple systems for building routines that stick and avoiding common behavior-change mistakes.",
    howToUse: "Read one chapter at a time, note one habit principle from each chapter, and apply it to a daily routine such as reading, fitness, or study time.",
    productDimensions: "20 cm x 13 cm x 2.4 cm",
    packageContains: ["1 Paperback Book", "Protective wrap"],
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    relatedProducts: [
      {
        title: "Deep Work",
        author: "Cal Newport",
        price: 449,
        image: "https://covers.openlibrary.org/b/isbn/9780349411910-L.jpg"
      },
      {
        title: "Ikigai",
        author: "Hector Garcia and Francesc Miralles",
        price: 349,
        image: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg"
      }
    ]
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Self Growth",
    price: 449,
    shortDescription: "Strategies for focused success in a distracted world.",
    description: "This book teaches how to produce better results in less time by cultivating intense concentration. It offers practical techniques to reduce distraction and improve meaningful output.",
    howToUse: "Use the chapters to design focused work blocks in your week and gradually reduce shallow, distracting tasks.",
    productDimensions: "21.5 cm x 14 cm x 2.2 cm",
    packageContains: ["1 Paperback Book"],
    image: "https://covers.openlibrary.org/b/isbn/9780349411910-L.jpg"
  },
  {
    title: "Ikigai",
    author: "Hector Garcia and Francesc Miralles",
    category: "Self Growth",
    price: 349,
    shortDescription: "A gentle book about finding purpose and joyful living.",
    description: "Ikigai draws from Japanese philosophy and real-life stories to help readers reflect on purpose, balance, community, and sustainable happiness.",
    howToUse: "Read slowly, journal on the reflection points, and use the ideas to improve daily routines and long-term goals.",
    productDimensions: "19.8 cm x 12.9 cm x 1.7 cm",
    packageContains: ["1 Paperback Book"],
    image: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    price: 549,
    shortDescription: "A practical handbook for writing maintainable and readable software.",
    description: "Clean Code focuses on software craftsmanship, naming, structure, and habits that help developers build codebases that stay understandable over time.",
    howToUse: "Read alongside your coding practice and refactor one small part of a project after each chapter.",
    productDimensions: "23 cm x 18 cm x 3 cm",
    packageContains: ["1 Paperback Book"],
    image: "https://covers.openlibrary.org/b/isbn/0132350882-L.jpg"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt and David Thomas",
    category: "Technology",
    price: 599,
    shortDescription: "Timeless software engineering advice for developers at every stage.",
    description: "The Pragmatic Programmer shares practical principles for thinking clearly, building reliable systems, and growing as a professional developer.",
    howToUse: "Read one topic at a time and apply the advice to your current project, workflow, or debugging habits.",
    productDimensions: "23 cm x 18 cm x 2.7 cm",
    packageContains: ["1 Paperback Book"],
    image: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    price: 429,
    shortDescription: "Timeless lessons on wealth, greed, and happiness.",
    description: "The Psychology of Money explores how people think about money and why financial success depends on behavior more than technical knowledge.",
    howToUse: "Read a chapter when reviewing your savings, spending, or investing habits and reflect on one money behavior to improve.",
    productDimensions: "20.3 cm x 13.2 cm x 1.8 cm",
    packageContains: ["1 Paperback Book", "Invoice slip"],
    image: "https://covers.openlibrary.org/b/isbn/9789390166268-L.jpg"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Business",
    price: 399,
    shortDescription: "Foundational lessons on financial mindset and money habits.",
    description: "This personal finance classic compares two ways of thinking about money, assets, work, and long-term financial freedom.",
    howToUse: "Read alongside your personal budgeting or investing plan and list key lessons that affect your money decisions.",
    productDimensions: "20.1 cm x 13 cm x 2 cm",
    packageContains: ["1 Paperback Book", "Protective cover"],
    image: "https://covers.openlibrary.org/b/isbn/9781612680002-L.jpg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 299,
    shortDescription: "A timeless novel about dreams, courage, and personal destiny.",
    description: "The Alchemist follows Santiago's journey and blends storytelling with themes of purpose, faith, risk, and self-discovery.",
    howToUse: "Enjoy it as a reflective read and revisit favorite passages when you need motivation or clarity.",
    productDimensions: "19.7 cm x 12.8 cm x 1.5 cm",
    packageContains: ["1 Paperback Book"],
    image: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fiction",
    price: 399,
    shortDescription: "A magical coming-of-age adventure that begins at Hogwarts.",
    description: "Harry Potter and the Sorcerer's Stone introduces a hidden wizarding world full of friendship, danger, mystery, and wonder.",
    howToUse: "Read as a cozy escape and share favorite scenes with younger readers or fellow fantasy fans.",
    productDimensions: "20 cm x 13 cm x 2.5 cm",
    packageContains: ["1 Paperback Book"],
    image: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg"
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    category: "Self Growth",
    price: 525,
    shortDescription: "A high-intensity memoir about discipline and mental toughness.",
    description: "David Goggins shares his life story and challenges readers to push beyond self-imposed limits through accountability and resilience.",
    howToUse: "Read chapter by chapter and apply one challenge or discipline practice from each section to your own routine.",
    productDimensions: "23 cm x 15 cm x 2.8 cm",
    packageContains: ["1 Paperback Book"],
    image: "https://covers.openlibrary.org/b/isbn/9781544512273-L.jpg"
  }
];

export default books;
