import React, { useState, useEffect } from 'react';
import { CalculatorField, CalculatorResult } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import api from '../services/api';

const BusinessPrograms: React.FC = () => {
  const [fields, setFields] = useState<CalculatorField[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    fetchCalculatorFields();
  }, []);

  const fetchCalculatorFields = async () => {
    try {
      const response = await api.get('/calculator/settings', {
        params: { language: 'kz' }
      });
      setFields(response.data);
      
      // Set default values
      const defaultData: { [key: string]: string } = {};
      response.data.forEach((field: CalculatorField) => {
        defaultData[field.field_name] = field.default_value || '';
      });
      setFormData(defaultData);
    } catch (error) {
      console.error('Failed to fetch calculator fields:', error);
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/calculator/calculate', {
        expenses: parseFloat(formData.expenses || '0'),
        income: parseFloat(formData.income || '0'),
        subsidy_percent: parseFloat(formData.subsidy_percent || '0')
      });
      setResult(response.data);
    } catch (error) {
      console.error('Calculation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t('Кәсіпкерлікті дамыту бағдарламалары', 'Программы развития бизнеса')}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t(
            'Кіші және орта бизнес үшін мемлекеттік қолдау бағдарламалары мен калькулятор',
            'Государственные программы поддержки и калькулятор для малого и среднего бизнеса'
          )}
        </p>
      </div>

      {/* Grant Links */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          {t('Мемлекеттік гранттар', 'Государственные гранты')}
        </h2>
        <p className="text-blue-700 mb-4">
          {t(
            'Кәсіпкерлер үшін мемлекеттік гранттар алу туралы толық ақпарат',
            'Полная информация о получении государственных грантов для предпринимателей'
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://business.enbek.kz/kk/how-to-get-government-grant"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
          >
            {t('Қазақша нұсқасы', 'Казахская версия')}
          </a>
          <a
            href="https://business.enbek.kz/ru/how-to-get-government-grant"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
          >
            {t('Орысша нұсқасы', 'Русская версия')}
          </a>
        </div>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          {t('Бизнес калькуляторы', 'Бизнес калькулятор')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t(
            'Кіріс, шығындар және субсидия пайызын енгізіп, бизнесіңіздің табыстылығын есептеңіз',
            'Рассчитайте рентабельность вашего бизнеса, введя доходы, расходы и процент субсидии'
          )}
        </p>

        <form onSubmit={handleCalculate} className="space-y-6">
          {fields.map((field) => (
            <div key={field.field_name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.field_label}
                {field.is_required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.field_type}
                value={formData[field.field_name] || ''}
                onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                required={field.is_required}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder={field.default_value}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {t('Есептелуде...', 'Расчет...')}
              </div>
            ) : (
              t('Есептеу', 'Рассчитать')
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              {t('Есептеу нәтижесі', 'Результаты расчета')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('Шығындар', 'Расходы')}</p>
                <p className="text-lg font-semibold">{result.formatted.expenses}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('Кіріс', 'Доход')}</p>
                <p className="text-lg font-semibold">{result.formatted.income}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('Субсидия сомасы', 'Сумма субсидии')}</p>
                <p className="text-lg font-semibold text-green-600">{result.formatted.subsidy_amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('Табыс', 'Прибыль')}</p>
                <p className={`text-lg font-semibold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.formatted.profit}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">{t('Табыс маржасы', 'Маржа прибыли')}</p>
                <p className={`text-lg font-semibold ${result.profit_margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.formatted.profit_margin}
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white rounded border">
              <p className="text-sm text-gray-600">
                {t('Есептеу формуласы:', 'Формула расчета:')}
              </p>
              <p className="text-sm font-mono mt-1">
                {t('Табыс = Кіріс - Шығындар + (Шығындар × Субсидия%/100)', 
                   'Прибыль = Доход - Расходы + (Расходы × Субсидия%/100)')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {t('Қолдау бағдарламалары', 'Программы поддержки')}
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• {t('Бизнес жоспарларын қаржыландыру', 'Финансирование бизнес-планов')}</li>
            <li>• {t('Жабдықтарды сатып алуға субсидиялар', 'Субсидии на закупку оборудования')}</li>
            <li>• {t('Жұмыс орындарын құруға гранттар', 'Гранты на создание рабочих мест')}</li>
            <li>• {t('Біліктілікті арттыру курстары', 'Курсы повышения квалификации')}</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {t('Талаптар', 'Требования')}
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• {t('Ресми тіркелу', 'Официальная регистрация')}</li>
            <li>• {t('Салық төлеу тарихы', 'История уплаты налогов')}</li>
            <li>• {t('Бизнес жоспарды ұсыну', 'Предоставление бизнес-плана')}</li>
            <li>• {t('Әлеуметтік маңыздылық', 'Социальная значимость')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusinessPrograms;
