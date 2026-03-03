import api from '../services/api';
import { Specialist } from '../types';

export interface SpecialistFormData {
  name_kz: string;
  name_ru: string;
  phone: string;
  email: string;
  specialization_kz?: string;
  specialization_ru?: string;
  photo?: string;
  order_index?: number;
}

export const contactsApi = {
  getList: (language?: string) =>
    api.get<Specialist[]>('/contacts', { params: { language } }),

  getById: (id: number | string, language?: string) =>
    api.get<Specialist>(`/contacts/${id}`, { params: { language } }),

  create: (data: SpecialistFormData) =>
    api.post<{ id: number }>('/contacts', data),

  update: (id: number, data: SpecialistFormData) =>
    api.put(`/contacts/${id}`, data),

  delete: (id: number) => api.delete(`/contacts/${id}`),
};
