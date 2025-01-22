import axios from "axios";
import { Article } from "../types/article";

const api = axios.create({
  baseURL: "https://ps-dev-1-partnergateway.patientsky.dev/assignment",
});

export async function getArticles(): Promise<Article[]> {
  try {
    const { data } = await api.get<Article[]>("/articles");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch articles"
      );
    }
    throw new Error("Failed to fetch articles");
  }
}

export async function getArticle(id: string): Promise<Article> {
  try {
    const { data } = await api.get<Article>(`/articles/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch article details"
      );
    }
    throw new Error("Failed to fetch article details");
  }
}
