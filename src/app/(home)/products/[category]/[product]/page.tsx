import { getProductById } from "../../actions";
import ProductDetail from "@/components/layout/ProductDetail";

interface PageProps {
  params: { category: string; product: string };
}


function extractIdFromSlug(slug: string): string | null {
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
}

export default async function Page({ params }: PageProps) {
  const { product } = await params;

  const id = extractIdFromSlug(product);
  if (!id) return null;

  const productData = await getProductById(id);
  

  return <ProductDetail product={productData} />;
}
