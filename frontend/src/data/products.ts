export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sport: string;
  category: 'apparel' | 'equipment' | 'footwear';
  brand: string;
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  gender?: 'Men' | 'Women' | 'Kids' | 'Unisex';
  ageGroup?: 'Adult' | 'Kids' | 'All';
}

export const products: Product[] = [
  // Running
  {
    id: '1',
    name: 'Kiprun KS Light Running Shoes',
    price: 79.99,
    originalPrice: 99.99,
    sport: 'running',
    category: 'footwear',
    brand: 'Kiprun',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Lightweight running shoes designed for regular runners seeking comfort and performance.',
    features: ['Lightweight design', 'Breathable mesh', 'Cushioned sole', 'Drop: 10mm'],
    rating: 4.6,
    reviews: 1847,
    inStock: true,
    colors: ['Black/White', 'Blue/Orange', 'Grey/Green'],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    skillLevel: 'Intermediate',
    gender: 'Unisex',
    ageGroup: 'Adult'
  },
  {
    id: '2',
    name: 'Run Dry+ Running T-Shirt',
    price: 12.99,
    sport: 'running',
    category: 'apparel',
    brand: 'Kiprun',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Technical running t-shirt that wicks away perspiration during your running sessions.',
    features: ['Quick-dry fabric', 'Anti-odor treatment', 'Reflective details', 'Flat seams'],
    rating: 4.4,
    reviews: 2134,
    inStock: true,
    colors: ['Black', 'Navy', 'Red', 'White', 'Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    skillLevel: 'Beginner',
    gender: 'Unisex',
    ageGroup: 'Adult'
  },

  // Football
  {
    id: '3',
    name: 'Kipsta F100 Football Boots',
    price: 24.99,
    sport: 'football',
    category: 'footwear',
    brand: 'Kipsta',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Firm ground football boots for young players starting to play football.',
    features: ['Synthetic upper', 'Firm ground studs', 'Comfortable fit', 'Durable construction'],
    rating: 4.3,
    reviews: 876,
    inStock: true,
    colors: ['Black/White', 'Blue/White', 'Red/Black'],
    sizes: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8'],
    skillLevel: 'Beginner',
    gender: 'Kids',
    ageGroup: 'Kids'
  },
  {
    id: '4',
    name: 'Essential Football Size 5',
    price: 9.99,
    sport: 'football',
    category: 'equipment',
    brand: 'Kipsta',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Size 5 football for playing football on any surface. Perfect for training and matches.',
    features: ['Size 5 official', 'All surface use', 'Good bounce', 'Durable materials'],
    rating: 4.2,
    reviews: 1567,
    inStock: true,
    colors: ['White/Black', 'Blue/White'],
    skillLevel: 'Beginner',
    gender: 'Unisex',
    ageGroup: 'All'
  },

  // Fitness
  {
    id: '5',
    name: 'Domyos Adjustable Dumbbells 20kg',
    price: 89.99,
    originalPrice: 109.99,
    sport: 'fitness',
    category: 'equipment',
    brand: 'Domyos',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Adjustable dumbbells for strength training at home. Easy weight adjustment system.',
    features: ['2.5kg to 20kg per dumbbell', 'Quick adjustment', 'Compact storage', 'Non-slip grip'],
    rating: 4.5,
    reviews: 892,
    inStock: true,
    skillLevel: 'Intermediate',
    gender: 'Unisex',
    ageGroup: 'Adult'
  },
  {
    id: '6',
    name: 'Essential Yoga Mat 4mm',
    price: 14.99,
    sport: 'fitness',
    category: 'equipment',
    brand: 'Domyos',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Comfortable yoga mat for floor exercises, stretching and yoga sessions.',
    features: ['4mm thickness', 'Non-slip surface', 'Easy to clean', 'Lightweight'],
    rating: 4.3,
    reviews: 2234,
    inStock: true,
    colors: ['Purple', 'Blue', 'Green', 'Black', 'Pink'],
    skillLevel: 'Beginner',
    gender: 'Unisex',
    ageGroup: 'Adult'
  },

  // Basketball
  {
    id: '7',
    name: 'Tarmak BT500 Basketball Shoes',
    price: 59.99,
    sport: 'basketball',
    category: 'footwear',
    brand: 'Tarmak',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Mid-top basketball shoes offering ankle support and court grip.',
    features: ['Ankle support', 'Herringbone outsole', 'Cushioned midsole', 'Breathable upper'],
    rating: 4.4,
    reviews: 743,
    inStock: true,
    colors: ['Black/White', 'Red/Black', 'Blue/White'],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    skillLevel: 'Intermediate',
    gender: 'Unisex',
    ageGroup: 'Adult'
  },
  {
    id: '8',
    name: 'BT100 Basketball Size 7',
    price: 14.99,
    sport: 'basketball',
    category: 'equipment',
    brand: 'Tarmak',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Size 7 basketball for outdoor play. Durable rubber construction.',
    features: ['Official size 7', 'Outdoor use', 'Deep grip', 'Durable rubber'],
    rating: 4.1,
    reviews: 1203,
    inStock: true,
    colors: ['Orange/Black', 'Blue/White'],
    skillLevel: 'Beginner',
    gender: 'Unisex',
    ageGroup: 'Adult'
  },

  // Cycling
  {
    id: '9',
    name: 'Triban RC120 Road Bike Helmet',
    price: 39.99,
    sport: 'cycling',
    category: 'equipment',
    brand: 'Triban',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Lightweight road cycling helmet with excellent ventilation for long rides.',
    features: ['In-mold construction', '25 air vents', 'Adjustable fit', 'CE certified'],
    rating: 4.6,
    reviews: 567,
    inStock: true,
    colors: ['White', 'Black', 'Red', 'Blue'],
    sizes: ['S', 'M', 'L'],
    skillLevel: 'Intermediate',
    gender: 'Unisex',
    ageGroup: 'Adult'
  }
];

export const sportsCategories = [
  { id: 'running', name: 'Running', icon: '🏃‍♂️', color: 'bg-orange-500' },
  { id: 'football', name: 'Football', icon: '⚽', color: 'bg-green-500' },
  { id: 'basketball', name: 'Basketball', icon: '🏀', color: 'bg-orange-600' },
  { id: 'fitness', name: 'Fitness', icon: '💪', color: 'bg-purple-500' },
  { id: 'cycling', name: 'Cycling', icon: '🚴‍♂️', color: 'bg-blue-500' },
  { id: 'swimming', name: 'Swimming', icon: '🏊‍♂️', color: 'bg-cyan-500' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'bg-yellow-500' },
  { id: 'outdoor', name: 'Outdoor', icon: '🏔️', color: 'bg-green-600' },
  { id: 'badminton', name: 'Badminton', icon: '🏸', color: 'bg-orange-600' },
  { id: 'cricket', name: 'Cricket', icon: '🏏', color: 'bg-purple-600' }
];


export const categories = [
  { id: 'apparel', name: 'Apparel', icon: '👕' },
  { id: 'equipment', name: 'Equipment', icon: '🏀' },
  { id: 'footwear', name: 'Footwear', icon: '👟' }
];

export const brands = ['Kiprun', 'Kipsta', 'Domyos', 'Tarmak', 'Triban', 'Quechua', 'Nabaiji', 'Artengo'];
