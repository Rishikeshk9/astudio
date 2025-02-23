'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import {
  fetchProducts,
  setPageSize,
  setCurrentPage,
  setSearchTerm,
  setSelectedCategory,
  setSelectedBrand,
} from '@/redux/features/productsSlice';
import DataTable from '@/components/DataTable';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Get products state from Redux store
  const { items, total, loading, pageSize, currentPage, searchTerm } =
    useSelector((state: RootState) => state.products);

  // Local state for filtered data and filter values
  const [filteredData, setFilteredData] = useState(items);
  const [selectedTab, setSelectedTab] = useState('ALL');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [titleSearch, setTitleSearch] = useState('');

  const [categories] = useState([
    { value: 'laptops', label: 'Laptops' },
    { value: 'smartphones', label: 'Smartphones' },
    // Add more categories as needed
  ]);

  const [brands] = useState([
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    // Add more brands as needed
  ]);

  // Fetch products when page or page size changes
  useEffect(() => {
    dispatch(
      fetchProducts({
        skip: currentPage * pageSize,
        limit: pageSize,
      })
    );
  }, [dispatch, currentPage, pageSize]);

  // Apply all filters whenever filter values change
  useEffect(() => {
    let result = items;

    // Filter by selected tab (ALL or Laptops)
    if (selectedTab !== 'ALL') {
      result = result.filter(
        (item) => item.category.toLowerCase() === 'laptops'
      );
    }

    // Filter by title search
    if (titleSearch) {
      const searchLower = titleSearch.toLowerCase().trim();
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchLower)
      );
    }

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter((item) => selectedBrands.includes(item.brand));
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // Apply global search across all fields
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        )
      );
    }

    setFilteredData(result);
  }, [
    items,
    selectedTab,
    titleSearch,
    selectedBrands,
    selectedCategories,
    searchTerm,
  ]);

  const handlePageSizeChange = (newSize: number) => {
    dispatch(setPageSize(newSize));
    dispatch(setCurrentPage(0));
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    dispatch(setCurrentPage(0));
  };

  const columns = [
    { key: 'title', label: 'TITLE' },
    { key: 'brand', label: 'BRAND' },
    { key: 'category', label: 'CATEGORY' },
    {
      key: 'price',
      label: 'PRICE',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    { key: 'stock', label: 'STOCK' },
    { key: 'rating', label: 'RATING' },
    { key: 'discountPercentage', label: 'DISCOUNT %' },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <Filters
        pageSize={pageSize}
        searchTerm={searchTerm}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={(term: string) => dispatch(setSearchTerm(term))}
        data={items}
        type='products'
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        selectedBrands={selectedBrands}
        onBrandsChange={setSelectedBrands}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        onTitleSearch={setTitleSearch}
      />

      <DataTable columns={columns} data={filteredData} loading={loading} />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / pageSize)}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
}
