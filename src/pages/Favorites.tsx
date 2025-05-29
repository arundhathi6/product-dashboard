import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { toggleFavorite } from "../slices/productsSlice";
import { Link } from "react-router-dom";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const { favorites, products } = useAppSelector((state) => state.products);

  // Get favorite products details from product list
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 text-pink-900 font-['Comic_Sans_MS'] max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">💖 Your Favorite Products 💖</h1>

      {favoriteProducts.length === 0 ? (
        <p className="text-center text-pink-700 text-lg">You have no favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="border border-pink-400 rounded-lg bg-pink-50 p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h2 className="font-bold text-lg truncate">{product.title}</h2>
              </Link>
              <p className="text-pink-800 font-semibold mt-2">${product.price.toFixed(2)}</p>

              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className="mt-3 px-3 py-1 rounded-md text-sm font-semibold w-full bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                Remove Favorite
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="inline-block px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition font-semibold"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
