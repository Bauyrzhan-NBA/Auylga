import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { demoNews } from '../utils/demoData';
import api from '../services/api';
import { ProgramIcon } from '../components/ProgramIcons';

const programs = [
  {
    icon: 'users',
    titleKz: 'Әлеуметтік бағдарламалар',
    titleRu: 'Социальные программы',
    descKz: '«Дипломмен — ауылға» және жұмыс күшінің мобильділігі, жасөспірімдер тәжірибесі, қоғамдық жұмыстар',
    descRu: '«С дипломом — в село», мобильность рабочей силы, молодёжная практика, общественные работы, «Серебряный возраст»',
    url: '/socialnye-programmy',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    iconBg: 'bg-purple-100',
  },
  {
    icon: 'award',
    titleKz: 'Гранттар',
    titleRu: 'Гранты',
    descKz: 'Облыс әкімінің білім гранты — ЕНТ бойынша қабылдау, аумақта 3 жыл отработка',
    descRu: 'Образовательный грант акима области — приём по ЕНТ, отработка не менее 3 лет на территории области',
    url: '/granty',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
  },
  {
    icon: 'home',
    titleKz: 'Баспанамен қамтамасыз ету',
    titleRu: 'Обеспечение жильём',
    descKz: 'Жилу сертификаттары (бастапқы жарнаның 90%-ы, 1,5 млн ₸ дейін), «Наурыз жұмыскер» ипотекасы',
    descRu: 'Жилищные сертификаты (до 90% первого взноса, до 1,5 млн ₸), ипотека «Наурыз жұмыскер»',
    url: '/zhilyo',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconBg: 'bg-green-100',
  },
  {
    icon: 'briefcase',
    titleKz: 'Кәсіпкерлікті дамыту',
    titleRu: 'Развитие предпринимательства',
    descKz: '«Ауыл аманаты», «Сауындық сиыр», «100 қой», «Іскер аймақ» — микрокредит және субсидиялар',
    descRu: '«Ауыл аманаты», «Дойная корова», «100 овец», «Іскер аймақ» — микрокредиты и субсидии',
    url: '/predprinimatelstvo',
    color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
    iconBg: 'bg-rose-100',
  },
  {
    icon: 'graduation',
    titleKz: 'Ауылдарға қажет мамандар',
    titleRu: 'Востребованные специалисты в сёлах',
    descKz: '«Дипломмен — ауылға»: мұғалімдер мен медицина мамандарына көтерме төлем, тұрғын үй несиесі 8,65 млн ₸',
    descRu: '«С дипломом — в село»: подъёмное пособие учителям и медработникам, кредит на жильё до 8,65 млн ₸',
    url: '/specialisty-v-selah',
    color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
    iconBg: 'bg-teal-100',
  },
  {
    icon: 'users',
    titleKz: 'Шақыратын ауылдар',
    titleRu: 'Приглашающие сёла',
    descKz: 'Абай облысында 1412 бос жұмыс орны, аудандар бойынша тізім, Медеу, Тарбағайтай және т.б.',
    descRu: '1 412 вакансий в сёлах Абайской области, список по районам, Медеу, Тарбагатай и др.',
    url: '/priglashayushchie-sela',
    color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
    iconBg: 'bg-sky-100',
  },
  {
    icon: 'briefcase',
    titleKz: 'Жұмыс күшінің мобильділігі мен жұмыспен қамту',
    titleRu: 'Мобильность и занятость',
    descKz: 'Көші-қон компенсациясы (70 МРП), жасөспірімдер тәжірибесі (30 МРП), қоғамдық жұмыстар, «Күміс жасы»',
    descRu: 'Компенсация за переезд (70 МРП), молодёжная практика (30 МРП), общественные работы, «Серебряный возраст»',
    url: '/programmy-mobilnosti',
    color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
    iconBg: 'bg-indigo-100',
  },
  {
    icon: 'document',
    titleKz: 'Бір ауыл – бір өнім',
    titleRu: 'Один аул – один продукт',
    descKz: 'Грант 5 млн ₸, жергілікті өнімді өндіру мен нарыққа шығаруға қолдау',
    descRu: 'Грант 5 млн ₸ на производство и продвижение местного продукта одного аула',
    url: '/odin-aul-odin-product',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
    iconBg: 'bg-emerald-100',
  },
];

const Home: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>(demoNews.slice(0, 4));
  const { currentLanguage, t } = useLanguage();

  useEffect(() => {
    api.get('/news/latest', { params: { limit: 4, language: currentLanguage.code } })
      .then(r => {
        const data = r.data;
        if (Array.isArray(data) && data.length > 0) setLatestNews(data);
      })
      .catch(() => {});
  }, [currentLanguage]);

  const newsTitle = (n: NewsItem) =>
    currentLanguage.code === 'ru' && n.title_ru ? n.title_ru : n.title;
  const newsExcerpt = (n: NewsItem) =>
    currentLanguage.code === 'ru' && n.excerpt_ru ? n.excerpt_ru : n.excerpt;

  const formatDate = (iso: string | undefined) => {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(currentLanguage.code === 'kz' ? 'kk-KZ' : 'ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div className="bg-[#f8fafc]">
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden bg-cover bg-center min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh]"
        style={{ backgroundImage: 'url(/photos/heroglavnayaicon.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/75 via-primary-800/60 to-gray-900/70" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 sm:mb-6 drop-shadow-lg tracking-tight">
              {t(
                '«Қаладан - ауылға» қанатқақты жобасы аясында ақпарат беретін ресми портал',
                'Официальный портал, предоставляющий информацию в рамках пилотного проекта «Қаладан - ауылға»'
              )}
            </h1>
            <p className="text-blue-50/95 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl leading-relaxed">
              {t(
                'Гранттар, субсидиялар, баспана бағдарламалары — барлық ақпарат бір жерде',
                'Гранты, субсидии, жилищные программы — вся информация в одном месте'
              )}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                to="/granty"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold px-6 py-3.5 sm:px-7 rounded-xl hover:bg-primary-50 active:scale-[0.98] transition-all shadow-card touch-manipulation min-h-[2.75rem]"
              >
                {t('Гранттарды қарау', 'Смотреть гранты')}
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/contacts"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white font-bold px-6 py-3.5 sm:px-7 rounded-xl hover:bg-white/15 active:bg-white/25 transition-colors touch-manipulation min-h-[2.75rem]"
              >
                {t('Маманмен байланыс', 'Консультация специалиста')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── О ПРОЕКТЕ: ЦЕЛИ И ВОЗМОЖНОСТИ ── */}
      <section className="py-16 md:py-24 bg-white shadow-inner-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
            {t('«Қаладан ауылға» жобасының мақсаты', 'Цели и возможности проекта')}
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            {currentLanguage.code === 'kz' ? (
              <>
                <p className="text-base md:text-lg">
                  Ауыл халқын тұрақтандыру, қаладан ауылға көшіп келетін отбасылар арқылы елдімекен халқының санын арттыру. Сондай-ақ, ауылдардағы кадр мәселесін шешу және мемлекеттік бағдарламалардың тиімді іске асырылуын қамтамасыз ету.
                </p>
                <p className="text-base md:text-lg">
                  Сонымен қатар, ауылдарда шағын кәсіпкерлікті дамыту арқылы жұмыссыздық деңгейін төмендетіп, жергілікті жұрттың тұрмыс сапасын жақсарту.
                </p>
                <p className="text-base md:text-lg">
                  Қазіргі уақытта ауылдарда мектептер, медициналық пункттер, мәдениет үйлері бой көтеріп, жолдар жөнделіп жатыр, таза ауыз су желілері тартылып, халыққа ең қажет деген инфрақұрылым нысандары салынуда. Бұл – жобаның негізгі мақсаттарын жүзеге асыруға ықпал ететін мүмкіндіктер.
                </p>
              </>
            ) : (
              <>
                <p className="text-base md:text-lg">
                  Стабилизация сельского населения и увеличение численности жителей населённых пунктов за счёт переезда семей из города в село.
                </p>
                <p className="text-base md:text-lg">
                  Также — решение кадрового дефицита в сельской местности и обеспечение эффективной реализации государственных программ.
                </p>
                <p className="text-base md:text-lg">
                  Кроме того, развитие малого предпринимательства в сёлах позволит снизить уровень безработицы и повысить качество жизни местного населения.
                </p>
                <p className="text-base md:text-lg">
                  В настоящее время в сельских населённых пунктах строятся школы, медицинские пункты и дома культуры, ремонтируются дороги, прокладываются сети чистой питьевой воды и возводятся наиболее востребованные объекты инфраструктуры. Всё это создаёт реальные возможности для достижения основных целей проекта.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {t('Мемлекеттік бағдарламалар', 'Государственные программы')}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t(
                'Ауыл тұрғындарына арналған барлық мемлекеттік қолдау бағдарламаларын зерттеңіз',
                'Изучите все государственные программы поддержки для жителей сёл'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {programs.map((p) => (
              <Link
                key={p.url}
                to={p.url}
                className={`group border-2 rounded-2xl p-5 sm:p-6 transition-all duration-250 touch-manipulation active:scale-[0.99] shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 ${p.color}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-gray-700 ${p.iconBg}`}>
                  <ProgramIcon name={p.icon} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-700 transition-colors">
                  {currentLanguage.code === 'kz' ? p.titleKz : p.titleRu}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {currentLanguage.code === 'kz' ? p.descKz : p.descRu}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-primary-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  {t('Толығырақ', 'Подробнее')} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПРОЕКТЫ: ДОЙНАЯ КОРОВА, 100 ОВЕЦ, ІСКЕР АЙМАҚ ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
            {t('Жобалар мен бағдарламалар', 'Проекты и программы')}
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-primary-700 mb-4">{currentLanguage.code === 'kz' ? (<>«Сауынды сиыр» <span className="lowercase">жобасы</span></>) : t('«Сауынды сиыр» жобасы', 'Проект «Дойная корова»')}</h3>
              {currentLanguage.code === 'kz' ? (
                <>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    «Ауыл аманаты» бағдарламасы аясында «Сауынды сиыр» жобасын жүзеге асыру жоспарланған. Ол сүтті және етті бағыттағы асыл тұқымды сиырларын ұстайтын жеке қосалқы шаруашылықтардың санын арттыруға арналған. Бұл жерде тек сүтті сиыр сатып алуға басымдық беріледі.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Сүт және сүт өнімдері әрқашан сұранысқа ие. Президент ауыл шаруашылығы өнімдері бойынша әлі импортқа тәуелді екенімізді айтқан болатын. Сондықтан, ауыл азаматтарының сүтті сиыр сатып алуларына мүмкіндік қарастырып, таңдап алынатын аудан орталықтарынан сүт өңдейтін кәсіпорындар ашу жоспарланып отыр.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Бағдарлама аясында бұдан бөлек басқа да шағын кәсіпкерлік бағыттарын дамытуға ден қойылады. Бұл бағдарлама ауыл тұрғындарын тұрақтандыруға және қаладан ауылға көшіп келетін отбасылардың кәсіппен айналысуына мүмкіндік береді.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    В рамках программы «Ауыл аманаты» планируется реализация проекта «Дойная корова». Он направлен на увеличение количества личных подсобных хозяйств, содержащих племенных коров молочного и мясного направления. При этом приоритет будет отдаваться приобретению именно молочных коров.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Молоко и молочная продукция всегда пользуются стабильным спросом. Президент отмечал, что по ряду видов сельскохозяйственной продукции мы всё ещё зависим от импорта. В связи с этим предусматривается создание возможностей для сельских жителей по приобретению молочных коров, а также планируется открытие предприятий по переработке молока в выбранных районных центрах.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Кроме того, в рамках программы особое внимание будет уделено развитию других направлений малого предпринимательства. Данная программа позволит стабилизировать сельское население и создаст условия для занятия предпринимательством для семей, переезжающих из города в село.
                  </p>
                </>
              )}
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-primary-700 mb-4">{t('«100 қой» жобасы', 'Проект «100 овец»')}</h3>
              {currentLanguage.code === 'kz' ? (
                <>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Тауарлы несие ретінде «100 қой» жобасы ұсынылады. Ауыл азаматтарына немесе ауылға көшіп келген отбасыларға 100 бас қойды тауарлық несие ретінде қой шаруашылығымен айналысатын іргелі қожалықтар қолынан іс келетін ауыл азаматтарына өзара келісім негізінде береді.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Бұл бюджет қаржысын қажет етпейді және әкімшілік өзара келісімге араласпайды. Бұл жерде азаматтық позиция алдыңғы орынға шығады. Өз ауылына, халқына қолдау көрсеткісі келген жомарт шаруа қожалық иелерінің еркіндегі мәселе.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Қойды алған шағын кәсіпкер тауарлы несиені оның төлдерімен қайтарады. Жылдағы төлдің жартысын мал иесіне беріп отыру келісімі жасалуы мүмкін.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    В качестве товарного кредита предлагается проект «100 овец». Сельским жителям или семьям, переехавшим в село, 100 голов овец предоставляются в виде товарного кредита крупными хозяйствами, занимающимися овцеводством, на основе взаимного соглашения — тем сельским жителям, которые имеют опыт и желание работать.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Проект не требует бюджетных средств, и акимат не вмешивается в процесс заключения соглашения между сторонами. Здесь на первый план выходит гражданская позиция. Это добровольная инициатива щедрых владельцев крестьянских хозяйств, которые хотят поддержать своё село и своих земляков.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Малый предприниматель, получивший овец, возвращает товарный кредит приплодом. Возможно заключение соглашения, согласно которому половина ежегодного приплода передаётся владельцу.
                  </p>
                </>
              )}
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-primary-700 mb-4">{t('«Іскер аймақ» бағдарламасы', 'Программа «Іскер аймақ»')}</h3>
              {currentLanguage.code === 'kz' ? (
                <>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    «Іскер аймақ» шағын бизнесті қолдаудың бірыңғай бағдарламасы аясында сыйақы мөлшерлемесінің бір бөлігі субсидияланады.
                  </p>
                  <p className="font-medium text-gray-900 mb-2">Қолдау көрсетілетін салалар:</p>
                  <p className="text-gray-700 mb-4">Логистикалық қызметтер; Баспа қызметі; Ветеринарлық қызмет; Өңдеу өнеркәсібі; Білім беру; Туризм; Медицина.</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4 text-gray-700">
                    <div><span className="font-medium">Несиенің сомасы:</span> 200 млн теңгеге дейін</div>
                    <div><span className="font-medium">Нысаналы мақсаты:</span> Инвестициялар; Айналым қаражатын толықтыру.</div>
                    <div><span className="font-medium">Субсидиялау мөлшері:</span> Номиналды сыйақы мөлшерлемесінің 40%-ы.</div>
                    <div><span className="font-medium">Пайыздық мөлшерлеме:</span> 8,8%</div>
                    <div><span className="font-medium">Субсидиялау мерзімі:</span> 3 жылға дейін.</div>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Толығырақ{' '}
                    <a href="https://damu.kz/programmi/subsidy/isker_aymak" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 hover:underline break-all transition-colors">https://damu.kz/programmi/subsidy/isker_aymak</a>{' '}
                    сілтемесі арқылы білуге болады және субсидия калькуляторымен есептеп алуға мүмкіндігіңіз бар.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    В рамках Единой программы поддержки малого бизнеса «Іскер аймақ» субсидируется часть процентной ставки по кредиту.
                  </p>
                  <p className="font-medium text-gray-900 mb-2">Поддерживаемые отрасли:</p>
                  <p className="text-gray-700 mb-4">Логистические услуги; издательская деятельность; ветеринарные услуги; обрабатывающая промышленность; образование; туризм; медицина.</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4 text-gray-700">
                    <div><span className="font-medium">Сумма кредита:</span> до 200 млн тенге.</div>
                    <div><span className="font-medium">Целевое назначение:</span> инвестиции; пополнение оборотных средств.</div>
                    <div><span className="font-medium">Размер субсидирования:</span> 40% от номинальной процентной ставки.</div>
                    <div><span className="font-medium">Процентная ставка:</span> 8,8%.</div>
                    <div><span className="font-medium">Срок субсидирования:</span> до 3 лет.</div>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Подробнее можно узнать по ссылке:{' '}
                    <a href="https://damu.kz/programmi/subsidy/isker_aymak" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 hover:underline break-all transition-colors">damu.kz/programmi/subsidy/isker_aymak</a>
                  </p>
                  <p className="text-gray-600 text-sm">Также доступен калькулятор субсидирования для самостоятельного расчёта.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ВАКАНСИИ И ПРИГЛАШАЮЩИЕ СЁЛА ── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
            {t('Ауылдарға қажет мамандар / Шақыратын ауылдар', 'Вакансии и приглашающие сёла')}
          </h2>
          <p className="text-gray-700 mb-4">
            {currentLanguage.code === 'kz' ? (
              <>«Ауылдарға барсақ, қандай жұмыс орындары бар?», — дейтін азаматтар төмендегі сілтемені басу арқылы толық ақпаратқа қол жеткізе алады.</>
            ) : (
              <>Граждане, которые задаются вопросом: «Если поехать в село, какие есть рабочие места?», могут получить полную информацию, перейдя по ссылке:</>
            )}
          </p>
          <a href="https://www.enbek.kz/kk/search/vacancy?region_id=10" target="_blank" rel="noopener noreferrer" className="inline-block text-primary-600 hover:text-primary-700 hover:underline font-semibold mb-4 break-all transition-colors">
            www.enbek.kz/kk/search/vacancy?region_id=10
          </a>
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-soft text-sm text-amber-900/90 mb-8">
            {currentLanguage.code === 'kz' ? (
              <>
                <p className="font-semibold mb-2">Ескерту:</p>
                <p className="mb-2">Сілтемеге өткеннен кейін «Ерекшелік» деген бөлімдегі «Мемлекет субсидиялаусыз» деген белгіні алып тастау керек. Сонда ауылдардағы еңбекақысы субсидияланатын жұмыс орындары ашылады.</p>
                <p>Сілтемеге мобльдік қосымша арқылы кіретін болсаңыз, «Сүзгіні көрсету» тетігін басасыз және ең төменгі жақтағы «Мемлекет субсидиялаусыз» деген белгіні алып тастау қажет. Онда қажет мамандар, байланыс телефон нөмірлері, мекенжайлары және электронды пошта адрестеріне дейін көрсетілген.</p>
              </>
            ) : (
              <>
                <p className="font-semibold mb-2">Примечание:</p>
                <p className="mb-2">После перехода по ссылке необходимо в разделе «Особенности» снять отметку «Без государственного субсидирования». Тогда отобразятся вакансии в сельской местности с субсидируемой заработной платой.</p>
                <p>В мобильном приложении: нажать «Показать фильтр» и внизу снять отметку «Без государственного субсидирования». В разделе указаны требуемые специалисты, контакты и адреса работодателей.</p>
              </>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('Шақыратын ауылдар', 'Приглашающие сёла')}</h3>
            <ul className="space-y-3 text-gray-700">
              {currentLanguage.code === 'kz' ? (
                <>
                  <li><strong>Абай ауданы:</strong> Медеу ауылы</li>
                  <li><strong>Аякөз ауданы:</strong> Нарын, Майлин, Емелтау, Байқошқар, Малгелді, Тарбағатай, Өркен ауылдары</li>
                  <li><strong>Ақсуат ауданы:</strong> Ойшілік, Құмкөл, Сатпаев, Көкжыра, Ырғызбай, Кіндікті, Қызыл кесік ауылдары</li>
                  <li><strong>Бесқарағай ауданы:</strong> Жетіжар ауылдық округі Кривинка ауылы, Ерназар ауылдық округі Қоянбай ауылы, М-Владимировка ауылдық округі Бозтал ауылы, Долон ауылдық округі Бөдене ауылы</li>
                  <li><strong>Жаңасемей ауданы:</strong> Ақбұлақ ауылы</li>
                  <li><strong>Жарма ауданы:</strong> Қаратөбе, Кендірлі, Әди ауылдары</li>
                  <li><strong>Үржар ауданы:</strong> Салқынбел ауылдық округі Тасбұлақ және Қарабұйрат ауылдары, Бестерек ауылдық округі Қазымбет ауылы, Барқытбел ауылдық округі Благодатное, Батпақты ауылдары</li>
                  <li><strong>Мақаншы ауданы:</strong> Қаратал ауылдық округінің Бұғыбай ауылы, Көктерек ауылдық округінің Қызылбұлақ және Қайынды ауылдары, Қарабұлақ ауылдық округінің Барлық-Арасан ауылы</li>
                </>
              ) : (
                <>
                  <li><strong>Абайский район:</strong> с. Медеу</li>
                  <li><strong>Аягозский район:</strong> сёла Нарын, Майлин, Емелтау, Байкошкар, Малгельди, Тарбагатай, Оркен</li>
                  <li><strong>Аксуатский район:</strong> сёла Ойшилик, Кумколь, Сатпаев, Кокжира, Ыргызбай, Киндикти, Кызыл кесик</li>
                  <li><strong>Бескарагайский район:</strong> Жетижарский с.о. — с. Кривинка, Ерназарский с.о. — с. Коянбай, М-Владимировка с.о. — с. Бозтал, Долонский с.о. — с. Бедене</li>
                  <li><strong>Жанасемейский район:</strong> с. Акбулак</li>
                  <li><strong>Жарминский район:</strong> сёла Каратобе, Кендирли, Ади</li>
                  <li><strong>Урджарский район:</strong> Салкынбельский с.о. — сёла Тасбулак и Карабуйрат, Бестерекский с.о. — с. Казымбет, Баркытбельский с.о. — сёла Благодатное, Батпакты</li>
                  <li><strong>Маканчинский район:</strong> Каратальский с.о. — с. Бугибай, Коктерекский с.о. — сёла Кызылбулак и Кайынды, Карабулакский с.о. — с. Барлык-Арасан</li>
                </>
              )}
            </ul>
            <p className="text-gray-500 text-sm mt-2">{t('Тағы тізім қосылады', '(Список будет дополняться.)')}</p>
          </div>
        </div>
      </section>

      {/* ── КАК ПОЛУЧИТЬ ГРАНТ (интеграция Enbek) ── */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-sky-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-700 mb-8 tracking-tight">
            {t('Гранттарды қалай алуға болады?', 'Как получить государственный грант?')}
          </h3>
          <a
            href={currentLanguage.code === 'kz' ? 'https://business.enbek.kz/kk/how-to-get-government-grant' : 'https://business.enbek.kz/ru/how-to-get-government-grant'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary-600 font-bold text-lg px-8 py-4 rounded-xl shadow-card hover:shadow-card-hover hover:bg-primary-50 border-2 border-primary-200 transition-all uppercase tracking-wide"
          >
            {t('ИӘ, ӘРИНЕ!', 'ДА, КОНЕЧНО!')}
          </a>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {t('Соңғы жаңалықтар', 'Последние новости')}
              </h2>
              <p className="text-gray-500">
                {t('Мемлекеттік бағдарламалар туралы соңғы жаңалықтар', 'Последние новости о государственных программах')}
              </p>
            </div>
            <Link to="/news" className="hidden sm:inline-flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              {t('Барлығын көру', 'Все новости')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(Array.isArray(latestNews) ? latestNews : []).map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-soft hover:shadow-card-hover hover:border-primary-100 transition-all duration-250"
              >
                <div className="relative overflow-hidden h-52 sm:h-56 bg-gray-100">
                  <img
                    src={news.image ? encodeURI(news.image) : '/photos/smilefamilykz.jpg'}
                    alt={newsTitle(news)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1';
                        t.src = '/photos/smilefamilykz.jpg';
                      }
                    }}
                  />
                  {news.category && (
                    <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {news.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-xs text-gray-400 mb-2">{formatDate(news.published_at)}</p>
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {newsTitle(news)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                    {newsExcerpt(news)}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-primary-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    {t('Оқу', 'Читать')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link to="/news" className="inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-50 transition-colors">
              {t('Барлық жаңалықтар', 'Все новости')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" aria-hidden />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-6" aria-hidden>💬</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 tracking-tight">
            {t('Сұрағыңыз бар ма?', 'Есть вопросы?')}
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            {t(
              'Біздің 10 маман тегін кеңес береді. Бағдарламаларды таңдауда, өтінімдерді рәсімдеуде көмек аламыз.',
              'Наши 10 специалистов проконсультируют бесплатно. Помогаем выбрать программы и оформить заявки.'
            )}
          </p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg shadow-card-hover"
          >
            {t('Маманмен байланысу', 'Связаться со специалистом')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
