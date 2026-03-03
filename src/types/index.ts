export interface MenuItem {
  id: number;
  title: string;
  slug: string;
  url: string;
  parent_id: number | null;
  order_index: number;
  children?: MenuItem[];
}

export interface NewsItem {
  id: number;
  title: string;
  title_ru?: string;
  excerpt: string;
  excerpt_ru?: string;
  content?: string;
  content_ru?: string;
  image?: string;
  /** Галерея фото для страницы новости (пути в public) */
  gallery?: string[];
  category?: string;
  published_at: string;
}

export interface Specialist {
  id: number;
  name: string;
  name_ru?: string;
  phone: string;
  email: string;
  specialization?: string;
  specialization_ru?: string;
  photo?: string;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
}

export interface CalculatorField {
  field_name: string;
  field_label: string;
  field_type: 'input' | 'select' | 'number';
  default_value: string;
  is_required: boolean;
  order_index: number;
}

export interface CalculatorResult {
  expenses: number;
  income: number;
  subsidy_percent: number;
  subsidy_amount: number;
  profit: number;
  profit_margin: number;
  formatted: {
    expenses: string;
    income: string;
    subsidy_amount: string;
    profit: string;
    profit_margin: string;
  };
}

export interface Language {
  code: 'kz' | 'ru';
  name: string;
  nativeName: string;
}
