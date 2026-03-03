import api from '../services/api';
import { NewsItem } from '../types';

export interface NewsListResponse {
  news: NewsItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface NewsFormData {
  title_kz: string;
  title_ru: string;
  content_kz: string;
  content_ru: string;
  excerpt_kz?: string;
  excerpt_ru?: string;
  image?: string;
  category?: string;
  is_active?: boolean;
}

export const newsApi = {
  getList: (params?: { page?: number; limit?: number; language?: string }) =>
    api.get<NewsListResponse>('/news', { params }),

  getLatest: (params?: { limit?: number; language?: string }) =>
    api.get<NewsItem[]>('/news/latest', { params }),

  getById: (id: number | string, language?: string) =>
    api.get<NewsItem>(`/news/${id}`, { params: { language } }),

  create: (data: NewsFormData) => api.post<{ id: number }>('/news', data),

  update: (id: number, data: NewsFormData) =>
    api.put(`/news/${id}`, data),

  delete: (id: number) => api.delete(`/news/${id}`),
};
