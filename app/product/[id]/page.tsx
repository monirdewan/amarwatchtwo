import ProductClient from "./ProductClient";
import productsData from "@/data/products.json";

// Generate static paths for all products (Server Component)
export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Server Component wrapper
export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductClient params={params} />;
}
