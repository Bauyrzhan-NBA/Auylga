import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const PageGranty: React.FC = () => {
  const { currentLanguage, t } = useLanguage();
  const isKz = currentLanguage.code === 'kz';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link to="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mb-8">
          ← {t('Басты бетке', 'На главную')}
        </Link>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10">
          {t('Гранттар', 'Гранты')}
        </h1>

        <section className="mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-6">
            {t('Абай облысы әкімінің гранты', 'Грант акима Абайской области')}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {isKz ? (
              <>
                <p>Облыстық бюджет қаражаты есебінен қажет мамандықтарды оқытуға арналған облыс әкімінің білім беру гранты тағайындалады.</p>
                <p>Оған ҰБТ тапсырып, шекті балл жинаған мына тұлғалар қатыса алады:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>«Құқық» және «Педагогикалық ғылымдар» білім беру саласы үшін кемінде 75 балл;</li>
                  <li>«Денсаулық сақтау және әлеуметтік қамсыздандыру (медицина)» саласы бойынша кемінде 70 балл;</li>
                  <li>«Ауыл шаруашылығы және биоресурстар», «Ветеринария» кемінде 60 балл;</li>
                  <li>Басқа жоғары оқу орындары кемінде 50 балл;</li>
                </ul>
                <p>Грант негізінде түскен азаматтармен Абай облысының аумағында кемінде 3 жыл жұмыс істеу қажеттігі туралы шарт жасалады.</p>
              </>
            ) : (
              <>
                <p>За счёт средств областного бюджета предоставляется образовательный грант акима области для обучения по востребованным специальностям.</p>
                <p>В конкурсе могут принять участие лица, сдавшие ЕНТ и набравшие проходной балл:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>по направлению «Право» и «Педагогические науки» — не менее 75 баллов;</li>
                  <li>по направлению «Здравоохранение и социальное обеспечение (медицина)» — не менее 70 баллов;</li>
                  <li>по направлениям «Сельское хозяйство и биоресурсы», «Ветеринария» — не менее 60 баллов;</li>
                  <li>по другим специальностям высших учебных заведений — не менее 50 баллов.</li>
                </ul>
                <p>С гражданами, поступившими на обучение по гранту, заключается договор об обязательной отработке на территории Абайской области не менее <strong>3 лет</strong>.</p>
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

export default PageGranty;
