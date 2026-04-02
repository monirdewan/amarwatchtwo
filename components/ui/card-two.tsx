"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ✅ Define Product type (adjust if needed)
type Product = {
  id: number;
  name: string;
  images: string[];
  category: string;
  rating: number;
  shortDescription: string;
  price: number;
  colors: string[];
  sizes: string[];
  inStock: boolean;
};

// ✅ Define props type
type ProductCardProps = {
  product: Product;
  index: number;
  addToCart: (
    product: Product,
    color?: string,
    size?: string,
    quantity?: number
  ) => void;
};

const ProductCard = React.memo(
  ({ product, addToCart, index }: ProductCardProps) => {
    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      addToCart(product);
    };

    return (
      <Link href={`/product/${product.id}`}>
        <Card className="group will-change-transform overflow-hidden border border-transparent hover:border-[#FF6B35] transition-all duration-300 hover:shadow-md">
          
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#FFF9F5] to-[#FFE8D6]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
              className="object-cover transform-gpu group-hover:scale-105 transition-transform duration-300"
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

            <h3 className="text-lg font-semibold mb-2 group-hover:text-[#FF6B35] transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#FF6B35]">
                ${product.price.toFixed(2)}
              </span>

              {product.colors.length > 1 || product.sizes.length > 1 ? (
                <Button className="bg-[#FF6B35] hover:bg-[#F7931E]">
                  View
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="bg-[#FF6B35] hover:bg-[#F7931E]"
                >
                  {product.inStock ? "Add" : "Out"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
