/**
 * Arabic dictionary (src/lib/i18n/locales/ar.ts) — serves `/ar/`, the
 * RTL mirror. Tagline/summary use the Owner translation table VERBATIM;
 * UI labels translated idiomatically with technical tokens kept
 * verbatim.
 */
import type { Dictionary } from '../schema';

export const ar: Dictionary = {
  htmlLang: 'ar',
  dir: 'rtl',
  label: 'العربية',

  langNames: {
    en: 'الإنجليزية',
    zh: 'الصينية',
  },

  footer: {
    fleet: 'الأسطول',
    hub: 'المركز',
    org: 'المنظمة',
  },

  // Curated project copy (2026-09-07 walkthrough fix A, Owner-provided
  // translations verbatim — the unipty entry LEADS with U+200F RLM so
  // the Latin "PTY" run sits correctly inside the RTL line); repos
  // absent here fall back to the English description.
  projectDescriptions: {
    unipty:
      '‏PTY محايدة لبيئة التشغيل لكلٍّ من Node وBun وDeno — عقد عام واحد، وواجهات خلفية يختارها المطوّر، وادعاءات دعم مدعومة بالأدلة.',
    openspecui:
      'رفيق الويب للتطوير الموجَّه بـ OpenSpec — تشغيل ومعاينة وتصدير المشاريع القائمة على المواصفات بأمر واحد.',
    ui:
      'لغة تصميم jixoai على شكل shadcn registry — جماليات الطرفية، وقانون التدرج الواحد OKLCH، ومكوّنات mono-first تملكها بمجرد نسخها.',
    opentray:
      'بيئة تشغيل لحالة سطح المكتب لمنظومات CLI ومهارات الذكاء الاصطناعي — تطبيقات tray-first تعمل على Node وBun وDeno.',
    opendweb:
      'شبكات على مستوى التطبيق: تطبيقات الأجهزة المتعددة تشكّل شبكات منطقية — كغرف الألعاب لا كـ VPN للنظام — اتصال QUIC مباشر أولاً مع relay ذاتي الاستضافة كاحتياط.',
    openiweb:
      'عقدة التطبيقات الشخصية مفتوحة المصدر للناس العاديين — استضافة ذاتية دون تعلّم التشغيل: سلِّم نقطة نهاية MCP ومفتاحاً واحداً لوكيل البرمجة بالذكاء الاصطناعي.',
  },

  chrome: {
    subtitle: 'مختبر jixoai مفتوح المصدر',
    navHome: 'الرئيسية',
    navProjects: 'المشاريع',
    navBlog: 'المدونة',
    drawerLabel: 'التنقل الرئيسي',
    breadcrumbLabel: 'مسار التنقل',
    languageLabel: 'اللغة',
  },

  home: {
    title: 'jixoai — بنية تحتية موثوقة لعصر الذكاء الاصطناعي',
    metaDescription:
      'مختبر jixoai مفتوح المصدر — مشاريع بنية تحتية رئيسية لعصر الذكاء الاصطناعي. مواقع رسمية، وإصدارات حية، وREADME، ومدونة المختبر.',
    eyebrow: 'jixoai · مختبر مفتوح المصدر',
    titleLead: 'بنية تحتية موثوقة ',
    titleEm: 'لعصر الذكاء الاصطناعي.',
    titleTail: '',
    badges: ['مفتوحة المصدر', 'بترخيص MIT'],
    summary:
      'تبني jixoai الطبقة الحاملة التي يقف عليها عصر الذكاء الاصطناعي: بيئات تشغيل طرفية، ولغات تصميم، وأدوات للمطورين، تُسلِّم في كل مرة عقدًا واحدًا صادقًا. مفتوحة المصدر، مبنية على الأدلة، MIT.',
    projectsButton: 'المشاريع ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — بنية تحتية موثوقة لعصر الذكاء الاصطناعي',
    flagships: 'الرائدات:',
    projectsHeading: 'المشاريع',
    projectsSummary:
      'المستودعات الرائدة للمؤسسة — لكل منها موقعه الرسمي ومستودعه على GitHub وملف README مُصيَّر كصفحة تفصيلية. تعكس شارات الإصدار أحدث GitHub Release وتُحدَّث تلقائيًا: يُعاد بناء هذا الموقع مع كل دفعة وفق جدول يومي.',
    // RTL arrow law (2026-09-06 mobile audit): inline "continue" arrows
    // mirror to ← under dir="rtl" — the glyph leads the reading flow.
    allProjects: 'كل المشاريع ←',
    allRepositories: 'كل المستودعات ↗',
    versionData: (date) => `بيانات الإصدارات مأخوذة من GitHub Releases بتاريخ ${date}.`,
    latestPosts: 'أحدث المقالات',
    allPosts: 'كل المقالات ←',
    noPosts: 'لا منشورات بعد.',
  },

  projectsIndex: {
    title: 'المشاريع — jixoai',
    metaDescription:
      'تشكيلة jixoai الرئيسية — مواقع رسمية، ومستودعات GitHub، وإصدارات حية، وREADME معروض.',
    heading: 'المشاريع',
    summary: (date) =>
      `كل مشاريع jixoai الرئيسية في شبكة واحدة — الموقع الرسمي ومستودع GitHub وآخر إصدار (تم التقاطه في ${date}) وREADME المعروض لكل مشروع.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'الموقع الرسمي ↗',
    readmeOnGitHub: 'README على GitHub ↗',
    latestRelease: (tag) => `أحدث إصدار (${tag})`,
    noRelease: 'لم يُنشر أي إصدار بعد',
    readmeUnavailableLead: 'تعذر الوصول إلى README وقت البناء — اقرأه على',
    readmeUnavailableLink: 'GitHub ↗.',
    originalLanguage: 'الأصل (English)',
  },

  card: {
    site: 'الموقع ↗',
    readme: 'README ←',
  },

  blogIndex: {
    title: 'المدونة — jixoai',
    metaDescription:
      'مدونة مختبر jixoai: ملاحظات إعادة الإطلاق، وقرارات معمارية، وإعلانات الأسطول — يكتبها المشرفون وتُنشر صفحات ثابتة بسيطة.',
    heading: 'المدونة',
    summary:
      'ملاحظات من المختبر — يكتبها المشرفون، وتُصيَّر وقت البناء، وتُقدَّم صفحات ثابتة بسيطة. بلا خادم، وبلا طلبات من العميل، وبلا تتبع.',
    releasePill: (version) => `إصدار GitHub (${version})`,
  },

  blogPost: {
    titleSuffix: 'مدونة jixoai',
    writtenIn: (language) => `هذه المقالة مكتوبة بلغة ${language}.`,
    // RTL arrow law: the "continue" glyph mirrors to ← under dir="rtl".
    readIn: (language) => `اقرأها بلغة ${language} ←`,
  },
};
