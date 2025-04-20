import { apiClient } from "../../../service/apiClient";
import { Review } from "../../../types/Review";


async function getReviewsByProduct(id: string) {
  const response = await apiClient.get<Review[]>(`/products/${id}/reviews`);
  return response.data;
}

async function postReview(productId: string, reviewData: { comment: string; rating: number }) {
  const response = await apiClient.post(`/products/${productId}/reviews`, reviewData);
  return response.data;
}

async function updateReview(id: number, reviewData: { comment: string; rating: number }) {
  const response = await apiClient.put(`/reviews/${id}`, reviewData);
  return response.data;
}

async function deleteReview(id: number) {
  const response = await apiClient.delete(`reviews/${id}`);
  return response.data;
}


export default { getReviewsByProduct, postReview, updateReview, deleteReview };
