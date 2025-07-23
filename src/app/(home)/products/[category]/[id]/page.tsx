import { getProductById } from "../../actions";
import ProductDetail from "@/components/layout/ProductDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const id = (await params).id;

  const productData = await getProductById(id);

  return <ProductDetail product={productData} />;
}
