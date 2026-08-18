/*
 * DT. SHAHAD package card — custom element for <salla-products-list product-card-component="dt-package-card">.
 * Renders real Salla product data with the verified package card design and a native
 * <salla-add-product-button> (options modal opens automatically for products with options).
 * No React, no CartContext — cart flow is 100% Salla SDK/web components.
 */

const LOGO_SVG =
  '<svg viewBox="0 0 600 620" role="img" aria-label="DT. SHAHAD — Clinical Nutrition" class="dt-logo" style="width: 104px; display: block; direction: ltr; flex-shrink: 0; overflow: visible;">' +
  '<g>' +
  '<path d="M330 402 C 372 356 430 306 462 236" fill="none" stroke="#7C8A63" stroke-width="3.4" stroke-linecap="round"/>' +
  '<path d="M0 0 C 17.68 -17.16 38.48 -17.16 52 0 C 38.48 17.16 17.68 17.16 0 0 Z" transform="translate(348.47 382.40) rotate(-98.09)" fill="#7C8A63"/>' +
  '<path d="M0 0 C 17.68 -17.16 38.48 -17.16 52 0 C 38.48 17.16 17.68 17.16 0 0 Z" transform="translate(348.47 382.40) rotate(5.91)" fill="#9CA982"/>' +
  '<path d="M0 0 C 15.98 -15.51 34.78 -15.51 47 0 C 34.78 15.51 15.98 15.51 0 0 Z" transform="translate(370.99 359.09) rotate(-98.18)" fill="#7C8A63"/>' +
  '<path d="M0 0 C 15.98 -15.51 34.78 -15.51 47 0 C 34.78 15.51 15.98 15.51 0 0 Z" transform="translate(370.99 359.09) rotate(5.82)" fill="#9CA982"/>' +
  '<path d="M0 0 C 14.28 -13.86 31.08 -13.86 42 0 C 31.08 13.86 14.28 13.86 0 0 Z" transform="translate(394.03 334.42) rotate(-99.97)" fill="#9CA982"/>' +
  '<path d="M0 0 C 14.28 -13.86 31.08 -13.86 42 0 C 31.08 13.86 14.28 13.86 0 0 Z" transform="translate(394.03 334.42) rotate(4.03)" fill="#9CA982"/>' +
  '<path d="M0 0 C 12.58 -12.21 27.38 -12.21 37 0 C 27.38 12.21 12.58 12.21 0 0 Z" transform="translate(416.56 308.01) rotate(-103.34)" fill="#9CA982"/>' +
  '<path d="M0 0 C 12.58 -12.21 27.38 -12.21 37 0 C 27.38 12.21 12.58 12.21 0 0 Z" transform="translate(416.56 308.01) rotate(0.66)" fill="#9CA982"/>' +
  '<path d="M0 0 C 10.88 -10.56 23.68 -10.56 32 0 C 23.68 10.56 10.88 10.56 0 0 Z" transform="translate(437.55 279.47) rotate(-108.25)" fill="#9CA982"/>' +
  '<path d="M0 0 C 10.88 -10.56 23.68 -10.56 32 0 C 23.68 10.56 10.88 10.56 0 0 Z" transform="translate(437.55 279.47) rotate(-4.25)" fill="#9CA982"/>' +
  '<path d="M0 0 C 13.60 -13.00 29.60 -13.00 40 0 C 29.60 13.00 13.60 13.00 0 0 Z" transform="translate(461.52 237.05) rotate(-65.43)" fill="#9CA982"/>' +
  '</g>' +
  '<text x="298" y="298" text-anchor="middle" dominant-baseline="middle" fill="#3D472E" style="font-family: \'Cormorant Garamond\', serif; font-weight: 600; font-size: 360px; font-style: italic;">S</text>' +
  '<text x="300" y="470" text-anchor="middle" fill="#3D472E" style="font-family: \'Cinzel\', serif; font-weight: 600; font-size: 82px; letter-spacing: 6px;">DT. SHAHAD</text>' +
  '<line x1="58" y1="510" x2="108" y2="510" stroke="#3D472E" stroke-width="1.6"/>' +
  '<line x1="492" y1="510" x2="542" y2="510" stroke="#3D472E" stroke-width="1.6"/>' +
  '<text x="300" y="519" text-anchor="middle" fill="#3D472E" style="font-family: \'Cinzel\', serif; font-weight: 500; font-size: 24px; letter-spacing: 4px;">CLINICAL NUTRITION</text>' +
  '<text x="300" y="575" text-anchor="middle" direction="rtl" fill="#3D472E" style="font-family: \'Noto Serif Arabic\', serif; font-weight: 500; font-size: 38px;">أخصائية تغذية علاجية</text>' +
  '</svg>';

const CHECK_SVG =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5A6340" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';

const DURATION_OPTION_RE = /مدة|المدة|duration|period|اشتراك/i;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return map[ch];
  });
}

function formatMoney(value) {
  if (value == null || value === '') return '';
  return window.salla && typeof salla.money === 'function' ? salla.money(value) : value;
}

class DtPackageCard extends HTMLElement {
  connectedCallback() {
    let product = null;
    try {
      product = JSON.parse(this.getAttribute('product'));
    } catch (err) {
      return;
    }
    this.product = product;
    if (window.salla && typeof salla.onReady === 'function') {
      salla.onReady(() => this.render());
    } else {
      this.render();
    }
  }

  getFeaturedId() {
    if (this.closest) {
      const list = this.closest('salla-products-list');
      if (list) return list.getAttribute('data-featured');
    }
    const any = document.querySelector('salla-products-list[data-featured]');
    return any ? any.getAttribute('data-featured') : null;
  }

  getDuration() {
    const options = this.product.options || [];
    const group = options.find((option) => DURATION_OPTION_RE.test(option.name || ''));
    const first = group && group.values && group.values[0];
    return first && first.name ? first.name : null;
  }

  getBenefits() {
    const text = (this.product.description || '').trim();
    if (!text) return [];
    return text
      .split(/\n+|•|▪|\*/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(1, 5);
  }

  getPriceBlock() {
    const product = this.product;
    if (product.is_on_sale && product.sale_price > 0) {
      return (
        '<span class="dt-package-price__old">' + formatMoney(product.regular_price) + '</span>' +
        '<span class="dt-package-price__value">' + formatMoney(product.sale_price) + '</span>'
      );
    }
    if ((!product.price || product.price == 0) && product.starting_price) {
      return '<span class="dt-package-price__value">' + formatMoney(product.starting_price) + '</span>';
    }
    return '<span class="dt-package-price__value">' + formatMoney(product.price) + '</span>';
  }

  render() {
    const product = this.product;
    const featuredId = this.getFeaturedId();
    const featured = featuredId != null && String(featuredId) === String(product.id);
    const duration = this.getDuration();
    const benefits = this.getBenefits();
    const isSale = product.status === 'sale';

    this.className = featured ? 'dt-package-card dt-package-card--featured' : 'dt-package-card';

    this.innerHTML =
      (featured ? '<span class="dt-package-badge">الأكثر طلبًا</span>' : '') +
      '<div class="dt-package-logo">' + LOGO_SVG + '</div>' +
      '<h3 class="dt-package-name">' + escapeHtml(product.name) + '</h3>' +
      (duration ? '<div class="dt-package-duration">' + escapeHtml(duration) + '</div>' : '') +
      '<div class="dt-package-divider"></div>' +
      (benefits.length
        ? '<ul class="dt-package-benefits">' +
          benefits
            .map(
              (benefit) =>
                '<li class="dt-package-benefit">' + CHECK_SVG + '<span>' + escapeHtml(benefit) + '</span></li>'
            )
            .join('') +
          '</ul>'
        : '') +
      '<div class="dt-package-price">' + this.getPriceBlock() + '</div>' +
      '<salla-add-product-button width="wide" product-id="' + product.id + '" product-status="' +
      product.status + '" product-type="' + (product.type || 'product') + '">' +
      (isSale ? 'اختر الباقة' : 'نفذت الكمية') +
      '</salla-add-product-button>' +
      '<a class="dt-package-details" href="' + escapeHtml(product.url) + '">تفاصيل الباقة ←</a>';
  }
}

if (!customElements.get('dt-package-card')) {
  customElements.define('dt-package-card', DtPackageCard);
}