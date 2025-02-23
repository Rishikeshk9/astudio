# Product Management System

Create React App with Next.js 14, Tailwind CSS and Redux Toolkit.
Two pages /users and /products, these two pages have the same re-usable components.

## Project Structure

### Core Components

#### 1. DataTable (`components/DataTable.tsx`)

- Renders tabular data with customizable columns
- Supports loading states with skeleton placeholders
- Handles dynamic data rendering with custom formatters
- Responsive design with horizontal scrolling

#### 2. Filters (`components/Filters.tsx`)

- Complex filtering system with multiple filter types:
  - Search-only dropdowns (for Name, Email, Title)
  - Checkbox dropdowns (for Brand, Category, Gender)
  - Date range picker (for Birth Date)
  - Global search across all columns
- Entries per page selector
- Tab-based filtering for products

#### 3. Pagination (`components/Pagination.tsx`)

- Server-side pagination implementation
- Shows current page, surrounding pages, and navigation
- Dynamic page number generation with ellipsis
- Handles large datasets efficiently

### Pages

#### 1. Users Page (`app/users/page.tsx`)

Features:

- Display user information in a table format
- Filter users by:
  - Name (first name/last name)
  - Email
  - Birth Date Range (For age calculation)
  - Gender
- Global search across all user fields
- Server-side pagination

#### 2. Products Page (`app/products/page.tsx`)

Features:

- Display product information
- Filter products by:
  - Title
  - Brand
  - Category
- Tab-based filtering (All/Laptops)
- Price formatting
- Stock management

### State Management

Using Redux with the following slices:

- `usersSlice`: Manages user data, pagination, and filters
- `productsSlice`: Handles product data, categories, and brands

### Types and Interfaces

Located in `types/index.ts`:

- `User`: Defines user data structure
- `Product`: Defines product data structure

## Key Features

1. **Advanced Filtering**

   - Multiple filter types
   - Combination of filters
   - Real-time filtering
   - Server-side implementation

2. **Responsive Design**

   - Mobile-first approach
   - Horizontal scrolling for tables
   - Adaptive layout

3. **Performance Optimizations**

   - Server-side pagination
   - Efficient state management
   - Optimized re-renders

4. **User Experience**
   - Loading states
   - Error handling
   - Clear navigation
   - Intuitive filtering

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## API Integration

The application integrates with DummyJSON API:

- Users endpoint: `https://dummyjson.com/users`
- Products endpoint: `https://dummyjson.com/products`

## Styling

- Using Tailwind CSS for styling
- Custom font implementation (Neutra Text)
- Consistent color scheme and spacing
- Responsive design patterns

## Future Improvements

1. Add sorting functionality
2. Implement data export
3. Add more filter types
