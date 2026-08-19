// dev/preview-extras.js — Static-preview only mock of the native
// <salla-products-list> web component (which only works inside a real
// Salla storefront). The twig renders the real component tag; this script
// fills it with representative mock package cards so the layout can be
// reviewed locally. NOT part of the theme — do not ship this behavior.
(function () {
  var list = document.querySelector(
    'salla-products-list[data-testid="store-home-dt-packages-list"]'
  );
  if (!list) return;

  var packages = [
    { name: 'باقة الابتداء', duration: 'شهر واحد', price: '٣٩٩ ر.س', old: null, featured: false, benefits: ['خطة غذائية شهرية متكاملة', 'متابعة أسبوعية', 'تعديلات على الخطة'] },
    { name: 'باقة التقدم', duration: '٣ أشهر', price: '٧٩٩ ر.س', old: '٩٩٩ ر.س', featured: true, benefits: ['كل مزايا باقة الابتداء', 'متابعة أسبوعية مكثفة', 'استشارة مباشرة شهرية'] },
    { name: 'باقة الالتزام', duration: '٦ أشهر', price: '١٤٩٩ ر.س', old: '١٩٩٩ ر.س', featured: false, benefits: ['كل مزايا باقة التقدم', 'متابعة أسبوعية مكثفة', 'خطة رياضية مصاحبة'] },
    { name: 'باقة الاستمرار', duration: '١٢ شهرًا', price: '٢٤٩٩ ر.س', old: '٣٢٩٩ ر.س', featured: false, benefits: ['كل مزايا باقة الالتزام', 'متابعة يومية', 'أولوية في الحجز والاستشارات'] }
  ];
  var check = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5A6340" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';

  list.innerHTML = packages
    .map(function (p) {
      return (
        '<article class="dt-package-card' + (p.featured ? ' dt-package-card--featured' : '') + '">' +
        (p.featured ? '<span class="dt-package-badge">الأكثر طلبًا</span>' : '') +
        '<div class="dt-package-logo"><img src="logo.svg" alt="DT. SHAHAD" style="width: 104px; display: block;"></div>' +
        '<h3 class="dt-package-name">' + p.name + '</h3>' +
        '<div class="dt-package-duration">' + p.duration + '</div>' +
        '<div class="dt-package-divider"></div>' +
        '<ul class="dt-package-benefits">' +
        p.benefits
          .map(function (b) {
            return '<li class="dt-package-benefit">' + check + '<span>' + b + '</span></li>';
          })
          .join('') +
        '</ul>' +
        '<div class="dt-package-price">' +
        (p.old ? '<span class="dt-package-price__old">' + p.old + '</span>' : '') +
        '<span class="dt-package-price__value">' + p.price + '</span>' +
        '</div>' +
        '<button type="button" class="dt-package-cta' + (p.featured ? ' dt-package-cta--featured' : '') + '">اختر الباقة</button>' +
        '<a class="dt-package-details" href="#">تفاصيل الباقة ←</a>' +
        '</article>'
      );
    })
    .join('');
})();