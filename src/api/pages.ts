import api from '../services/api';
import { Page } from '../types';

export interface PageFormData {
  title_kz: string;
  title_ru: string;
  slug: string;
  content_kz?: string;
  content_ru?: string;
  meta_title_kz?: string;
  meta_title_ru?: string;
  meta_description_kz?: string;
  meta_description_ru?: string;
  is_active?: boolean;
}

export const pagesApi = {
  getList: (language?: string) =>
    api.get<Page[]>('/pages', { params: { language } }),

  getBySlug: (slug: string, language?: string) =>
    api.get<Page>(`/pages/${slug}`, { params: { language } }),

  create: (data: PageFormData) => api.post<{ id: number }>('/pages', data),

  update: (id: number, data: PageFormData) =>
    api.put(`/pages/${id}`, data),

  delete: (id: number) => api.delete(`/pages/${id}`),
};
