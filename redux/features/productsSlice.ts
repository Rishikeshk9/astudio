import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  // Add other product fields as needed
}

interface ProductsState {
  items: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  pageSize: number;
  currentPage: number;
  searchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  pageSize: 5,
  currentPage: 0,
  searchTerm: '',
  selectedCategory: '',
  selectedBrand: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({
    skip,
    limit,
    category,
    brand,
  }: {
    skip: number;
    limit: number;
    category?: string;
    brand?: string;
  }) => {
    let url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const setSelectedCategory = createAsyncThunk(
  'products/setSelectedCategory',
  async (category: string, { dispatch }) => {
    dispatch(productsSlice.actions._setSelectedCategory(category));
    dispatch(productsSlice.actions._setSelectedBrand(''));
    return category;
  }
);

export const setSelectedBrand = createAsyncThunk(
  'products/setSelectedBrand',
  async (brand: string, { dispatch }) => {
    dispatch(productsSlice.actions._setSelectedBrand(brand));
    dispatch(productsSlice.actions._setSelectedCategory(''));
    return brand;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 0;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    _setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 0;
    },
    _setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
      state.currentPage = 0;
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
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const {
  setPageSize,
  setCurrentPage,
  setSearchTerm,
  _setSelectedCategory,
  _setSelectedBrand,
} = productsSlice.actions;
export default productsSlice.reducer; 