import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const PageZhilyo: React.FC = () => {
  const { currentLanguage, t } = useLanguage();
  const isKz = currentLanguage.code === 'kz';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link to="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mb-8">
          ← {t('Басты бетке', 'На главную')}
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10">
          {t('Баспанамен қамтамасыз ету', 'Обеспечение жильём')}
        </h1>

        <section className="mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-6">
            {t('Тұрғын үй сертификаты', 'Жилищные сертификаты Абайской области')}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {isKz ? (
              <>
                <p>Абай облысының әкімдігі ауылдық округтерге қоныс аударушыларды қолдау мақсатында тұрғын үй сатып алуға бастапқы жарнаның 90 пайызына дейін, бірақ 1,5 млн теңгеден аспайтын мөлшерде тұрғын үй сертификаттарын ұсынады. Бұл ретте тұрғын үй сатып алу үшін қажетті бастапқы жарна сатып алынатын мүлік құнының 10 пайызы мөлшерінде болуы тиіс.</p>
                <p className="text-sm text-gray-600 italic border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50 rounded-r">
                  <strong>Анықтама:</strong> Ауылдық жерлерде тұрғын үй сатып алудың болжамды құны мысал үшін 10 млн теңге десек, ипотекалық несие бойынша бастапқы жарна 10% немесе 1 млн теңге болады. Осыған байланысты тұрғын үй сертификаты оның 90%-ын, яғни 900 мың теңгесін жабады.
                </p>
              </>
            ) : (
              <>
                <p>Акимат Абайской области в целях поддержки переселенцев в сельские округа предоставляет жилищные сертификаты на покрытие до <strong>90%</strong> первоначального взноса при покупке жилья, но не более <strong>1,5 млн тенге</strong>. Первоначальный взнос для приобретения жилья должен составлять 10% от стоимости приобретаемой недвижимости.</p>
                <p className="text-sm text-gray-600 italic border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50 rounded-r">
                  <strong>Справочно:</strong> Если стоимость жилья в сельской местности составляет 10 млн тенге, первоначальный взнос — 10% (1 млн тенге). Жилищный сертификат покроет 90% от этой суммы — 900 тыс. тенге.
                </p>
              </>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-6">
            {t('«Наурыз жұмыскер» ипотекалық бағдарламасы', 'Ипотечная программа «Наурыз жұмыскер»')}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {isKz ? (
              <>
                <p>Отбасы банк еңбек адамдарына арналған «Наурыз жұмыскер» ипотекалық бағдарламасын ұсынады. Оған өнеркәсіп, көлік және логистика, ауыл шаруашылығы, энергетика және су ресурстарын басқару салаларының мамандары қатыса алады.</p>
                <p className="font-medium">Шарттары:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Пайыздық мөлшерлеме – 9%; Әлеуметтік осал санаттар үшін – 7%;</li>
                  <li>Бастапқы жарна таза әрленген үйге – 10%; Қарапайым әрленген үйге – 20%;</li>
                  <li>Өңірлерде 30 млн теңгеге дейін;</li>
                  <li>Несие мерзімі – 19 жылға дейін.</li>
                </ul>
                <p>Бұл бастама еңбек нарығындағы тұрақтылықты сақтауға мүмкіндік береді.</p>
              </>
            ) : (
              <>
                <p>Отбасы банк предлагает ипотечную программу «Наурыз жұмыскер» для специалистов сфер промышленности, транспорта и логистики, сельского хозяйства, энергетики и управления водными ресурсами.</p>
                <p className="font-medium">Условия:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>процентная ставка — 9% (для социально уязвимых — 7%);</li>
                  <li>первоначальный взнос: 10% (чистовая отделка) или 20% (черновая);</li>
                  <li>сумма займа в регионах — до 30 млн тенге;</li>
                  <li>срок кредита — до 19 лет.</li>
                </ul>
              </>
            )}
          </div>
        </section>

        <div className="pt-8 border-t border-gray-200">
          <Link to="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
            ← {t('Басты бетке', 'На главную')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageZhilyo;
