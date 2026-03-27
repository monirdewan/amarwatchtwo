"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Star, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import productsData from "@/data/products.json";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  images: string[];
  shortDescription: string;
  description: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
}

export default function Home() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const products: Product[] = productsData.products;

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFFBF7] to-[#FFF5ED] grain">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] text-white">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Elevate Your Everyday
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95 font-light">
              Discover curated products that blend timeless design with modern functionality
            </p>
            <Button 
              size="lg" 
              className="bg-[#FF6B35] text-white hover:bg-[#F7931E] text-lg px-8 py-6 font-semibold"
              onClick={() => window.location.href = '/shop'}
            >
              Explore Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <a href={`/product/${product.id}`} key={product.id}>
                <Card
                  className="group overflow-hidden border-2 border-transparent hover:border-[#FF6B35] transition-all duration-300 hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#FFF9F5] to-[#FFE8D6]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-[#FF6B35] text-white">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="h-4 w-4 fill-[#F7931E] text-[#F7931E]" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#FF6B35] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#FF6B35]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.colors.length > 1 || product.sizes.length > 1 ? (
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/product/${product.id}`;
                          }}
                          className="bg-[#FF6B35] hover:bg-[#F7931E]"
                        >
                          View Product
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          disabled={!product.inStock}
                          className="bg-[#FF6B35] hover:bg-[#F7931E]"
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Filter & Search Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-5 w-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-[#FF6B35] hover:bg-[#F7931E]" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <a href={`/product/${product.id}`} key={product.id}>
              <Card
                className="group overflow-hidden hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#FFF9F5] to-[#FFE8D6]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-[#F7931E] text-[#F7931E]" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-1 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#FF6B35]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.colors.length > 1 || product.sizes.length > 1 ? (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/product/${product.id}`;
                        }}
                        disabled={!product.inStock}
                        className="bg-[#FF6B35] hover:bg-[#F7931E]"
                      >
                        View
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={!product.inStock}
                        className="bg-[#FF6B35] hover:bg-[#F7931E]"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
                Lumina
              </h3>
              <p className="text-sm text-gray-400">
                Curated modern living for the discerning individual.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/shop" className="hover:text-[#FF6B35] transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-[#FF6B35] transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#FF6B35] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-[#FF6B35] transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Lumina. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
