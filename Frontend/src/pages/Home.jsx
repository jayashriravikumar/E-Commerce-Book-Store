import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";

import toast from "react-hot-toast";



// const loginUser = async () => {
//   try {
//     const res = await axios.post(
//       "http://localhost:8000/api/v1/login",
//       {
//         email: "test@gmail.com",
//         password: "123456"
//       },
//       {
//         withCredentials: true
//       }
//     );

//     console.log("Login success:", res.data);
//   } catch (error) {
//     console.log("Login error:", error.response?.data);
//   }
// };


// const products = [
//   { title: "The Alchemist", author: "Paulo Coelho", description: "A story about following your dreams", price: 299, category: "Fiction", stock: 10,image: [{ public_id: "book1", url: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg" }] },
//   { title: "Atomic Habits", author: "James Clear", description: "Tiny changes remarkable results", price: 499, category: "Self Help", stock: 15, image: [{ public_id: "book2", url: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg" }] },
//   { title: "Harry Potter", author: "J.K. Rowling", description: "A young wizard's journey", price: 399, category: "Fantasy", stock: 20, image: [{ public_id: "book3", url: "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg" }] },
//   { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", description: "Lessons about money and investing", price: 349, category: "Finance", stock: 12, image: [{ public_id: "book4", url: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg" }] },
//   { title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A tale of wealth and obsession", price: 249, category: "Classic", stock: 8, image: [{ public_id: "book5", url: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg" }] },
//   { title: "Python Crash Course", author: "Eric Matthes", description: "Learn Python programming fast", price: 599, category: "Technology", stock: 18, image: [{ public_id: "book6", url:  "https://m.media-amazon.com/images/I/71wCs6q1v-L.jpg" }] },
//   { title: "To Kill a Mockingbird", author: "Harper Lee", description: "A story of racial injustice", price: 279, category: "Classic", stock: 10, image: [{ public_id: "book7", url: "https://m.media-amazon.com/images/I/81Otwki3IxL.jpg" }] },
//   { title: "The Lean Startup", author: "Eric Ries", description: "How to build a successful startup", price: 449, category: "Business", stock: 14, image: [{ public_id: "book8", url: "https://m.media-amazon.com/images/I/81-QB7nDh4L.jpg" }] },
//   { title: "Deep Work", author: "Cal Newport", description: "Rules for focused success", price: 379, category: "Self Help", stock: 11, image: [{ public_id: "book9", url: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg" }] },
//   { title: "1984", author: "George Orwell", description: "A dystopian social science fiction", price: 229, category: "Fiction", stock: 16, image: [{ public_id: "book10", url: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg"  }] },
//   { title: "Clean Code", author: "Robert C. Martin", description: "A handbook of agile software craftsmanship", price: 649, category: "Technology", stock: 9, image: [{ public_id: "book11", url: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg" }] },
//   { title: "Think and Grow Rich", author: "Napoleon Hill", description: "The secret to achieving success", price: 299, category: "Self Help", stock: 13,image: [{ public_id: "book12", url: "https://m.media-amazon.com/images/I/71UypkUjStL.jpg" }] },
//  ];

const Home = () => {
  const { products, productCount, loading, error } =useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  useEffect(() =>{
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  },[dispatch,error]);

  return loading? (
    <Loader />
  ) :(
   
 
  <>
    <PageTitle title={"Home | E-Commerce"} />
    <Navbar />
    <ImageSlider />
    <div className="mt-12 p-8 flex flex-col items-center justify-around
      text-gray-900">
      <h1 className="text-4xl font-semibold mb-8 text-blue-700 text-center drop-shadow-sm">Latest Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (   
           <Product key={index} product={product} />
))}
      </div>
      </div>
    <Footer />
    
    </>
  );
  
  
};

export default Home;
