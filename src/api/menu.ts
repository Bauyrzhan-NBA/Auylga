import api from '../services/api';
import { MenuItem } from '../types';

export const menuApi = {
  getTree: (language?: string) =>
    api.get<MenuItem[]>('/menu', { params: { language } }),
};
