'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';

// Define types for filter options and date range
interface FilterOption {
  value: string | number;
  label: string;
}

interface DateRangeFilter {
  from: string;
  to: string;
}

// Main props interface for the Filters component
interface FiltersProps {
  pageSize: number;
  searchTerm: string;
  onPageSizeChange: (size: number) => void;
  onSearchChange: (term: string) => void;
  data?: any[]; // The data to be filtered
  type?: 'users' | 'products'; // Determines which filters to show
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
  // Brand and Category filter props
  selectedBrands?: string[];
  onBrandsChange?: (brands: string[]) => void;
  selectedCategories?: string[];
  onCategoriesChange?: (categories: string[]) => void;
  pageSizeOptions?: FilterOption[];
  // Search filter props
  onTitleSearch?: (term: string) => void;
  onNameSearch?: (term: string) => void;
  onEmailSearch?: (term: string) => void;
  // Date and Gender filter props
  onDateRangeChange?: (range: DateRangeFilter) => void;
  onGenderChange?: (genders: string[]) => void;
  selectedGenders?: string[];
}

// Props for the dropdown components
interface DropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  enableSearch?: boolean;
  onSearch?: (term: string) => void;
  searchOnly?: boolean; // If true, only shows search input without options
}

function FilterDropdown({
  label,
  options,
  selectedOptions,
  onChange,
  enableSearch = false,
  onSearch,
  searchOnly = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900'
      >
        <span>{label}</span>
        <ChevronDownIcon className='h-4 w-4 text-gray-400' />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10'>
          {enableSearch && (
            <div className='px-4 py-2'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder='Search titles...'
                className='w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-400'
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}
          {!searchOnly && (
            <div className='max-h-60 overflow-y-auto border-t border-gray-200'>
              {options.map((option) => (
                <label
                  key={option}
                  className='flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer'
                >
                  <input
                    type='checkbox'
                    checked={selectedOptions.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...selectedOptions, option]);
                      } else {
                        onChange(
                          selectedOptions.filter((item) => item !== option)
                        );
                      }
                    }}
                    className='mr-2'
                  />
                  <span className='text-sm text-gray-700'>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SearchOnlyDropdown({
  label,
  placeholder,
  onSearch,
}: {
  label: string;
  placeholder: string;
  onSearch: (term: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900'
      >
        <span>{label}</span>
        <ChevronDownIcon className='h-4 w-4 text-gray-400' />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10'>
          <div className='px-4 py-2'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={placeholder}
              className='w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-400'
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DateRangeDropdown({
  label,
  onChange,
}: {
  label: string;
  onChange: (range: DateRangeFilter) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    from: '',
    to: '',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateChange = (field: 'from' | 'to', value: string) => {
    const newRange = { ...dateRange, [field]: value };
    setDateRange(newRange);
    onChange(newRange);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900'
      >
        <span>{label}</span>
        <ChevronDownIcon className='h-4 w-4 text-gray-400' />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 mt-1 w-72 bg-white rounded-md shadow-lg border border-gray-200 p-4 z-10'>
          <div className='space-y-3'>
            <div>
              <label className='block text-sm text-gray-600 mb-1'>From</label>
              <input
                type='date'
                value={dateRange.from}
                onChange={(e) => handleDateChange('from', e.target.value)}
                className='w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-400'
              />
            </div>
            <div>
              <label className='block text-sm text-gray-600 mb-1'>To</label>
              <input
                type='date'
                value={dateRange.to}
                onChange={(e) => handleDateChange('to', e.target.value)}
                className='w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-400'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GenderDropdown({
  selectedGenders,
  onChange,
}: {
  selectedGenders: string[];
  onChange: (genders: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const genderOptions = ['male', 'female', 'other'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900'
      >
        <span>Gender</span>
        <ChevronDownIcon className='h-4 w-4 text-gray-400' />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10'>
          {genderOptions.map((gender) => (
            <label
              key={gender}
              className='flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer'
            >
              <input
                type='checkbox'
                checked={selectedGenders.includes(gender)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...selectedGenders, gender]);
                  } else {
                    onChange(selectedGenders.filter((g) => g !== gender));
                  }
                }}
                className='mr-2'
              />
              <span className='text-sm text-gray-700'>{gender}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Filters({
  pageSize,
  searchTerm,
  onPageSizeChange,
  onSearchChange,
  data = [],
  type = 'users',
  selectedTab = 'ALL',
  onTabChange,
  selectedBrands = [],
  onBrandsChange = () => {},
  selectedCategories = [],
  onCategoriesChange = () => {},
  pageSizeOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
  ],
  onTitleSearch,
  onNameSearch = () => {},
  onEmailSearch = () => {},
  onDateRangeChange = () => {},
  onGenderChange = () => {},
  selectedGenders = [],
}: FiltersProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Get unique brands and categories
  const brands = useMemo(
    () => Array.from(new Set(data?.map((item) => item.brand))).filter(Boolean),
    [data]
  );

  const categories = useMemo(
    () =>
      Array.from(new Set(data?.map((item) => item.category))).filter(Boolean),
    [data]
  );

  // Get unique titles
  const titles = useMemo(
    () => Array.from(new Set(data?.map((item) => item.title))).filter(Boolean),
    [data]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
    onSearchChange(value);
  };

  const toggleSearch = () => {
    const newVisibility = !isSearchVisible;
    setIsSearchVisible(newVisibility);
    if (!newVisibility) {
      handleSearchChange('');
    }
  };

  return (
    <div className='space-y-4'>
      {type === 'products' && (
        <div className='flex gap-4 border-b border-gray-200'>
          <button
            onClick={() => onTabChange?.('ALL')}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              selectedTab === 'ALL'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => onTabChange?.('Laptops')}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              selectedTab === 'Laptops'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Laptops
          </button>
        </div>
      )}

      <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className='rounded border border-gray-300 bg-white px-3 py-1.5 pr-8 text-sm focus:border-gray-400 focus:outline-none appearance-none'
            >
              {pageSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className='text-sm text-gray-600'>Entries</span>
          </div>

          <div className='h-6 w-px bg-gray-300'></div>

          <div className='flex items-center gap-4'>
            <button
              onClick={toggleSearch}
              className='text-gray-500 hover:text-gray-700'
            >
              <MagnifyingGlassIcon className='h-5 w-5' />
            </button>
            <input
              type='text'
              value={localSearchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder='Search in all columns...'
              className={`
                rounded border border-gray-300 px-3 py-1.5 text-sm
                focus:border-gray-400 focus:outline-none
                transition-all duration-200 ease-in-out
                ${isSearchVisible ? 'w-64 opacity-100' : 'w-0 opacity-0'}
              `}
            />
          </div>

          <div className='h-6 w-px bg-gray-300'></div>

          <div className='flex items-center gap-6'>
            {type === 'users' ? (
              <>
                <SearchOnlyDropdown
                  label='Name'
                  placeholder='Search by name...'
                  onSearch={onNameSearch}
                />
                <SearchOnlyDropdown
                  label='Email'
                  placeholder='Search by email...'
                  onSearch={onEmailSearch}
                />
                <DateRangeDropdown
                  label='Birth Date'
                  onChange={onDateRangeChange}
                />
                <GenderDropdown
                  selectedGenders={selectedGenders}
                  onChange={onGenderChange}
                />
              </>
            ) : (
              <>
                <FilterDropdown
                  label='Title'
                  options={[]}
                  selectedOptions={[]}
                  onChange={() => {}}
                  enableSearch={true}
                  onSearch={onTitleSearch}
                  searchOnly={true}
                />
                <FilterDropdown
                  label='Brand'
                  options={brands}
                  selectedOptions={selectedBrands}
                  onChange={onBrandsChange}
                />
                <FilterDropdown
                  label='Category'
                  options={categories}
                  selectedOptions={selectedCategories}
                  onChange={onCategoriesChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
