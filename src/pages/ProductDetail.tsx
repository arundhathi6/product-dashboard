import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts, toggleFavorite } from "../slices/productsSlice";

const pinkText = "text-pink-700";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { products, loading, error, favorites } = useAppSelector((state) => state.products);
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) return <p className="p-6 text-center text-pink-700">Loading product...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;
  if (!product) return <p className="p-6 text-center text-pink-700">Product not found.</p>;

  const isFavorite = favorites.includes(product.id);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 text-pink-900 max-w-4xl mx-auto font-['Comic_Sans_MS']">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-md"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 bg-pink-50 rounded-lg p-6 shadow-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/3 h-64 object-contain rounded-lg"
        />
        <div className="flex flex-col flex-grow">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="mb-4 text-pink-800 font-semibold text-xl">${product.price.toFixed(2)}</p>
          <p className="mb-4 text-pink-700">{product.description}</p>
          <p className="mb-4 italic text-pink-600">Category: {product.category}</p>

          <button
            onClick={() => dispatch(toggleFavorite(product.id))}
            className={`px-4 py-2 rounded-md font-semibold w-max ${
              isFavorite ? "bg-pink-600 text-white" : "bg-pink-200 text-pink-700 hover:bg-pink-300"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      <Link to="/products" className="block mt-6 text-center text-pink-700 hover:underline">
        ← Back to Products
      </Link>
    </div>
  );
}
