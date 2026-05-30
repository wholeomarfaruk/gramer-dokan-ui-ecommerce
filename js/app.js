// ============================================
// Gramer Dokan — Alpine.js data + interactions
// ============================================

// -------- Sample product data --------
const sampleProducts = (count, prefix = 'Wild Sundarban Honey') => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: prefix,
    price: 1990,
    oldPrice: 2200,
    discount: 10,
    image: `assets/products/product-${(i % 4) + 1}.svg`,
  }));
};

// -------- Main app state --------
document.addEventListener('alpine:init', () => {
  Alpine.store('cart', {
    items: [],
    get count() { return this.items.length; },
    add(product) {
      this.items.push(product);
    }
  });

  Alpine.store('wishlist', {
    ids: [],
    toggle(id) {
      const i = this.ids.indexOf(id);
      if (i > -1) this.ids.splice(i, 1);
      else this.ids.push(id);
    },
    has(id) { return this.ids.includes(id); }
  });

  Alpine.store('lang', { current: 'BN' });

  Alpine.store('offcanvas', {
    isOpen: false,
    open()   { this.isOpen = true;  document.body.style.overflow = 'hidden'; },
    close()  { this.isOpen = false; document.body.style.overflow = ''; },
    toggle() { this.isOpen ? this.close() : this.open(); }
  });
});

// -------- Product list components --------
window.productList = (count, prefix) => ({
  products: sampleProducts(count, prefix),
});

// -------- Carousel component --------
window.carousel = (totalSlides = 3) => ({
  currentSlide: 0,
  totalSlides,
  next() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  },
  prev() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  },
  goto(i) { this.currentSlide = i; }
});

// -------- Hero banner auto-rotate --------
window.heroSlider = () => ({
  slide: 0,
  total: 3,
  interval: null,
  init() {
    this.interval = setInterval(() => {
      this.slide = (this.slide + 1) % this.total;
    }, 5000);
  }
});

// -------- jQuery enhancements --------
$(function () {
  // Smooth-scrolling for anchor links
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 400);
    }
  });

  // Search focus state
  $('.header__search input, .bottom-search__field input').on('focus blur', function (e) {
    $(this).closest('.header__search, .bottom-search__field').toggleClass('is-focused', e.type === 'focus');
  });
});
