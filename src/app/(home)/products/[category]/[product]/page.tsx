import { getProductById } from "../../actions";
import ProductDetail from "@/components/layout/ProductDetail";

interface PageProps {
  params: { product: string };
}

function extractIdFromSlug(slug: string): string | null {
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
}

export default async function Page(props: PageProps) {
  const product = props?.params?.product;

  const id = extractIdFromSlug(product);
  if (!id) return null;

  const productData = await getProductById(id);
  return <ProductDetail product={productData} />;
}
