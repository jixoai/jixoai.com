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
      'تبني jixoai الطبقة الحاملة التي يقف عليها عصر الذكاء الاصطناعي — UniPty وOpenSpecUI ولغة تصميم jixoai وOpenDWeb وOpenIWeb وغيرها. مواقع رسمية، وإصدارات حية، ومدونة المختبر.',
    eyebrow: 'jixoai · مختبر مفتوح المصدر',
    titleLead: 'بنية تحتية موثوقة ',
    titleEm: 'لعصر الذكاء الاصطناعي.',
    titleTail: '',
    badges: ['مفتوحة المصدر', 'بترخيص MIT', 'مبنية على الأدلة', 'github.com/jixoai'],
    summary:
      'تبني jixoai الطبقة الحاملة التي يقف عليها عصر الذكاء الاصطناعي: بيئات تشغيل طرفية، ولغات تصميم، وأدوات للمطورين، تُسلِّم في كل مرة عقدًا واحدًا صادقًا. مفتوحة المصدر، مبنية على الأدلة، MIT.',
    projectsButton: 'المشاريع ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — بنية تحتية موثوقة لعصر الذكاء الاصطناعي',
    flagships: 'الرائدات:',
    projectsHeading: 'المشاريع',
    projectsSummary:
      'المستودعات الرائدة للمؤسسة — لكل منها موقعه الرسمي ومستودعه على GitHub وملف README مُصيَّر كصفحة تفصيلية. تعكس حبّات الإصدار أحدث GitHub Release وتُحدَّث تلقائيًا: يُعاد بناء هذا الموقع مع كل دفعة وفق جدول يومي.',
    allProjects: 'كل المشاريع →',
    allRepositories: 'كل المستودعات ↗',
    versionData: (date) => `بيانات الإصدارات مأخوذة من GitHub Releases بتاريخ ${date}.`,
    latestPosts: 'أحدث المقالات',
    allPosts: 'كل المقالات →',
    noPosts: 'لا مقالات بعد — المدونة تنطلق مع إعادة الإطلاق.',
  },

  projectsIndex: {
    title: 'المشاريع — jixoai',
    metaDescription:
      'أسطول jixoai الرائد: UniPty وOpenSpecUI وjixoai/ui وOpenTray وOpenDWeb وOpenIWeb — مواقع رسمية، ومستودعات GitHub، وإصدارات حية، وملفات README مصيَّرة.',
    heading: 'المشاريع',
    summary: (date) =>
      `كل مشاريع jixoai الرائدة في شبكة واحدة — المركز نفسه مجرد إعداد: إضافة مشروع أو إزالته أو إعادة ربطه هي تعديل في projects.manifest.json مع شعار. تعكس حبّات الإصدار أحدث GitHub Release (التقطت في ${date})؛ وتُصيَّر ملفات README من رأس المستودع وقت البناء.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'الموقع الرسمي ↗',
    readmeOnGitHub: 'README على GitHub ↗',
    latestRelease: (tag) => `أحدث إصدار (${tag})`,
    noRelease: 'لم يُنشر أي إصدار بعد',
    readmeUnavailableLead: 'تعذر الوصول إلى README وقت البناء — اقرأه على',
    readmeUnavailableLink: 'GitHub ↗.',
  },

  card: {
    site: 'الموقع ↗',
    readme: 'README →',
  },

  blogIndex: {
    title: 'المدونة — jixoai',
    metaDescription:
      'مدونة مختبر jixoai: ملاحظات إعادة الإطلاق، وقرارات معمارية، وإعلانات الأسطول — يكتبها المشرفون وتُنشر صفحات ثابتة بسيطة.',
    heading: 'المدونة',
    summary:
      'ملاحظات من المختبر — يكتبها المشرفون، وتُصيَّر وقت البناء، وتُقدَّم صفحات ثابتة بسيطة. بلا خادم، وبلا طلبات من العميل، وبلا تتبع.',
  },

  blogPost: {
    titleSuffix: 'مدونة jixoai',
  },
};
