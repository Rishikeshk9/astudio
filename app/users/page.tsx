'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import {
  fetchUsers,
  setPageSize,
  setCurrentPage,
  setSearchTerm,
} from '@/redux/features/usersSlice';
import DataTable from '@/components/DataTable';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';
import Breadcrumbs from '@/components/Breadcrumbs';
import { User } from '@/types';

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Get users state from Redux store
  const { items, total, loading, pageSize, currentPage, searchTerm } =
    useSelector((state: RootState) => state.users);

  // Local state for filtered data and filter values
  const [filteredData, setFilteredData] = useState<User[]>(items);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  // Helper function to calculate age from birthdate
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Adjust age if birthday hasn't occurred this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Fetch users when page or page size changes
  useEffect(() => {
    dispatch(
      fetchUsers({
        skip: currentPage * pageSize,
        limit: pageSize,
      })
    );
  }, [dispatch, currentPage, pageSize]);

  // Apply all filters whenever filter values change
  useEffect(() => {
    let filtered = items;

    // Filter by name (first name or last name)
    if (nameFilter) {
      const searchLower = nameFilter.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchLower) ||
          user.lastName.toLowerCase().includes(searchLower)
      );
    }

    // Filter by email
    if (emailFilter) {
      const searchLower = emailFilter.toLowerCase();
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // Filter by age range calculated from date range
    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter((user) => {
        const userAge = calculateAge(user.birthDate);

        // Convert dates to ages for comparison
        const fromAge = dateRange.to ? calculateAge(dateRange.to) : 0;
        const toAge = dateRange.from ? calculateAge(dateRange.from) : 150; // Using 150 as maximum age

        // Compare ages instead of dates
        // Note: We swap from/to because older birthdate = younger age
        return userAge >= fromAge && userAge <= toAge;
      });
    }

    // Filter by selected genders
    if (selectedGenders.length > 0) {
      filtered = filtered.filter((user) =>
        selectedGenders.includes(user.gender)
      );
    }

    // Apply global search across all fields
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        )
      );
    }

    setFilteredData(filtered);
  }, [items, searchTerm, nameFilter, emailFilter, dateRange, selectedGenders]);

  const handlePageSizeChange = (newSize: number) => {
    dispatch(setPageSize(newSize));
    dispatch(setCurrentPage(0));
  };

  const columns = [
    { key: 'firstName', label: 'FIRST NAME' },
    { key: 'lastName', label: 'LAST NAME' },
    { key: 'maidenName', label: 'MAIDEN NAME' },
    { key: 'age', label: 'AGE' },
    { key: 'gender', label: 'GENDER' },
    { key: 'email', label: 'EMAIL' },
    { key: 'username', label: 'USERNAME' },
    { key: 'bloodGroup', label: 'BLOODGROUP' },
    { key: 'eyeColor', label: 'EYECOLOR' },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Users' }]} />

      <Filters
        pageSize={pageSize}
        searchTerm={searchTerm}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={(term: string) => dispatch(setSearchTerm(term))}
        data={items}
        type='users'
        onNameSearch={setNameFilter}
        onEmailSearch={setEmailFilter}
        onDateRangeChange={setDateRange}
        onGenderChange={setSelectedGenders}
        selectedGenders={selectedGenders}
      />

      <DataTable columns={columns} data={filteredData} loading={loading} />

      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        totalItems={total}
        pageSize={pageSize}
        skip={currentPage * pageSize}
      />
    </div>
  );
}
