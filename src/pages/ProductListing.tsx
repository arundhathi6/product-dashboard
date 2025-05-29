import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchProducts,
  setSearchQuery,
  setCategoryFilter,
  setSortByPrice,
  toggleFavorite,
} from "../slices/productsSlice";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

const pinkBg = "bg-pink-100";
const pinkBorder = "border-pink-400";
const pinkText = "text-pink-700";

export default function ProductListing() {
  const dispatch = useAppDispatch();
  const { products, loading, error, searchQuery, categoryFilter, sortByPrice, favorites } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["all", ...cats];
  }, [products]);

  // Debounced search input handler
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        dispatch(setSearchQuery(query));
      }, 500),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "all" ? true : p.category === categoryFilter)
    )
    .sort((a, b) => {
      if (!sortByPrice) return 0;
      return sortByPrice === "asc" ? a.price - b.price : b.price - a.price;
    });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 text-pink-900">
      <h1 className="text-4xl font-bold mb-6 text-center font-['Comic_Sans_MS']">🌸 Product Dashboard 🌸</h1>

      <div className="max-w-5xl mx-auto space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={handleSearchChange}
            className="px-3 py-2 rounded-md border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-600 w-64 text-pink-900"
          />

          <select
            value={categoryFilter}
            onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
            className="px-3 py-2 rounded-md border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-600 text-pink-900"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select
            value={sortByPrice || ""}
            onChange={(e) => dispatch(setSortByPrice(e.target.value as "asc" | "desc" | "" || null))}
            className="px-3 py-2 rounded-md border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-600 text-pink-900"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price Low to High</option>
            <option value="desc">Price High to Low</option>
          </select>

          <Link
            to="/favorites"
            className="ml-auto px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-semibold transition"
          >
            Favorites ({favorites.length})
          </Link>
        </div>

        {/* Product Grid */}
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                className={`mt-3 px-3 py-1 rounded-md text-sm font-semibold w-full ${
                  favorites.includes(product.id)
                    ? "bg-pink-600 text-white"
                    : "bg-pink-200 text-pink-700 hover:bg-pink-300"
                } transition`}
              >
                {favorites.includes(product.id) ? "Remove Favorite" : "Add to Favorites"}
              </button>
            </div>
          ))}
          {filteredProducts.length === 0 && !loading && (
            <p className="text-center col-span-full text-pink-700 font-semibold">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
