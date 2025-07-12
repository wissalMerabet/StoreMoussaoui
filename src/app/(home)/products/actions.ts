"use server";

import api from "@/api";

export const getAllProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data;

  } catch (error) {
    console.error("Error fetching produits:", error);
    throw error;
  }
}

export const getProductById = async (id: string) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch product by ID", error);
    throw error;
  }
}






