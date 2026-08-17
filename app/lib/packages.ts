export interface Package {
  id: string;
  nameAr: string;
  tagline?: string;
  duration: string;
  price: string;
  priceNote: string;
  color: string;
  accentColor: string;
  description: string;
  benefits: string[];
  includes: string[];
  recommended: boolean;
}

export interface CartItem {
  pkg: Package;
  quantity: number;
}

export const PACKAGES: Package[] = [
  {
    id: 'bidaya',
    nameAr: 'البداية',
    duration: 'شهر واحد',
    price: '٢٩٩ ر.س',
    priceNote: 'لمدة شهر',
    color: '#F0EDE5',
    accentColor: '#5A6340',
    description: 'نقطة انطلاق مثالية لمن يريد تجربة نظام DT. SHAHAD والتعرف على أسلوبه في التغذية الشخصية.',
    benefits: ['تحليل الاحتياجات الغذائية', 'خطة وجبات أسبوعية', 'قوائم تسوق ذكية', 'دعم عبر البريد'],
    includes: ['تحليل شامل للاحتياجات', 'خطة وجبات لأربعة أسابيع', 'قائمة تسوق أسبوعية', 'ملاحظات غذائية يومية', 'دعم عبر البريد الإلكتروني'],
    recommended: false,
  },
  {
    id: 'takamul',
    nameAr: 'التكامل',
    duration: 'ثلاثة أشهر',
    price: '٧٩٩ ر.س',
    priceNote: 'لمدة ٣ أشهر',
    color: '#EDEAE0',
    accentColor: '#5A6340',
    description: 'تجربة متكاملة مع متابعة شهرية ومراجعة مستمرة تضمن لك تقدمًا حقيقيًا ومستدامًا.',
    benefits: ['كل ما في البداية', 'مراجعة شهرية للخطة', 'تواصل مع المختص', 'تعديلات حسب التقدم', 'تقرير شهري'],
    includes: ['كل ما في باقة البداية', 'خطة وجبات لثلاثة أشهر', 'مراجعة وتعديل شهري', 'تواصل مباشر مع المختص', 'تعديلات مستمرة حسب التقدم', 'تقرير مفصّل نهاية كل شهر'],
    recommended: false,
  },
  {
    id: 'tahawwul',
    nameAr: 'التحول',
    duration: 'ستة أشهر',
    price: '١٢٩٩ ر.س',
    priceNote: 'لمدة ٦ أشهر',
    color: '#2A2825',
    accentColor: '#A0A87E',
    description: 'ستة أشهر من الدعم المتواصل مع تحليل دوري للنتائج ومتابعة نصف شهرية للتقدم.',
    benefits: ['كل ما في التكامل', 'متابعة نصف شهرية', 'تحليل التغيرات', 'خطط موسمية', 'أولوية في التواصل'],
    includes: ['كل ما في باقة التكامل', 'خطة وجبات لستة أشهر', 'مراجعة نصف شهرية', 'تحليل دوري للتغيرات', 'خطط موسمية ومتنوعة', 'استشارة غذائية شاملة', 'دعم أولوية عبر الواتساب'],
    recommended: true,
  },
  {
    id: 'nakhba',
    nameAr: 'النخبة',
    duration: 'سنة كاملة',
    price: '٢١٩٩ ر.س',
    priceNote: 'لمدة سنة',
    color: '#1A1917',
    accentColor: '#C4AB6E',
    description: 'أعلى مستويات الاهتمام والمتابعة على مدار السنة مع متابعة أسبوعية وأولوية تامة.',
    benefits: ['كل ما في التحول', 'متابعة أسبوعية', 'أولوية تامة', 'خطط متجددة', 'تقرير سنوي شامل'],
    includes: ['كل ما في باقة التحول', 'خطة وجبات لسنة كاملة', 'متابعة أسبوعية شخصية', 'أولوية في التواصل والرد', 'خطط موسمية متجددة تلقائيًا', 'وصول مبكر للمحتوى الجديد', 'تقرير صحي سنوي شامل', 'دعم على مدار الساعة'],
    recommended: false,
  },
];

export function getPackageById(id: string): Package | undefined {
  return PACKAGES.find((p) => p.id === id);
}