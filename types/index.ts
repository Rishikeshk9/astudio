// User type definition
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  username: string;
  birthDate: string;
  bloodGroup: string;
  eyeColor: string;
}

// Product type definition
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
} 