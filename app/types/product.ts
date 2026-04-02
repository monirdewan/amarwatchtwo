export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  shortDescription: string;
  colors: string[];
  sizes: string[];
  rating: number;
  inStock: boolean;

  // ✅ optional fields (important for flexibility)
  sku?: string;
  description?: string;
  reviews?: number;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
