import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: ""
  });

  const fetchProduct = async () => {

    const { data } = await axios.get(
      `/api/v1/product/${id}`
    );

    setProduct(data.product);

  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const updateProduct = async (e) => {

    e.preventDefault();

    await axios.put(
      `/api/v1/admin/product/${id}`,
      product
    );

    alert("Product Updated");

    navigate("/admin/products");

  };

  return (

    <div className="max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={updateProduct}
        className="space-y-4"
      >

        <input
          className="border w-full p-3"
          value={product.name}
          onChange={(e)=>
            setProduct({
              ...product,
              name:e.target.value
            })
          }
        />

        <input
          className="border w-full p-3"
          value={product.price}
          onChange={(e)=>
            setProduct({
              ...product,
              price:e.target.value
            })
          }
        />

        <input
          className="border w-full p-3"
          value={product.stock}
          onChange={(e)=>
            setProduct({
              ...product,
              stock:e.target.value
            })
          }
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Update Product
        </button>

      </form>

    </div>

  );

};

export default EditProduct;