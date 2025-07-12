import { getAllProducts } from "../actions";
import CategoryDisplay from "@/components/layout/CategoryDisplay";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/utils";
import { Product } from "@/types";

interface PageProps {
  params: { category: string };
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;

  const products: Product[] = await getAllProducts();

  const filteredProducts = products.filter((product) => {
    const categoryName = product.category?.name || "";
    return slugify(categoryName) === category;
  });

  if (filteredProducts.length === 0) {
    return notFound();
  }

  return <CategoryDisplay products={filteredProducts} />;
}
