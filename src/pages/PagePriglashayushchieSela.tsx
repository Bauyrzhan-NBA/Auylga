import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const PagePriglashayushchieSela: React.FC = () => {
  const { currentLanguage, t } = useLanguage();
  const isKz = currentLanguage.code === 'kz';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link to="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mb-8">
          ← {t('Басты бетке', 'На главную')}
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10">
          {t('Шақыратын ауылдар', 'Приглашающие сёла')}
        </h1>

        <p className="text-gray-700 mb-8">
          {isKz ? (
            <>Бүгінгі таңда Абай облысының ауылдарында <strong>1 412 бос жұмыс орыны</strong> бар. Төменде — жұмыс пен тұруға шақыратын ауылдар.</>
          ) : (
            <>В сельских населённых пунктах Абайской области имеется <strong>1 412 вакансий</strong>. Ниже — сёла, приглашающие на работу и на проживание.</>
          )}
        </p>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {t('Аудандар бойынша бос жұмыс орындары', 'Вакансии по районам')}
          </h2>
          <ul className="space-y-2 text-gray-700">
            {isKz ? (
              <>
                <li>Абай ауданы — 76 бос жұмыс орын</li>
                <li>Аягөз ауданы — 325 бос жұмыс орын</li>
                <li>Бородулиха ауданы — 194 бос жұмыс орын</li>
                <li>Жарма ауданы — 149 бос жұмыс орын</li>
                <li>Бесқарағай ауданы — 120 бос жұмыс орын</li>
                <li>Жаңасемей ауданы — 122 бос жұмыс орын</li>
                <li>Үржар ауданы — 126 бос жұмыс орын</li>
                <li>Ақсуат ауданы — 93 бос жұмыс орын</li>
                <li>Көкпекті ауданы — 106 бос жұмыс орын</li>
                <li>Мақаншы ауданы — 101 бос жұмыс орын</li>
              </>
            ) : (
              <>
                <li>Абайский район — 76 вакансий</li>
                <li>Аягозский район — 325 вакансий</li>
                <li>Бородулихинский район — 194 вакансии</li>
                <li>Жарминский район — 149 вакансий</li>
                <li>Бескарагайский район — 120 вакансий</li>
                <li>Жанасемейский район — 122 вакансии</li>
                <li>Урджарский район — 126 вакансий</li>
                <li>Аксуатский район — 93 вакансии</li>
                <li>Кокпектинский район — 106 вакансий</li>
                <li>Маканчинский район — 101 вакансия</li>
              </>
            )}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {t('Шақыратын ауылдар', 'Приглашающие сёла')}
          </h2>
          <ul className="space-y-2 text-gray-700">
            {isKz ? (
              <>
                <li><strong>Абай ауданы</strong>, Медеу ауылы</li>
                <li><strong>Аякөз ауданы</strong>, Тарбағатай ауылы</li>
                <li><strong>Ақсуат ауданы</strong>, Ойшілік ауылы</li>
                <li><strong>Жаңасемей ауданы</strong>, Ақбұлақ ауылы</li>
                <li><strong>Жарма ауданының</strong> Қаратөбе, Кендірлі және Әди ауылдары</li>
              </>
            ) : (
              <>
                <li><strong>Абайский район</strong> — село Медеу</li>
                <li><strong>Аягозский район</strong> — село Тарбагатай</li>
                <li><strong>Аксуатский район</strong> — село Ойшилик</li>
                <li><strong>Жанасемейский район</strong> — село Акбулак</li>
                <li><strong>Жарминский район</strong> — сёла Каратобе, Кендирли, Ади</li>
              </>
            )}
          </ul>
          <p className="text-gray-500 text-sm mt-2">{t('Тағы тізім қосылады', '(Список будет дополняться.)')}</p>
        </section>

        <section className="mb-10">
          <p className="text-gray-700 mb-4">
            {isKz ? (
              <>«Ауылдарға барсақ, қандай жұмыс орындары бар?», — дейтін азаматтар төмендегі сілтемені басу арқылы толық ақпаратқа қол жеткізе алады. Онда қажет мамандар, байланыс телефон нөмірлері, мекенжайлары және электронды пошта адрестеріне дейін көрсетілген.</>
            ) : (
              <>Полная информация о вакансиях, контактах и адресах работодателей — на портале занятости:</>
            )}
          </p>
          <a href="https://www.enbek.kz/kk/search/vacancy?region_id=10" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 hover:underline font-medium break-all">
            www.enbek.kz/kk/search/vacancy?region_id=10
          </a>
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900/90">
            {isKz ? (
              <>
                <p className="font-semibold mb-2">Ескерту:</p>
                <p>Сілтемеге өткеннен кейін «Ерекшелік» деген бөлімдегі «Мемлекет субсидиялаусыз» деген белгіні алып тастау керек. Сонда ауылдардағы еңбекақысы субсидияланатын жұмыс орындары ашылады. Сілтемеге мобльдік қосымша арқылы кіретін болсаңыз, «Сүзгіні көрсету» тетігін басасыз және ең төменгі жақтағы «Мемлекет субсидиялаусыз» деген белгіні алып тастау қажет.</p>
              </>
            ) : (
              <>
                <p className="font-semibold mb-2">Примечание:</p>
                <p>В разделе «Особенности» снимите отметку «Без государственного субсидирования», чтобы увидеть вакансии с субсидируемой заработной платой. В мобильном приложении: «Показать фильтр» → внизу снять эту отметку.</p>
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

export default PagePriglashayushchieSela;
