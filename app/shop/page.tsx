"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Star, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
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

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("featured");

  const products: Product[] = productsData.products;
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFFBF7] to-[#FFF5ED] grain">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Shop All Products</h1>
          <p className="text-xl opacity-95">Discover our complete collection of curated items</p>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-[#f0e6dc] p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-end text-sm text-muted-foreground">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-[#f0e6dc]">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium mr-2">Categories:</span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className={selectedCategory === category ? "bg-[#FF6B35] hover:bg-[#F7931E]" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No products found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product, index) => (
              <a href={`/product/${product.id}`} key={product.id}>
                <Card
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#FF6B35]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#FFF9F5] to-[#FFE8D6]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.featured && (
                      <Badge className="absolute top-4 right-4 bg-[#FF6B35] text-white">
                        Featured
                      </Badge>
                    )}
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
                        <Star className="h-4 w-4 fill-[#F7931E] text-[#F7931E]" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku}</p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#FF6B35]">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#FF6B35] hover:bg-[#F7931E]"
                        disabled={!product.inStock}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
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
