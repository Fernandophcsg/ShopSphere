import axios from "axios";
import { Product } from "../types/Product";

const API_URL = "https://dummyjson.com/products";

export  const getProducts = async (limit: number = 30, skip: number = 0) => {
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
    return response;
  } catch (error) {
    console.error("Error getting products:", error);
    throw new Error("Failed to get products. Please try again later.");
  }
}

export async function getProductById(id: number) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error getting product with ID ${id}:`, error);
    throw new Error(`Failed to get product with ID ${id}. Please try again later.`);
  }
}

export async function getAllCategories() {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw new Error("Failed to get categories. Please try again later.");
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting products in category ${category}:`, error);
    throw new Error(`Failed to get products in category ${category}. Please try again later.`);
  }
}

export async function addProduct(product: Product) {
  try {
    const response = await axios.post(`${API_URL}/add`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product. Please check your data and try again.");
  }
}

export async function deleteProduct(id: number) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error(`Failed to delete product with ID ${id}. Please try again later.`);
  }
}
