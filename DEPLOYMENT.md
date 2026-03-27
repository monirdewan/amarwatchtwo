# Lumina E-Commerce Store - Cloudflare Pages Deployment

A modern e-commerce website built with Next.js 14, optimized for Cloudflare Pages deployment.

## 🚀 Deploy to Cloudflare Pages via GitHub

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Initialize and push your code:

```bash
cd ecommerce-store
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages** > **Create application** > **Pages**
3. Click **Connect to Git**
4. Select your GitHub repository
5. Configure build settings:

```
Build command: npm run build
Build output directory: out
Root directory: /
```

6. Click **Save and Deploy**

### Step 3: Environment Variables (Optional)

If needed, add environment variables in Cloudflare Pages:
- Go to **Settings** > **Environment variables**
- Add any required variables

## 📦 Features

- ✅ **Static Export**: Optimized for Cloudflare Pages
- ✅ **localStorage Cart**: Cart data persists across sessions
- ✅ **WhatsApp Integration**: Direct ordering via WhatsApp
- ✅ **Product Variations**: Smart button display based on product options
- ✅ **Image Gallery**: Click thumbnails to change main image
- ✅ **Responsive Design**: Works on all devices
- ✅ **Premium Design**: Luxury watch-themed hero banner

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

## 📱 WhatsApp Integration

**Phone Number**: +8801939626309

### Cart Checkout
Sends all cart items with:
- Product name
- SKU
- Color & Size (if selected)
- Quantity
- Price
- Total amount

### Product Page
Sends single product details with selected options

## 🎨 Product Structure

Products with **multiple colors OR sizes** show "View Product" button.
Products with **single option** show "Add to Cart" button.

## 📊 Cart Persistence

Cart data is stored in **localStorage** with key: `lumina_cart`
- Persists across browser sessions
- Survives page refreshes
- Automatically loads on app start

## 🔧 Technical Details

- **Framework**: Next.js 14 (Static Export)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Storage**: localStorage
- **Hosting**: Cloudflare Pages
- **Images**: Unoptimized (Cloudflare compatible)

## 📁 Project Structure

```
ecommerce-store/
├── app/
│   ├── page.tsx              # Home page
│   ├── shop/page.tsx         # Shop page
│   ├── product/[id]/page.tsx # Product details
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Header with cart
│   └── ui/                   # UI components
├── context/
│   └── CartContext.tsx       # Cart state + localStorage
├── data/
│   └── products.json         # Product database
└── out/                      # Build output (after npm run build)
```

## 🌐 Build Output

After running `npm run build`, the static site is generated in the `out` folder.
This folder is automatically deployed to Cloudflare Pages.

## 🔄 Updates

To update your site:
1. Make changes to your code
2. Commit and push to GitHub
3. Cloudflare Pages automatically rebuilds and deploys

## 📝 Customization

### Update Products
Edit `data/products.json` to add/modify products

### Change WhatsApp Number
Update phone number in:
- `components/Header.tsx` (line ~12)
- `app/product/[id]/page.tsx` (line ~50)

### Modify Styling
Edit `app/globals.css` and Tailwind classes

## 🐛 Troubleshooting

### Build Fails
- Ensure `output: 'export'` is in `next.config.js`
- Check that all dynamic routes use `generateStaticParams`

### Images Not Loading
- Images use `unoptimized: true` for Cloudflare
- Ensure image URLs are accessible

### Cart Not Persisting
- Check browser localStorage is enabled
- Clear cache and reload

## 📞 Support

For issues or questions about deployment, check:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

## 📄 License

MIT License - Feel free to use for any project!
