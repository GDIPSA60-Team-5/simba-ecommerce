// reviewApi.ts
import { apiClient } from "../../../service/apiClient";
import { Review } from "../../../types/Review";


async function getReviewsByProduct(id: string) {
  const response = await apiClient.get<Review[]>(`/products/${id}/reviews`);
  return response.data;
}

async function postReview(productId: string, reviewData: { content: string; rating: number }) {
  const response = await apiClient.post(`/products/${productId}/reviews`, reviewData);
  return response.data;
}

export default { getReviewsByProduct, postReview };
