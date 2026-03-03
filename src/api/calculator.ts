import api from '../services/api';
import { CalculatorField, CalculatorResult } from '../types';

export const calculatorApi = {
  getSettings: (language?: string) =>
    api.get<CalculatorField[]>('/calculator/settings', {
      params: { language },
    }),

  calculate: (data: {
    expenses: number;
    income: number;
    subsidy_percent: number;
  }) => api.post<CalculatorResult>('/calculator/calculate', data),
};
