"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ShoppingCart, Heart, Share2, Check } from "lucide-react";
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

export default function ProductClient({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = productsData.products.find(
        (p) => p.id === parseInt(params.id)
      ) as Product | undefined;
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0] || "");
        setSelectedSize(foundProduct.sizes[0] || "");
      }
      setLoading(false);
    }, 800); // 800ms delay to show loading
  }, [params.id]);

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in this product:%0A%0ASKU: ${product!.sku}%0AProduct: ${product!.name}%0APrice: $${product!.price.toFixed(2)}%0AColor: ${selectedColor}%0ASize: ${selectedSize}%0AQuantity: ${quantity}%0A%0APlease provide more information.`;
    const whatsappUrl = `https://wa.me/8801939626309?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedColor, selectedSize, quantity);
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFFBF7] to-[#FFF5ED] grain">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF6B35] mb-4"></div>
            <p className="text-xl text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFFBF7] to-[#FFF5ED] grain">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[#FF6B35] mb-4">Product Not Found</h2>
              <p className="text-xl text-muted-foreground mb-8">Sorry, we couldn't find the product you're looking for.</p>
              <Button 
                onClick={() => window.location.href = '/shop'}
                className="bg-[#FF6B35] hover:bg-[#F7931E]"
              >
                Back to Shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFFBF7] to-[#FFF5ED] grain">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-[#FF6B35]">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-[#FF6B35]">Shop</a>
          <span>/</span>
          <a href={`/shop?category=${product.category}`} className="hover:text-[#FF6B35]">{product.category}</a>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-[#FFF9F5] to-[#FFE8D6] border-2 border-[#f0e6dc]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.featured && (
                <Badge className="absolute top-4 right-4 bg-[#FF6B35] text-white">
                  Featured
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-6 py-2">Out of Stock</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-[#FF6B35] ring-2 ring-[#FF6B35] ring-offset-2"
                      : "border-[#f0e6dc] hover:border-[#FF6B35]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="outline" className="mb-2">{product.category}</Badge>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="hover:text-[#FF6B35]">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:text-[#FF6B35]">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#f0e6dc]">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-[#F7931E] text-[#F7931E]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-5xl font-bold text-[#FF6B35] mb-2">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-muted-foreground">{product.shortDescription}</p>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Color: <span className="text-[#FF6B35]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border-2 transition-all ${
                        selectedColor === color
                          ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                          : "border-[#f0e6dc] hover:border-[#FF6B35]"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Size: <span className="text-[#FF6B35]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border-2 transition-all ${
                        selectedSize === size
                          ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                          : "border-[#f0e6dc] hover:border-[#FF6B35]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                size="lg"
                className="flex-1 bg-[#FF6B35] hover:bg-[#F7931E] text-lg py-6"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 text-lg py-6 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                onClick={handleWhatsAppClick}
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                {product.inStock ? "In Stock - Ships within 2-3 business days" : "Currently Out of Stock"}
              </span>
            </div>

            {/* Product Description */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="mt-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#f0e6dc]">
                    <span className="font-medium">SKU:</span>
                    <span className="text-muted-foreground">{product.sku}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#f0e6dc]">
                    <span className="font-medium">Category:</span>
                    <span className="text-muted-foreground">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#f0e6dc]">
                    <span className="font-medium">Available Colors:</span>
                    <span className="text-muted-foreground">{product.colors.join(", ")}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Available Sizes:</span>
                    <span className="text-muted-foreground">{product.sizes.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
