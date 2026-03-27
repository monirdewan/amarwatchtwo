# Lumina E-Commerce Store

A modern, visually striking e-commerce website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components. **Optimized for Cloudflare Pages deployment** with localStorage cart persistence.

## 🚀 Quick Deploy to Cloudflare Pages

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy on Cloudflare**:
- Go to [Cloudflare Pages](https://pages.cloudflare.com/)
- Connect your GitHub repository
- Build command: `npm run build`
- Build output: `out`
- Click Deploy!

📖 **[See detailed deployment guide](DEPLOYMENT.md)**

## Features

- 🛍️ **Product Catalog**: Browse products across multiple categories
- 🛒 **Persistent Shopping Cart**: Cart data saved in localStorage
- 💬 **WhatsApp Integration**: Direct ordering via WhatsApp (+8801939626309)
- 🔍 **Search & Filter**: Search products and filter by category
- ⭐ **Featured Products**: Highlighted featured items section
- 🏪 **Shop Page**: View all products with sorting and filtering
- 📦 **Product Details Page**: 
  - Large image with thumbnail gallery (100x100px)
  - Smart buttons: "View Product" for variations, "Add to Cart" for single option
  - Color and size selection
  - SKU display
  - WhatsApp button for direct inquiry
  - Loading state with spinner
- 📱 **Responsive Design**: Fully responsive across all devices
- 🎨 **Premium Design**: Luxury watch-themed hero banner
- ☁️ **Cloudflare Pages Ready**: Static export optimized for deployment
- 💾 **localStorage**: Cart persists across browser sessions

## Product Data Structure

Each product includes:
- **SKU**: Unique product identifier
- **Multiple Images**: Up to 4 product images
- **Colors**: Available color options
- **Sizes**: Available size options
- **Short Description**: Brief product summary
- **Full Description**: Detailed product information
- **Category**: Product categorization
- **Stock Status**: In stock/out of stock indicator

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Playfair Display + Outfit (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd ecommerce-store
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Project Structure

```
ecommerce-store/
├── app/
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page with featured products
│   ├── shop/
│   │   └── page.tsx         # Shop page with all products
│   └── product/
│       └── [id]/
│           └── page.tsx     # Product details page
├── components/
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── data/
│   └── products.json        # Product data with SKU, images, colors, sizes
├── lib/
│   └── utils.ts            # Utility functions
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Pages

### Home Page (`/`)
- Hero section with call-to-action
- Featured products showcase
- Products by category
- Category filtering
- Search functionality

### Shop Page (`/shop`)
- All products display
- Advanced filtering by category
- Sort by: Featured, Price (Low/High), Rating, Name
- Search functionality
- Product count display

### Product Details Page (`/product/[id]`)
- Large main product image
- Thumbnail gallery (100x100px images)
- Click thumbnails to change main image
- Product information:
  - SKU
  - Name
  - Price
  - Rating & reviews
  - Short & full description
  - Available colors
  - Available sizes
- Color selection
- Size selection
- Quantity selector
- Add to cart button
- **WhatsApp Button**: Sends product details including SKU
- Stock status indicator
- Product details card

## WhatsApp Integration

When clicking the WhatsApp button, it sends a pre-formatted message with:
- Product SKU
- Product Name
- Price
- Selected Color
- Selected Size
- Quantity

Example message:
```
Hi! I'm interested in this product:

SKU: ZWH-001-BLK
Product: Zenith Wireless Headphones
Price: $299.99
Color: Black
Size: One Size
Quantity: 1

Please provide more information.
```

## Customizing Products

Edit the `data/products.json` file to add, remove, or modify products. Each product has the following structure:

```json
{
  "id": 1,
  "name": "Product Name",
  "sku": "PRD-001-CLR",
  "category": "Category",
  "price": 99.99,
  "images": [
    "https://images.unsplash.com/photo1.jpg",
    "https://images.unsplash.com/photo2.jpg",
    "https://images.unsplash.com/photo3.jpg"
  ],
  "shortDescription": "Brief description",
  "description": "Full detailed description",
  "colors": ["Black", "White", "Blue"],
  "sizes": ["S", "M", "L", "XL"],
  "rating": 4.8,
  "reviews": 342,
  "inStock": true,
  "featured": false
}
```

## Color Scheme

The design uses a warm, modern color palette:
- Primary: Vibrant Orange (#FF6B35)
- Accent: Golden Orange (#F7931E)
- Background: Warm cream tones
- Typography: Dark charcoal for contrast
- WhatsApp Green: (#25D366)

## Fonts

- **Headings**: Playfair Display (serif) - elegant and classic
- **Body**: Outfit (sans-serif) - modern and clean

## Building for Production

```bash
npm run build
```

This creates a static export in the `out` folder, ready for Cloudflare Pages.

## localStorage Cart Persistence

The shopping cart automatically saves to browser localStorage:
- **Key**: `lumina_cart`
- **Saves**: Product details, quantities, selected colors/sizes
- **Loads**: Automatically on page load
- **Persists**: Across browser sessions and page refreshes

Cart data survives:
✅ Page refreshes
✅ Browser restarts
✅ Navigation between pages
✅ Deployment updates

## Cloudflare Pages Configuration

The project is pre-configured for Cloudflare Pages:

**next.config.js**:
```javascript
output: 'export',           // Static export
images: { unoptimized: true }, // Compatible with Cloudflare
```

**Build Settings**:
- Build command: `npm run build`
- Build output directory: `out`
- Node version: 18+

## Features to Add

Some ideas for extending this project:
- Backend integration (Node.js, Express, MongoDB)
- Payment gateway (Stripe, PayPal)
- User authentication
- Wishlist functionality
- Product reviews system
- Checkout process
- Order tracking
- Email notifications
- Related products section
- Product recommendations

## License

This project is open source and available under the MIT License.

