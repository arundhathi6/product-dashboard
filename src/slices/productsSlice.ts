import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  categoryFilter: string;
  sortByPrice: "asc" | "desc" | null;
  favorites: number[]; // store product IDs
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  searchQuery: "",
  categoryFilter: "all",
  sortByPrice: null,
  favorites: [],
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload;
    },
    setSortByPrice(state, action: PayloadAction<"asc" | "desc" | null>) {
      state.sortByPrice = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchQuery, setCategoryFilter, setSortByPrice, toggleFavorite } = productsSlice.actions;

export default productsSlice.reducer;
